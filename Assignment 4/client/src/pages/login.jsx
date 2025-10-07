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
    const [error, setError] = useState({ type: "", content: "" })

    function isValidEmailSimple () {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email) {
                    return setError({ type: "email", content: "Email is required." })
                }
            if (!isValidEmailSimple()){
                return setError({type:"invalid",content:"Invalid email."})
            }
            if (!password) {
                return setError({ type: "password", content: "Password is required." })
            }
            const response = await axios.post(LOGIN_ROUTE, {
                email,
                password
            }, { withCredentials: true });

            if (response.status !== 200) {
                setError({ type: "incorrect", content: "Email or Pass word incorrect." });
                throw new Error("Login failed");
            } else {
                setError({ type: "", content: "" })
                dispatch(setUser({ user: response.data }));
                navigate("/");
            }
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
                <div className="w-full">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg p-2 w-full border outline-none border-blue-500 text-blue-500"
                    />
                    <span className={`text-red-500 ${error.type == "email" || error.type == "invalid" ? 'flex' : 'hidden'} h-3 text-sm`}>{error.content}</span>
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-lg p-2 w-full border outline-none border-blue-500 text-blue-500"
                    />
                    <span className={`text-red-500 ${error.type == "password" || error.type == "incorrect" ? 'flex' : 'hidden'}`}>{error.content}</span>
                </div>
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
