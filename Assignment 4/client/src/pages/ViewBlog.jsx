import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearEdit, clearView, setEdit } from '../redux/slices/user';
import { ADD_COMMENT_ROUTE, HOST } from '../utils'

const ViewBlog = () => {
    const dispatch = useDispatch()
    const view = useSelector((state) => state.user.view);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()
    const [viewedBlog, setViewedBlog] = useState("");
    const [comment, setComment] = useState("");
    const [blogComments, setBlogComments] = useState([]);
    const [updateCmt, setUpdateCmt] = useState(false);

    useEffect(() => {
        const fetchViewedBlog = async () => {
            try {
                const response = await axios.get(`${HOST}/api/posts/id/${view}`, { withCredentials: true });
                const data = response.data;
                if (response.status === 200) {
                    setViewedBlog(data.blog);
                    setBlogComments(data.blog.comments.reverse());
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchViewedBlog();
        dispatch(clearEdit())
    }, [updateCmt])

    const deleteBlog = async () => {
        const answer = window.confirm("Delete blog??")
        if (!answer) return 0;
        await axios.delete(`${HOST}/api/posts/${viewedBlog._id}`, { withCredentials: true });
        dispatch(clearView())
        navigate('/')
    }

    const editBlog = async () => {
        dispatch(setEdit(viewedBlog))
        navigate('/add-blog')
    }

    const sendComment = async () => {
        try {
            if (!comment || comment.trim() === "") return;
            console.log({ comment });
            const response = await axios.post(ADD_COMMENT_ROUTE, { commentText: comment, postId: viewedBlog._id }, { withCredentials: true });
            if (response.status === 200) {
                setBlogComments([...blogComments, response.data.comment]);
            }
            setComment("")
            setUpdateCmt(!updateCmt)
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <div className='w-full h-full flex flex-col md:flex-row py-4 gap-5 px-5 md:px-10'>
            <div className="flex flex-col scroll-auto gap-5 items-center">
                <div className=" w-[90vw] md:w-[60vw] min-h-[19vh] shadow-lg rounded-lg px-4 py-2 flex flex-col gap-2">
                    {viewedBlog ? (
                        <div>
                            <h1 className='text-3xl py-2 font-semibold'>{viewedBlog?.title}</h1>
                            <hr />
                            <p className=''>{viewedBlog?.content}</p>
                            <p className='text-right mb-4 font-bold'>~ {viewedBlog?.author.username}</p>
                            <p className="text-[11px]">Created At: {viewedBlog?.createdAt || '-'}</p>
                        </div>
                    ) : (
                        <p>No blog found</p>
                    )}
                </div>
                {
                    user._id === viewedBlog.author?._id && (
                        <div className="w-[90vw] md:w-[60vw] h-[4vh] md:h-[6vh] flex justify-end gap-3">
                            <button className='shadow-lg border-2 rounded-md p-2 cursor-pointer flex items-center justify-center ' onClick={() => editBlog()}>Edit</button>
                            <button className='shadow-lg rounded-md p-2 bg-red-600 text-[#FFECC0] cursor-pointer flex items-center justify-center' onClick={() => deleteBlog()}>Delete</button>
                        </div>
                    )
                }
            </div>

            <div className="w-full h-[80vh]">
                <h1 className='text-xl font-semibold'>Comments</h1>
                <div className="h-[73vh] w-full overflow-y-auto overflow-x-hidden  flex flex-col gap-1 items-center   ">
                    {
                        blogComments.length > 0 ? (
                            blogComments.map((cmt, index) => (
                                <div key={index} className='w-[35vw] text-wrap break-words p-2 bg-[#eef0f4b4] rounded-lg shadow-sm '>
                                    <div className="flex items-center gap-2 h-8 p-3+" >
                                        <div className='w-[1.45vw] h-[3vh] rounded-full flex items-center justify-center border-2 border-blue-500 text-sm text-blue-500 bg-white'>{cmt.userId.email.charAt(0).toUpperCase()}</div>
                                        <span className='font-semibold text-xl flex items-center justify-center mb-1'>
                                            <p>{cmt.userId.username}</p></span>
                                    </div>
                                    <p className='px-3 text-sm'>{cmt.commentText}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet</p>
                        )
                    }
                </div>
                <div className="flex gap-3">
                    <textarea type="text" placeholder='add a comment' className='w-full max-h-18 min-h-18 p-2 border border-gray-300 rounded-md text-sm' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button className='p-2 bg-blue-500 text-white rounded-md px-4' onClick={() => sendComment()}>send</button>
                </div>
            </div>
        </div>
    )
}

export default ViewBlog