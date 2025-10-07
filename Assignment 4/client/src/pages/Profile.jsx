import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/slices/user';

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const logoutUser = async () => {
        try {
            console.log("hello");
            const response = await axios.get("http://localhost:8000/api/users/logout", {
                withCredentials: true,
            });
            if (response.status === 200) {
                navigate("/login");
                dispatch(clearUser())
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-between h-full w-full gap-5 py-5'>
            <div className="flex flex-col items-center justify-center gap-10 ">
                <div className="w-[90vw] md:w-[50vw] h-[17.5vh] md:h-[25vh] bg-white p-4 rounded-xl shadow-lg flex gap-3 ">
                    <div className="w-[30vw] md:w-[10vw] h-full rounded-full flex items-center justify-center text-5xl border-4 border-blue-500 text-blue-500">{user?.email.charAt(0).toUpperCase()}</div>
                    <div className="w-[1.5px] h-full bg-gray-400"></div>
                    <div className="flex flex-col justify-center gap-2 mb-3">
                        <div className="font-bold text-3xl md:text-5xl">{user?.username}</div>
                        <div className="text-xl md:text-3xl font-semibold text-gray-400">{user?.email}</div>
                    </div>
                </div>
                <div className="w-[90vw] md:w-[50vw] h-[8vh] bg-white p-4 rounded-xl shadow-lg flex gap-3 items-center justify-between hover:bg-blue-500 hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/my-blogs')}>
                    <span>My Blogs</span>
                    <span> {">"} </span>
                </div>

            </div>
            <div className=" bg-white p-2 flex gap-3 items-center justify-between hover:text-blue-500 transition-colors cursor-pointer" onClick={() => logoutUser()}>Log Out</div>
        </div>
    )
}

export default Profile