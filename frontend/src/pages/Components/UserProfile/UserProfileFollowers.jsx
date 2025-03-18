import React from 'react'
import { useQuery } from 'react-query'



const UserProfileFollowers = () => {

  const { data: userInfo } = useQuery({ queryKey: ['userInfo'] })

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      < button className="badge badge-outline badge-default inline" onClick={() => document.getElementById('my_modal_5').showModal()}>{`Followers ${userInfo?.followers?.length}`} </button >
      <dialog id="my_modal_5" className="modal">

        <div className="modal-box bg-white">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">
            Followers
          </h3>


          <p className="py-4">


          </p>

        </div>
      </dialog>
    </div>
  )
}

export default UserProfileFollowers