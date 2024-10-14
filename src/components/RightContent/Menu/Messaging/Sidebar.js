import React from 'react';

const Sidebar = ({ recentChats = [], contacts = [], activeChat, onSelectChat, onStartChat, currentUser }) => {
    return (
        <div className="w-72 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300 flex flex-col relative">
            <h2 className="text-2xl mb-4 text-blue-700">Chat</h2>
            <div>
                <h3 className="text-lg mb-2 text-gray-600">Recent Chats</h3>
                {recentChats.map((chat) => {
                    // Filter out the current user from the participants list
                    const otherParticipants = chat.participants.filter(
                        (participant) => participant.id !== currentUser?.id
                    );

                    // Extract the name of the other participant (use username if first and last names are not present)
                    const participantNames = otherParticipants
                        .map((participant) =>
                            (participant.first_name || participant.last_name)
                                ? `${participant.first_name} ${participant.last_name}`.trim()
                                : participant.username
                        )
                        .join(", ");

                    return (
                        <div
                            key={chat.id}
                            className={`p-3 mb-2 rounded cursor-pointer ${activeChat?.id === chat.id ? 'bg-blue-300 text-black' : 'bg-white text-gray-800 border border-gray-200'}`}
                            onClick={() => onSelectChat(chat)}
                        >
                            <div className="flex justify-between items-center">
                                <span>{participantNames || "Unnamed Chat"}</span>
                            </div>
                            <div className="text-sm text-gray-500">{chat.last_message || "No messages yet"}</div>
                        </div>
                    );
                })}
            </div>
            <div>
                <h3 className="text-lg mb-2 mt-4 text-gray-600">Contacts</h3>
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className="p-3 mb-2 bg-white rounded text-gray-800 cursor-pointer border border-gray-200"
                        onClick={() => onStartChat(contact)}
                    >
                        <div className="font-bold">
                            {(contact.first_name || contact.last_name)
                                ? `${contact.first_name} ${contact.last_name}`.trim()
                                : contact.username}
                        </div>
                        <div className="text-sm text-gray-500">{contact.status || 'Available'}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
