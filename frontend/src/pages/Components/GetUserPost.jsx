import React from 'react'

import { useQuery, useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import toast from 'react-hot-toast'


const GetUserPost = ({ username }) => {

    const { data: authUser } = useQuery({ queryKey: ['authUser'] })

    const { data: getUserPost, refetch } = useQuery({
        queryKey: ['userPost', username],
        queryFn: async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/userPost/${username}`, {
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

    const { mutate: deletePost } = useMutation({
        mutationFn: async (id) => {
            try {
                let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/delete/${id}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: 'include'
                })

                let data = await res.json()

                if (!res.ok) throw new Error(data.error || 'Logout Fetch Error.')
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            toast.success('Post Deleted.', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            }),
                refetch();
        }
    })


    return (
        <div>
            {(getUserPost || []).map((post) => (

                <div key={post._id} className="border-b-2 border-gray-300 w-full flex items-stretch justify-between relative">
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



                        <Link
                            className="hover:cursor-pointer flex items-center w-fit  rounded"
                            to={`/profile/${post.user.username}`}
                        >
                            <div className="font-bold">
                                {post.user.username}
                                <span className="text-gray-500 font-normal pl-2">
                                    {format(post.createdAt)}
                                </span>
                            </div>
                        </Link>

                        {/* Text Post */}
                        <div>{post.text}</div>

                        {post.user._id === authUser?._id ?
                            <div className='absolute right-0 top-0'>
                                <div className="dropdown dropdown-bottom dropdown-end ">
                                    <div tabIndex={0} role="button" className="btn m-1">...</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border-[1.5px] border-gray-300">
                                        <li className='text-red-500'
                                            onClick={() => deletePost(post._id)}
                                        ><a>Delete Post</a></li>
                                    </ul>
                                </div>
                            </div>
                            : <div></div>}


                    </div>
                </div>
            ))}


        </div >
    )
}

export default GetUserPost