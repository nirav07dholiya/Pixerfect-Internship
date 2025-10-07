import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setView } from '../redux/slices/user';
import {HOST} from '../utils'

const MyBlogs = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [AllBlog, setAllBlog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9; 

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const response = await axios.get(
                    `${HOST}/api/posts/userid/${user._id}`,
                    { withCredentials: true }
                );
                const data = response.data;
                if (response.status === 200) {
                    setAllBlog(data.blogs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllBlogs();
    }, [user._id]);

    const ViewBlog = (blog) => {
        dispatch(setView(blog._id));
        navigate('/view-blog');
    };

    const totalPages = Math.ceil(AllBlog.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = AllBlog.slice()
        .reverse()
        .slice(indexOfFirstBlog, indexOfLastBlog);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="w-full h-full flex flex-col py-4 items-center gap-3">
            <div className="w-full px-[15vw] grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center overflow-y-auto">
                {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog, index) => (
                        <div
                            key={index}
                            className="w-[85vw] md:w-[20vw] h-[30vh] bg-[#FFFFFF] rounded-lg px-4 py-2 flex flex-col gap-2 cursor-pointer shadow-xl hover:scale-105 transition-transform justify-between relative overflow-hidden group hover:shadow-2xl hover:text-white"
                            onClick={() => ViewBlog(blog)}
                        >
                            <div class="absolute inset-0 bg-blue-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                            <div className="relative flex flex-col">
                                <p className="text-3xl py-2 font-semibold">
                                    {blog.title}
                                </p>
                                <hr />
                                <p className="line-clamp-3 ">
                                    {blog.content}
                                </p>
                                <p className="text-2xl py-2 font-semibold text-right">
                                    ~ {blog.author.username || "-"}
                                </p>
                            </div>
                            <p className="relative text-[11px] hover:text-white">
                                <span className="font-semibold ">Created At:</span>{" "}
                                {new Date(blog.createdAt).toLocaleString() || "-"}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-2xl font-semibold">No Blogs Available</div>
                )}
            </div>

            {AllBlog.length > blogsPerPage && (
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 rounded-md disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="font-semibold text-lg">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 rounded-md disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyBlogs;

