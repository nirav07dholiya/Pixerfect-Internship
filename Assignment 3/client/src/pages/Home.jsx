import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [AllBlog, setAllBlog] = useState([])

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/posts/', { withCredentials: true });
                const data = response.data;
                console.log({ data });
                if (response.status === 200) {
                    setAllBlog(data.blogs);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBlogs();
    }, [])

    const ViewBlog = (blog) => {
        console.log(blog    );
        localStorage.setItem("viewBlog", JSON.stringify(blog._id))
        navigate('/view-blog')
    }

    return (
        <div className='w-full h-full flex flex-col py-4 items-center scroll-auto gap-3'>
            {AllBlog.length > 0 ?
                AllBlog.reverse().map((blog, index) => {
                    return (
                        <div key={index} className="w-[60vw] min-h-[19vh] border-2 bg-[#FFC29B] rounded-lg px-4 py-2 flex flex-col gap-2 cursor-pointer " onClick={() => ViewBlog(blog)}>
                            <div className="flex  flex-col">
                                <p className="text-3xl py-2 font-semibold">Title: {blog.title}</p>
                                <hr />
                                <p className="text-2xl py-2 font-semibold text-right">~ {blog.author.username || '-'}</p>
                                    <p className="text-xs"><span className="font-semibold text-sm">Created At:</span> {blog.createdAt || '-'}</p>
                            </div>
                        </div>)
                })
                : <div className="text-2xl font-semibold">No Blogs Available</div>}
        </div>
    )
}

export default Home