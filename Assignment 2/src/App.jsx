import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'
import ViewBlog from './pages/ViewBlog'

const App = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-red-3000'>
      <Navbar/>
      <div className="w-full h-[92vh] bg-[#FFECC0] flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/view-blog" element={<ViewBlog />} />
          </Routes>
      </div>
    </div>
  )
}

export default App