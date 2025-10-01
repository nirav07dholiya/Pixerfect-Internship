import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewBlog = () => {
    const navigate = useNavigate()
    const [viewedBlog, setViewedBlog] = useState("");

    useEffect(() => {
        const fetchViewedBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/posts/${viewedBlogId}`, { withCredentials: true });
                const data = response.data;
                console.log({ data });
                if (response.status === 200) {
                    setViewedBlog(data.blogs);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const viewedBlogId = JSON.parse(localStorage.getItem("viewBlog"));
        fetchViewedBlog()
        localStorage.setItem("editBlog", "")
    }, [])

    const deleteBlog = async () => {
        const answer = window.confirm("Delete blog??")
        if (!answer) return 0;
        const response = await axios.delete(`http://localhost:8000/api/posts/${viewedBlog[0]._id}`, { withCredentials: true });
        console.log({ response });
        localStorage.setItem("viewBlog", "")
        navigate('/')
    }

    const editBlog = async () => {
        localStorage.setItem("editBlog", JSON.stringify(viewedBlog[0]))
        console.log(JSON.stringify(viewedBlog));
        navigate('/add-blog')
    }

    return (
        <div className='w-full h-full flex flex-col py-4 items-center scroll-auto gap-3'>
            <div className="w-[60vw] min-h-[19vh] border-2 border-black rounded-lg px-4 py-2 flex flex-col gap-2">
                {viewedBlog ? (
                    <div>
                        <h1 className='text-3xl py-2 font-semibold'>{viewedBlog[0].title}</h1>
                        <hr />
                        <p className=''>{viewedBlog[0].content}</p>
                        <p className='text-right mb-4 font-semibold'>~ {viewedBlog[0].author.username}</p>
                        <p className="font-semibold text-sm">Created At: {viewedBlog[0].createdAt || '-'}</p>
                    </div>
                ) : (
                    <p>No blog found</p>
                )}  
            </div>
            <div className="w-[60vw] h-[6vh] flex justify-end gap-3">
                <button className='border-2 rounded-md p-2 cursor-pointer' onClick={() => editBlog()}>Edit</button>
                <button className=' rounded-md p-2 bg-red-600 text-[#FFECC0] cursor-pointer' onClick={() => deleteBlog()}>Delete</button>
            </div>
        </div>
    )
}

export default ViewBlog