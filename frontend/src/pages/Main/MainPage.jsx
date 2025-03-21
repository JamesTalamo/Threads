import React from 'react'
import GetAllPost from '../Components/GetAllPost.jsx'

const MainPage = () => {
  return (
    <div className='w-full h-[100vh] overflow-x-hidden flex items-center justify-center bg-white'>
      <div className='h-[100%] w-full pt-[50px]   sm:px-[20%] md:px-[30%]  overflow-y-scroll absolute bottom-[0px]'>

        <div className='border-[1.5px] border-gray-300  rounded-t-3xl  absolute sm:relative pb-[10%] '>
          <GetAllPost />
        </div>
      </div>
    </div>
  )
}

export default MainPage