import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/user";
import { REGISTER_ROUTE } from "../utils";

const register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ type: "", content: "" })

    function isValidEmailSimple() {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (!username) {
                return setError({ type: "username", content: "Username is required." })
            }
            if (!email) {
                return setError({ type: "email", content: "Email is required." })
            }   
            if (!isValidEmailSimple()) {
                return setError({ type: "invalid", content: "Invalid email." })
            }
            console.log("hello");
            if (!password) {
                return setError({ type: "password", content: "Password is required." })
            }
            const response = await axios.post(
                REGISTER_ROUTE,
                {
                    username,
                    email,
                    password,
                },
                { withCredentials: true }
            );

            if (response.status !== 201) {
                setError({ type: "incorrect", content: "Email or Pass word incorrect." });
                throw new Error("Registration failed");
            }
            else {
                setError({ type: "", content: "" })
                dispatch(setUser(response.data.user));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="w-[70vw] md:w-[23vw] h-[60vh] flex flex-col justify-start items-center rounded-2xl shadow-xl p-5 bg-blue-500 gap-10">
            <h1 className="text-4xl text-white py-3">Register</h1>
            <form
                onSubmit={handleRegister}
                className="w-full h-auto flex flex-col justify-center items-center gap-5"
            >
                <div className="w-full">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="rounded-lg p-2 w-full border outline-none border-white text-white"
                    />
                    <span className={`text-red-500 ${error.type == "username" ? 'flex' : 'hidden'} h-3 text-sm`}>{error.content}</span>
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg p-2 w-full border outline-none border-white text-white"
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
                        className="rounded-lg p-2 w-full border outline-none border-white text-white"
                    />
                    <span className={`text-red-500 ${error.type == "password" || error.type == "incorrect" ? 'flex' : 'hidden'}`}>{error.content}</span>
                </div>
                <p>Have an account?
                    <span className="text-white cursor-pointer" onClick={() => navigate("/login")}> Log in</span>
                </p>

                <button type="submit" className="cursor-pointer w-30 h-10 bg-white text-blue-600 rounded-lg font-semibold">
                    Register
                </button>
            </form>
        </div>
    );
};

export default register;
