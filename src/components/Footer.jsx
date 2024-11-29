import React from 'react'
import HeartLogo from "../images/heart.png"

const Footer = () => {
  return (
    <div  className='bg-[#1e293b] text-white  w-full'>
      <div>
      <h1 className="text-xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
      </div>

      <div className='flex justify-center items-center'>
        
        Created with <img className='w-8 mx-2' src={HeartLogo} alt="" /> by Tausif Shaikh
      </div>
    </div>
  )
}

export default Footer
