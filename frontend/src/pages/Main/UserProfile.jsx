import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from 'react-query';

const UserProfile = () => {

  let navigate = useNavigate()

  let queryClient = useQueryClient()

  let { username } = useParams()
  let { data: userInfo, isLoading } = useQuery({
    queryFn: async () => {
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


  const [userData, changeUserData] = useState({
    username: "",
    email: "",
    password: "",
    bio: ""
  });

  const { mutate: updateUser, isError, error } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users/profile/update`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userData),
          credentials: 'include'
        })

        let data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error in LoginPage.')

        return data
      } catch (error) {
        throw new Error(error.message)
      }
    }, onSuccess: (() => {
      queryClient.invalidateQueries('authUser')
      navigate(`/profile/${userData.username}`);
      window.location.reload()
    })
  })

  let handleInputChange = (e) => {
    changeUserData({ ...userData, [e.target.name]: e.target.value })
  }

  let handleSubmit = () => {
    updateUser()
  }

  useEffect(() => {
    if (userInfo) {
      changeUserData((prevState) => ({
        ...prevState,
        username: userInfo.username || '',
        email: userInfo.email || '',
        password: '',
        bio: userInfo.bio || ''
      }));
    }
  }, [userInfo]);


  if (isLoading) {
    return (
      <div className='w-screen h-dvh flex items-center justify-center'>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }



  return (
    // <div className='w-full h-dvh bg-red flex items-center justify-center'>{isError ? <div className='text-red-500'>{error.message}</div> : <div>{JSON.stringify(userInfo)}</div>}</div>
    <div className='w-[700px] h-[900px] rounded-t-3xl border-gray-300 border-[1.5px] relative p-[2%]'>
      <div className='font-bold text-2xl text-black'>{userInfo?.username}</div>
      <div className='text-black'>{userInfo?.email}</div>

      <div className="avatar absolute top-[2%] right-[5%]">
        <div className="w-24 rounded-full">
          <img src={
            userInfo?.profilePicture.length === 0 ? "/assets/common/noProfile.png" : userInfo?.profilePicture} />
        </div>
      </div>
      {/*Profile picture in here*/}
      <div className='text-gray-500 py-[20px]'>Bio : {userInfo?.bio === "" ? <span>This user has not put any bio.</span> : userInfo?.bio}</div>
      <div className='text-gray-500'>Joined {userInfo?.createdAt.split('-')[0]}</div>


      {/* Modal */}
      <label htmlFor="my_modal_7" className="btn w-[100%] h-[40px] rounded-lg border-gray-300 border-[1.5px] mt-[40px]">Edit</label>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">

        <div className="modal-box">
          <div className='w-full h-full flex gap-2 flex-col'>
            <div className='w-full h-[30px] text-center font-bold'>User Profile</div>

            <form
              className='w-full h-full flex gap-2 flex-col'
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(JSON.stringify(userData))
              }}>


              {/* For username */}
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  name='username'
                  type="text"
                  className="grow"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleInputChange}
                />
              </label>

              {/* For current password */}
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input
                  name='password'
                  type="password"
                  className="grow"
                  placeholder='Current Password'
                  onChange={handleInputChange}
                />
              </label>

              {/* For new password */}
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input
                  name='newPassword'
                  type="password"
                  className="grow"
                  placeholder='New Password'
                  onChange={handleInputChange}
                />
              </label>

              {/* For Bio */}
              <label className="input input-bordered flex items-center gap-2">
                <input
                  name='bio'
                  type="text"
                  className="grow"
                  placeholder="Bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                />
              </label>

              {isError ? <div className='text-red-500 text-center'>{error.message}</div> : <></>}

              {/* Submit BUTTON */}
              <button
                className="btn btn-neutral w-[100%]"
                type='submit'
              >
                Save
              </button>

            </form>

          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>
      {/* Modal End */}
    </div>
  )
}

export default UserProfile