import React from 'react'

import { Link } from 'react-router-dom'

const UserProfileFollowers = ({ userInfo }) => {

    return (
        <div>
            < button className="badge badge-outline badge-default inline" onClick={() => document.getElementById('my_modal_6').showModal()}>{`Following ${userInfo?.following?.length}`} </button >
            <dialog id="my_modal_6" className="modal">

                <div className="modal-box bg-white max-w-[500px] h-[700px] ">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center">
                        Following
                    </h3>


                    {userInfo?.following?.map((user, index) => (
                        <Link
                            className='w-[100%] h-[80px] border-b border-1 border-gray-300 px-[15px] py-[1%] cursor-pointer flex items-center justify-start'
                            key={index}
                            to={`/profile/${user?.username}`}
                        >
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.profilePicture ? user.profilePicture : '/assets/common/noProfile.png'} />
                                </div>
                            </div>

                            <div className='pl-[5%] font-bold text-black'>{user?.username}</div>
                        </Link>
                    ))}


                </div>
            </dialog>
        </div>
    )
}

export default UserProfileFollowers