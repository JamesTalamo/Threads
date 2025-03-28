
import { useQueryClient, useMutation, useQuery } from 'react-query'
import useMessageStore from '../../store/useMessageStore.js'
import React from 'react'

import { Link } from 'react-router-dom'
import PostAreaComponent from './PostAreaComponent.jsx'
import PostAreaSmallScreen from './PostAreaSmallScreen.jsx'

import { FaThreads } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";

import { IoMenuSharp } from "react-icons/io5";



const Sidebar = () => {

    const { disconnectSocket } = useMessageStore()
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
            disconnectSocket()
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
        <div>
            {/*Side bar if malaki yung screen*/}
            <div className=' h-full w-[80px] fixed left-0 top-0 z-10 hidden sm:flex flex-col items-center justify-between'>
                <Link
                    className='mt-[25%] flex items-center justify-center hover:scale-110 transition duration-300 hover:cursor-pointer'
                    to='/'
                >
                    <FaThreads size='40' color='black' />
                </Link>

                <div className='flex flex-col items-center justify-around  h-[400px]'>
                    <Link
                        to='/'
                    >
                        <GoHome size='30' color='black' />
                    </Link>

                    {/* <div>
                        <IoIosSearch size='30' color='black' />
                    </div> */}

                    <div>

                        <PostAreaComponent logo={<IoIosAdd size='35' color='black' className='white' />} />
                    </div>

                    {/* <div>
                        <IoIosHeartEmpty size='30' color='black' />
                    </div> */}

                    <Link className='hover:cursor-pointer'
                        to={`/profile/${authUser?.username}`}
                    >
                        <MdPersonOutline size='30' color='black' />
                    </Link>

                </div>

                <div className='w-full mb-[30%] flex items-center justify-center '>

                    <div className="dropdown dropdown-right dropdown-end ">
                        <div tabIndex={0} role="button" className="btn m-1 bg-white"><IoMenuSharp size='30' color='black' /></div>

                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow outline outline-[1px] outline-[rgba(0,0,0,0.4)]">
                            <li className='text-red-600 font-bold' onClick={handleLogout}><a>Logout</a></li>
                        </ul>

                    </div>

                </div>
            </div >

            {/*Side bar if maliit yung screen*/}
            <div className='flex  items-center justify-center sm:hidden bg-white w-[100%] h-[50px] fixed bottom-0 z-[40] flex'>
                <div className='flex flex-row items-center justify-between  w-[100%]  px-[10%]'>
                    <Link
                        to='/'
                    >
                        <GoHome size='30' color='black' />
                    </Link>

                    {/* <div>
                        <IoIosSearch size='30' color='black' />
                    </div> */}

                    <div>
                        <PostAreaSmallScreen logo={<IoIosAdd size='35' color='black' />} />

                    </div>

                    {/* <div>
                        <IoIosHeartEmpty size='30' color='black' />
                    </div> */}

                    <Link className='hover:cursor-pointer'
                        to={`/profile/${authUser?.username}`}
                    >
                        <MdPersonOutline size='30' color='black' />
                    </Link>


                </div>
            </div>

            {/*Side bar if maliit yung screen *ITO YUNG LOGOUT BUTTON DUN SA TOP RIGHT pag maliit screen*/}
            <div className='flex  items-center justify-center sm:hidden bg-none w-[50px] h-[50px] fixed top-0 right-0 z-[40] flex'>
                <div className='w-full flex items-center justify-center'>

                    <div className="dropdown dropdown-left dropdown-end ">
                        <div tabIndex={0} role="button" className="btn m-1 bg-white"><IoMenuSharp size='30' color='black' /></div>

                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow outline outline-[1px] outline-[rgba(0,0,0,0.4)]">
                            <li className='text-red-600 font-bold' onClick={handleLogout}><a>Logout</a></li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar