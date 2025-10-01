import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const register = ({ registered }) => {
  const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/users/register", {
                username,
                email,
                password
            },{withCredentials: true});

            if (response.status !== 201) {
                throw new Error("Registration failed");
            }
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        registered(true);
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='cursor-pointer'>Register</button>
            </form>
        </div>
    );
}

export default register