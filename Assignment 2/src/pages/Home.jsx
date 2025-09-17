import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [AllBlog, setAllBlog] = useState([])

    useEffect(() => {
        localStorage.getItem("blogData") && setAllBlog(JSON.parse(localStorage.getItem("blogData")))
        localStorage.setItem("viewBlog","")
    }, [])

    const ViewBlog =(blog)=>{
        localStorage.setItem("viewBlog",JSON.stringify(blog))
        navigate('view-blog')
    }

    return (
        <div className='w-full h-full flex flex-col py-4 items-center scroll-auto gap-3'>
            {AllBlog.length > 0 ?
                AllBlog.map((blog, index) => {
                    return (
                        <div key={index} className="w-[60vw] min-h-[19vh] border-2 bg-[#FFC29B] rounded-lg px-4 py-2 flex flex-col gap-2 cursor-pointer " onClick={()=>ViewBlog(blog)}>
                            <div className="flex  flex-col">
                                <p className="text-3xl py-2 font-semibold">Title: {blog.title}</p>
                                <hr/>
                                <p className="text-2xl py-2 font-semibold text-right">~ {blog.author || '-'}</p>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">Created At: {blog.createdAt || '-'}</p>
                                    <p className="font-semibold">Last Modified: {blog.lastModified || '-'}</p>
                                </div>
                            </div>
                        </div>)
                })
                : <div className="text-2xl font-semibold">No Blogs Available</div>}
        </div>
    )
}

export default Home