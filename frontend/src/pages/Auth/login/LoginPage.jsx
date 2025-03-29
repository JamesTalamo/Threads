import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from 'react-query';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/login`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include'
        })

        let data = await res.json()


        if (!res.ok) throw new Error(data.error || 'Error in LoginPage.')

      } catch (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: (() => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    })
  })



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
        <div className='font-bold text-black'>Log in with your account</div>

        <form type='submit' className='w-[100%]  flex items-center justify-center flex-col gap-4 pt-5' onSubmit={submitForm}>
          <input type="text" placeholder="Username" class="input input-bordered w-full max-w-xs bg-white text-black" name='username' onChange={handleInputChange} />
          <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs bg-white text-black" name='password' onChange={handleInputChange} />
          <button className="btn btn-neutral bg-black w-[97%]">{isLoading ? <div>Loading....</div> : <p>Login</p>}</button>
          {isError && <p className='text-red-500'>
            {error.message}
          </p>}
        </form>
        <div className='pt-10'>Don't have an account? Register!</div>

        <Link to='/register'>
          <button className="btn btn-sm">Register</button>
        </Link>

      </div>
    </div>
  )
}

export default LoginPage