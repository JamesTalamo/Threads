import { useMutation } from 'react-query';

import { toast } from 'react-hot-toast'



import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

 

    const { mutate, isError, error } = useMutation({
        mutationFn: async ({ email, username, password }) => {
            try {
                let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email, username, password }),
                    credentials: 'include'
                })

                let data = await res.json()

                if (!res.ok) throw new Error(data.error || 'Register Page Fetch Error.')
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: (() => {

            toast.success('User has been created.', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            navigate('/login')

        })


    })

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate();


    let submitForm = (e) => {
        e.preventDefault()
        mutate(formData)
    }

    let handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='w-screen h-dvh bg-white relative flex items-center justify-center'>
            <img
                className=' object-fill absolute top-0 left-0 '
                src='./assets/Auth/RegisterAsset1.png'
            />

            <div className='w-[370px] z-[10]  flex items-center justify-center flex-col p-5'>
                <div className='font-bold'>Create Your Account</div>

                <form type='submit' className='w-[100%]  flex items-center justify-center flex-col gap-4 pt-5' onSubmit={submitForm}>
                    <input type="text" placeholder="Username" class="input input-bordered w-full max-w-xs bg-white" name='username' onChange={handleInputChange} />
                    <input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs bg-white" name='email' onChange={handleInputChange} />
                    <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs bg-white" name='password' onChange={handleInputChange} />
                    <button className="btn btn-neutral bg-black w-[97%]">Register</button>
                    {isError && <p className='text-red-500'>
                        {error.message}
                    </p>}
                </form>
                <div className='pt-10'> Already have an account? Login! </div>

                <Link to='/login'>
                    <button className="btn btn-sm" >Login</button>
                </Link>


            </div>
        </div>
    )
}

export default RegisterPage