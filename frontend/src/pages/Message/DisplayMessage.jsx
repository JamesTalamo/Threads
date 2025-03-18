import React, { useEffect, useRef } from 'react';
import useMessageStore from '../../store/useMessageStore.js';
import { useQuery } from 'react-query';
import { format } from 'timeago.js';

const DisplayMessage = () => {
    const { data: authUser } = useQuery({ queryKey: 'authUser' });
    const loggedUserId = authUser?._id;
    const { messages } = useMessageStore();

    // Ref for scrolling
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom when messages change
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='px-[2%] overflow-y-auto h-full'>
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={message.senderId._id === loggedUserId ? "chat chat-end" : "chat chat-start"}
                >
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={message.senderId.profilePicture ? message.senderId.profilePicture : '/assets/common/pfp.jpg'}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message.senderId.username}
                        <time className="text-xs opacity-50"> {format(message.createdAt)}</time>
                    </div>
                    <div className="chat-bubble">{message.text}</div>
                </div>
            ))}
            {/* Invisible div to auto-scroll */}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default DisplayMessage;
