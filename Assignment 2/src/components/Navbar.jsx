import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-[#FFC29B] h-[8vh] w-full px-8 py-3 text-[#B95E82] text-2xl flex justify-between items-center' >
          <div className="font-bold">My Blog</div>
          <div className="space-x-4 text-lg flex items-center justify-center">
            <NavLink to="/" className="cursor-pointer">Home</NavLink>
            <NavLink to="/add-blog" className="cursor-pointer"><button className="bg-[#B95E82] text-[#FFC29B] px-4 py-2 rounded cursor-pointer">Add Blog</button></NavLink>
          </div>
    </div>
  )
}

export default Navbar