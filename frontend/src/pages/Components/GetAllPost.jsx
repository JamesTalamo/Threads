import React, { useState } from 'react'

import { useQuery, useQueryClient } from 'react-query'

const GetAllPost = () => {
    let [posts, setPosts] = useState('')

    let queryClient = useQueryClient()

    const { data: allPost } = useQuery({
        queryKey: ['allPost'],
        queryFn: async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/all`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: 'include'
                })

                let data = await res.json()
                if (!res.ok) throw new Error(data.error || 'Error in LoginPage.')

                return data
            } catch (error) {
                throw new Error(error.message)
            }
        }
    })

    console.log(allPost)

    return (
        <div>
            {(allPost || []).map((post) => (

                <div key={post._id} className="border-b-2 border-gray-300 w-full flex items-stretch justify-between">
                    {/* Avatar */}
                    <div className="flex items-start pt-4 justify-center  p-3">
                        <div className="avatar ">
                            <div className="w-10 rounded-full">
                                <img src={post.user.profilePicture} />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1  p-2">
                        {/* Name */}
                        <div className="font-bold">{post.user.username}</div>

                        {/* Text Post */}
                        <div>{post.text}</div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default GetAllPost