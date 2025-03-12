import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import { toast } from 'react-hot-toast'


const PostAreaComponent = ({ logo }) => {

    let queryClient = useQueryClient()

    const [comment, setComment] = useState('')

    const { data: authUser } = useQuery({ queryKey: ["authUser"] })

    const { mutate: createPost } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/create`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ text: comment }),
                    credentials: 'include'
                })

                let data = await res.json()


                if (!res.ok) throw new Error(data.error || 'Error in LoginPage.')

            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            toast.success('Post has been added.', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });

            document.getElementById('my_modal_2').close();
            queryClient.invalidateQueries(['allPost'])
            queryClient.invalidateQueries(['userPost'])

        }
    })

    let handleInputChange = (e) => {
        setComment(e.target.value)
    }


    let handleSubmit = (e) => {
        e.preventDefault()
        if (!comment) return
        createPost()
        setComment('');
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>{logo}</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">

                    <h3 className="font-bold text-lg text-center">New Thread</h3>
                    <div className='w-[100%] h-[0.5px] my-3 bg-gray-300'></div>

                    <div className='w-[100%] h-[50px] mb-5 flex items-center justify-start'>
                        <div className="avatar  ">
                            <div className="w-10 rounded-full">
                                <img src={authUser?.profilePicture} />
                            </div>
                        </div>

                        <div className='font-bold px-5'>
                            {authUser?.username}
                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            className='w-[100%] h-[30vh] resize-none focus:outline-none'
                            placeholder="What's on your mind?"
                            onChange={handleInputChange}
                            name='commentTextArea'
                            value={comment}
                        >

                        </textarea>

                        <button
                            className="btn btn-neutral w-[100%]"
                            type='submit'
                        >
                            Post
                        </button>
                    </form>



                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default PostAreaComponent