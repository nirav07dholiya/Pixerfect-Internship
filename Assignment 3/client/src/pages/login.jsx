import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const login = ({registered}) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log({ email, password });
        try {
            const response = await axios.post("http://localhost:8000/api/users/login", {
                email,
                password
            },{withCredentials: true});

            console.log(response.data); 
            if (response.status !== 200) {
                throw new Error("Login failed");
            }
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        registered(true);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
            <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className='cursor-pointer'>Login</button>
        </form>
    </div>
)
}

export default login