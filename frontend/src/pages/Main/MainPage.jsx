import React from 'react'
import GetAllPost from '../Components/GetAllPost.jsx'

const MainPage = () => {
  return (
    <div className='w-full h-[100vh] overflow-x-hidden flex items-center justify-center'>
      <div className='h-[80%] border-[1.5px] border-gray-300 w-[40%] rounded-t-3xl overflow-hidden'>
        <GetAllPost />
      </div>
    </div>
  )
}

export default MainPage