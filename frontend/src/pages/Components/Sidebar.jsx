
import { useQueryClient, useMutation, useQuery } from 'react-query'

import React from 'react'
import Home from '../../../public/assets/Components/sidebar/home.jsx'
import Search from '../../../public/assets/Components/sidebar/search.jsx'
import AddPost from '../../../public/assets/Components/sidebar/addPost.jsx'
import Notification from '../../../public/assets/Components/sidebar/notification.jsx'
import Profile from '../../../public/assets/Components/sidebar/profile.jsx'
import Menu from '../../../public/assets/Components/sidebar/menu.jsx'
import Logo from '../../../public/assets/Components/sidebar/logo.jsx'
import { Link } from 'react-router-dom'
import PostAreaComponent from './PostAreaComponent.jsx'

const Sidebar = () => {

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async () => {
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/logout`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            })

            let data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Logout Fetch Error.')
        },
        onSuccess: (() => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            window.location.href = '/login'
        })
    })

    let handleLogout = () => {
        mutate()
    }

    const { data: authUser } = useQuery({ queryKey: ["authUser"] })

    return (
        <div className=' h-full w-[80px] fixed left-0 top-0 z-10 flex flex-col items-center justify-between'>
            <Link
                className='mt-[25%] flex items-center justify-center hover:scale-110 transition duration-300 hover:cursor-pointer'
                to='/'
            >
                <Logo />
            </Link>

            <div className='flex flex-col items-center justify-around  h-[400px]'>
                <Link
                    to='/'
                >
                    <Home />
                </Link>

                <div>
                    <Search />
                </div>

                <div>
                    <PostAreaComponent logo={<AddPost />} />
                </div>

                <div>
                    <Notification />
                </div>

                <Link className='hover:cursor-pointer'
                    to={`/profile/${authUser?.username}`}
                >
                    <Profile />
                </Link>



            </div>

            <div className='w-full mb-[30%] flex items-center justify-center '>

                <div className="dropdown dropdown-right dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1"><Menu /></div>

                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow outline outline-[1px] outline-[rgba(0,0,0,0.4)]">
                        <li className='text-red-600 font-bold' onClick={handleLogout}><a>Logout</a></li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default Sidebar