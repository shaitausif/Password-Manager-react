import React from 'react'
import githubLogo from "../images/github.png"

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      {/* md:container px-40 md:mx-auto flex justify-between py-3 items-center */}
        <div className="flex justify-between mx-10 items-center py-1 md:px-40 md:mx-auto md:py-3">
        <div className="logo font-bold text-xl md:text-2xl">
            <span className="text-green-500">&lt;</span>
            Pass
            <span className="text-green-500">OP/&gt;</span>
            </div>
            <div>
        <button className='bg-green-700 pr-2 flex rounded-full w-fit  justify-between items-center ring-1 ring-white'>
          <img className='object-center invert rounded-full w-8 md:w-10' src={githubLogo} alt="Github logo" />
          <span className='md:text-md text-sm'>GitHub</span>
        </button>
        </div>
        </div>
        
    </nav>
  )
}

export default Navbar
