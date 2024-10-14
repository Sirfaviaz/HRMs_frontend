import React, { useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
// import './ChatArea.css'

const ChatArea = ({ activeChat, messages, onSendMessage }) => {
    const messageContainerRef = useRef(null);

    // Function to scroll to the bottom of the messages container
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    // Scroll to the bottom when a new message arrives or active chat changes
    useEffect(() => {
        scrollToBottom();
    }, [messages, activeChat]);

    return (
        <div className="flex flex-col flex-grow p-4 bg-white text-gray-900">
            {activeChat ? (
                <>
                    <div className="mb-4 border-b border-metallic-silver pb-2">
                        <h2 className="text-xl text-neon-green">{activeChat.name}</h2>
                    </div>
                    <div
                        ref={messageContainerRef}
                        className="flex-grow overflow-y-auto mb-4 custom-scrollbar"
                    >
                        {messages.map((message) => (
                            <div key={message.id} className="mb-3 p-3 bg-slate-400 rounded text-grey">
                                <div className="font-bold">{message.sender}</div>
                                <div>{message.text}</div>
                                <div className="text-xs text-grey text-right">{message.timestamp}</div>
                            </div>
                        ))}
                    </div>
                    <MessageInput onSendMessage={onSendMessage} />
                </>
            ) : (
                <div className="text-center mt-20 text-metallic-silver">
                    Select a chat to start messaging
                </div>
            )}
        </div>
    );
};

export default ChatArea;
