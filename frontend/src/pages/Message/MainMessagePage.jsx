import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import useMessageStore from '../../store/useMessageStore.js'

import MessageSkeleton from '../Skeleton/MessageSkeleton.jsx'
import DisplayMessage from './DisplayMessage.jsx'

const MainMessagePage = () => {
    const { username } = useParams()

    let { data: userInfo, refetch } = useQuery({
        queryKey: ['userProfile', username],  // Unique query key
        queryFn: async () => {
            // if (!username) return null;
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users/profile/${username}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                })

                let data = await res.json()
                if (!res.ok) throw new Error(data.error || 'Error in LoginPage.')

                return data
            } catch (error) {
                throw new Error(error.message)
            }
        },
        retry: false

    })

    // console.log(userInfo?._id)
    const { selectedUser, getMessages, isMessageLoading, sendMessages } = useMessageStore() //Info of the selectedUser

    useEffect(() => {
        if (userInfo?._id) {
            getMessages(userInfo._id);
        }
    }, [userInfo])

    const [formData, setFormData] = useState({
        text: ''
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        sendMessages(formData)
    }

    return (
        <div className='w-[100%] h-full bg-white flex '>
            <div className='w-[90px] bg-white'></div> {/*Disregard this, spacer lang to */}

            <div className='w-[96%] h-full bg-green-500 flex flex-col items-center justify-center'>

                <div className='w-[100%] h-[10%] bg-white flex items-center justify-center font-bold text-[22px]'>{/*This is the chat header area */}
                    {username}
                </div>

                <div className='w-[100%] h-[80%] bg-white'> {/*The message area */}
                    {isMessageLoading ? <MessageSkeleton /> : <DisplayMessage />}

                </div>

                <div className='w-[100%] bg-white h-[10%] '> {/*  Typing area */}

                    <form className='w-[100%] h-[100%] flex items-center justify-around'
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}>
                        <input type="text" placeholder="Type here" className="input w-[90%] border border-black" name='text' onChange={handleInputChange} />
                        <button className="btn btn-active btn-info" type='submit'>Send</button>

                    </form>

                </div>
            </div>


        </div>
    )
}

export default MainMessagePage