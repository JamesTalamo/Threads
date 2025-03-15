import React from 'react'
import useMessageStore from '../../store/useMessageStore.js'
import { useQuery } from 'react-query'
import { format } from 'timeago.js'



const DisplayMessage = () => {

    const { data: authUser } = useQuery({ queryKey: 'authUser' })

    const loggedUserId = authUser._id

    const { messages } = useMessageStore()

    return (
        <div className='px-[2%]'>

            {messages.map((message) => {
                return message.senderId._id === loggedUserId ?
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={message.senderId.profilePicture} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {message.senderId.username}
                            <time className="text-xs opacity-50"> {format(message.createdAt)}</time>
                        </div>
                        <div className="chat-bubble">{message.text}</div>
                    </div>
                    :
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                     src={message.senderId.profilePicture} 
                                     />
                            </div>
                        </div>
                        <div className="chat-header">
                            {message.senderId.username}
                            <time className="text-xs opacity-50"> {format(message.createdAt)}</time>
                        </div>
                        <div className="chat-bubble">{message.text}</div>
                    </div>

            })}



        </div>
    )
}

export default DisplayMessage
