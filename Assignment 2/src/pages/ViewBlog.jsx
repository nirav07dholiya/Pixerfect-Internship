import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewBlog = () => {
    const navigate = useNavigate()
    const [viewdBlog, setViewedBlog] = useState();
    useEffect(() => {
        localStorage.getItem("viewBlog") && setViewedBlog(JSON.parse(localStorage.getItem("viewBlog")))
        localStorage.setItem("editBlog", "")
    }, [])


    const filterData = () => {
        const allData = JSON.parse(localStorage.getItem("blogData")) || [];
        const newData = allData.filter((data) => data.title != viewdBlog.title)
        localStorage.setItem("blogData", JSON.stringify(newData))
    }

    const deleteBlog =async () => {
        const answer = window.confirm("Delete blog??")
        if (!answer) return 0;
        await filterData();
        localStorage.setItem("viewBlog", "")
        navigate('/')
    }

    const editBlog = async() => {
        localStorage.setItem("editBlog", JSON.stringify(viewdBlog))
        navigate('/add-blog')
    }

    return (
        <div className='w-full h-full flex flex-col py-4 items-center scroll-auto gap-3'>
            <div className="w-[60vw] min-h-[19vh] border-2 border-black rounded-lg px-4 py-2 flex flex-col gap-2">
                {viewdBlog ? (
                    <div>
                        <h1 className='text-3xl py-2 font-semibold'>{viewdBlog.title}</h1>
                        <hr/>
                        <p className=''>{viewdBlog.content}</p>
                        <p className='text-right mb-4 font-semibold'>~ {viewdBlog.author}</p>
                        <div className="flex justify-between text-sm">
                            <p className="font-semibold">Created At: {viewdBlog.createdAt || '-'}</p>
                            <p className="font-semibold">Last Modified: {viewdBlog.lastModified || '-'}</p>
                        </div>
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