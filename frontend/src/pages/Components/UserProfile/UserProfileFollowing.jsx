import React from 'react'
import { useQuery } from 'react-query'

const UserProfileFollowing = () => {

    const { data: userInfo } = useQuery({ queryKey: ['userInfo'] })

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            < button className="badge badge-outline badge-default inline" onClick={() => document.getElementById('my_modal_4').showModal()}>{`Following ${userInfo?.following?.length}`} </button >
            <dialog id="my_modal_4" className="modal">

                <div className="modal-box bg-white">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">
                        Following
                    </h3>
                    {console.log(userInfo)}

                    <div className="py-4 bg-red-500 flex">
                        {userInfo?.following?.map((user) => {
                            <div className='bg-red-500 w-[50px] h-[50px]'>user</div>
                        })}
                    </div>

                </div>
            </dialog>
        </div>
    )
}

export default UserProfileFollowing