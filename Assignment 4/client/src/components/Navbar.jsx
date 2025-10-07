import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const user = useSelector((state) => state.user.user);


  return (
      <div className='bg-blue-500 h-[8vh] w-full px-8 py-3 text-white text-2xl flex justify-between items-center shadow-md' >
        <div className="font-bold">My Blog</div>
        <div className={`space-x-4 text-lg items-center justify-center hidden md:flex ${!user ? 'md:hidden' : 'md:flex'}`} >
          <NavLink to="/" className="cursor-pointer">Home</NavLink>
          <NavLink to="/add-blog" className="cursor-pointer"><button className="bg-white text-blue-500 px-3 py-2 rounded-md cursor-pointer">Add Blog</button></NavLink>
          <NavLink to="/profile" className="h-10 w-10">
            <div className="w-full h-full bg-blue-700  text-white px-4 py-2 rounded-full cursor-pointer border-3 flex items-center justify-center">
              {user?.email.charAt(0).toUpperCase()}
            </div>
          </NavLink>
        </div>
    </div>
  )
}

export default Navbar