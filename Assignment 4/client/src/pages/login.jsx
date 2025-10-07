import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/slices/user.js';
import { LOGIN_ROUTE } from '../utils/index.js';

const login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_ROUTE, {
                email,
                password
            }, { withCredentials: true });

            if (response.status !== 200) {
                throw new Error("Login failed");
            }
            dispatch(setUser({ user: response.data }));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        setEmail("");
        setPassword("");
    };

    return (
        <div className="w-[70vw] md:w-[23vw] h-[60vh] flex flex-col justify-start items-center rounded-2xl shadow-xl p-5 bg-white gap-10 border-t-4 border-gray-200">
            <h1 className="text-5xl text-blue-500 py-3">Login</h1>
            <form onSubmit={handleLogin} className="w-full h-auto flex flex-col justify-center items-center gap-5">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg p-2 w-full border outline-none border-blue-500 text-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg p-2 w-full border outline-none border-blue-500 text-blue-500"
                />
                <p>Don't have an account?
                    <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}> Sign up</span>
                </p>
                <button type="submit" className="cursor-pointer w-30 h-10 bg-blue-500 text-white rounded-lg font-semibold">
                    Login
                </button>
            </form>
        </div>
    )
}

export default login