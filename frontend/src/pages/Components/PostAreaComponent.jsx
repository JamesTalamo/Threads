import React from 'react'
import { useQuery } from 'react-query'



const PostAreaComponent = ({ logo }) => {

    const { data: authUser } = useQuery({ queryKey: ["authUser"] })

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

                    <textarea
                        className='w-[100%] h-[30vh] resize-none focus:outline-none'
                        placeholder="What's on your mind?"

                    >

                    </textarea>

                    <button className="btn btn-neutral w-[100%]">Post</button>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default PostAreaComponent