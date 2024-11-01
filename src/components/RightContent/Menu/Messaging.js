import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Messaging/Sidebar';
import ChatArea from './Messaging/ChatArea';
import api, { backendHost } from '../../../services/api';
import Cookies from 'js-cookie';
import './Messaging.css';

const ChatApp = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const chatSocketRef = useRef(null);
    const messageQueue = [];
    const [unreadCounts, setUnreadCounts] = useState({});


    useEffect(() => {
        fetchCurrentUser();
        fetchChatRooms();
        fetchContacts();

        // Start polling for chat updates every 5 seconds
        const pollingInterval = setInterval(() => {
            fetchChatRooms();
        }, 5000);

        // Clean up polling when component unmounts
        return () => clearInterval(pollingInterval);
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await api.get('/chat/current_user/');
            setCurrentUser(response.data);
            console.log('Current user:', response.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const fetchChatRooms = async () => {
        try {
            const response = await api.get('/chat/chat-rooms/');
            console.log('Chat rooms:', response.data);
    
            // Sort chat rooms based on the timestamp of the last message
            const sortedChatRooms = response.data.sort((a, b) => {
                const timeA = new Date(a.last_message_timestamp || 0);
                const timeB = new Date(b.last_message_timestamp || 0);
                return timeB - timeA;
            });
    
            setChatRooms(sortedChatRooms);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    };
    

    const fetchContacts = async () => {
        try {
            const response = await api.get('/chat/contacts/');
            console.log('Contacts:', response.data);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        setMessages([]);
        setupWebSocket(chat.id);
        fetchMessages(chat.id);
    
        // Reset unread count for this chat
        setUnreadCounts((prevUnreadCounts) => {
            const newUnreadCounts = { ...prevUnreadCounts };
            newUnreadCounts[chat.id] = 0;
            return newUnreadCounts;
        });
    };

    const fetchMessages = async (chatRoomId) => {
        try {
            const response = await api.get(`/chat/chat-rooms/${chatRoomId}/messages/`);
            console.log('Fetched messages:', response.data);
            const processedMessages = response.data.map((message) => ({
                id: message.id,
                text: message.content,
                senderId: message.sender?.id,
                senderName:
                    message.sender?.first_name || message.sender?.last_name
                        ? `${message.sender.first_name} ${message.sender.last_name}`.trim()
                        : message.sender?.username || 'Unknown',
                timestamp: new Date(message.timestamp).toLocaleTimeString(),
            }));
            console.log('Processed messages:', processedMessages);
            setMessages(processedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const setupWebSocket = (chatRoomId) => {
        // Close existing socket if open
        if (chatSocketRef.current) {
            chatSocketRef.current.close();
        }

        // Get access token from cookies
        const accessToken = Cookies.get('access');

        // Open new WebSocket connection
        chatSocketRef.current = new WebSocket(
            `ws://${backendHost}/ws/chat/${chatRoomId}/?token=${accessToken}`
        );

        chatSocketRef.current.onopen = () => {
            console.log('WebSocket connection opened');
            sendQueuedMessages();
        };

        chatSocketRef.current.onmessage = (e) => {
            console.log('WebSocket message received:', e.data);
            const data = JSON.parse(e.data);
            const senderId = data.sender_id;
            const senderName = data.sender_name;
        
            // Append message to chat
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: data.id,
                    text: data.message,
                    senderId: senderId,
                    senderName: senderName,
                    timestamp: new Date(data.timestamp).toLocaleTimeString(),
                },
            ]);
        
            // Update the last message in the chat room and reorder
            setChatRooms((prevChatRooms) => {
                const updatedChatRooms = prevChatRooms.map((chatRoom) => {
                    if (chatRoom.id === data.chat_room_id) {
                        return {
                            ...chatRoom,
                            last_message: data.message,
                            last_message_timestamp: data.timestamp,
                        };
                    }
                    return chatRoom;
                });
        
                // Always sort chat rooms based on last message timestamp
                return updatedChatRooms.sort((a, b) => {
                    const timeA = new Date(a.last_message_timestamp || 0);
                    const timeB = new Date(b.last_message_timestamp || 0);
                    return timeB - timeA;
                });
            });
            // Update unread counts if the message is in another chat room
            if (data.chat_room_id !== activeChat?.id) {
                setUnreadCounts((prevUnreadCounts) => {
                    const newUnreadCounts = { ...prevUnreadCounts };
                    newUnreadCounts[data.chat_room_id] = (newUnreadCounts[data.chat_room_id] || 0) + 1;
                    return newUnreadCounts;
                });
            }


        };
        

        chatSocketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        chatSocketRef.current.onclose = (event) => {
            console.error('WebSocket closed:', event);
        };
    };

    const sendQueuedMessages = () => {
        while (messageQueue.length > 0 && chatSocketRef.current.readyState === WebSocket.OPEN) {
            const message = messageQueue.shift();
            chatSocketRef.current.send(JSON.stringify(message));
        }
    };

    const handleStartChat = async (contact) => {
        try {
            const response = await api.post('/chat/private-chat/', { user_id: contact.id });
            const chatRoom = response.data;
            setActiveChat(chatRoom);
            setChatRooms((prevRooms) => [...prevRooms, chatRoom]);
            setupWebSocket(chatRoom.id);
            fetchMessages(chatRoom.id);
        } catch (error) {
            console.error('Error starting chat:', error);
        }
    };

    const handleSendMessage = (text) => {
        if (text.trim() === '') return;
        if (chatSocketRef.current && currentUser) {
            const message = {
                message: text,
                sender_id: currentUser.id,      // Include sender_id
                sender_name: currentUser.username, // Include sender_name
            };
            console.log('Attempting to send message:', message);

            if (chatSocketRef.current.readyState === WebSocket.OPEN) {
                try {
                    chatSocketRef.current.send(JSON.stringify(message));
                    console.log('Message sent over WebSocket:', message);
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            } else {
                messageQueue.push(message);
                console.log('Message queued because WebSocket connection is not open.');
            }
        }
    };

    return (
        <div className="flex h-[700px] bg-white text-gray-900">
            <Sidebar
                recentChats={chatRooms}
                contacts={contacts}
                activeChat={activeChat}
                onSelectChat={handleChatSelect}
                onStartChat={handleStartChat}
                currentUser={currentUser}
            />
            <ChatArea
                activeChat={activeChat}
                messages={messages}
                onSendMessage={handleSendMessage}
                currentUser={currentUser}
            />
        </div>
    );
};

export default ChatApp;
