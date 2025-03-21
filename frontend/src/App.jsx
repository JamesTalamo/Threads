import { Route, Routes, Navigate } from "react-router-dom"
import RegisterPage from "./pages/Auth/register/RegisterPage.jsx"
import LoginPage from "./pages/Auth/login/LoginPage.jsx"


import MainPage from "./pages/Main/MainPage.jsx";
import UserProfile from "./pages/Main/UserProfile.jsx";

import { Toaster } from 'react-hot-toast';

import { useQuery } from 'react-query'

import Sidebar from "./pages/Components/Sidebar.jsx";
import MainMessagePage from "./pages/Message/MainMessagePage.jsx";
import useMessageStore from "./store/useMessageStore.js";

function App() {
  const { setCurrentUser, connectSocket } = useMessageStore()

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/me`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          },
          credentials: 'include'
        })

        let data = await res.json()

        setCurrentUser(data) // inistore ko yung current user sa zustand
        connectSocket()

        if (data.error) return null

        if (!res.ok) throw new Error(data.error || 'Something Went Wrong.')

        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false
  })



  if (isLoading) {
    return (
      <div className='w-screen h-dvh flex items-center justify-center'>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }



  return (
    <div className='w-screen h-dvh flex justify-center items-end relative'>

      {authUser && <Sidebar />}
      <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={authUser ? <MainPage /> : <Navigate to='/login' />} />

        <Route path='/register' element={authUser ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />} />


        <Route path='/message/:username' element={authUser ? <MainMessagePage /> : <Navigate to="/" />} />
        <Route path={`/profile/:username`} element={authUser ? <UserProfile /> : <Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
