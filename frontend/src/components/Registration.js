import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/register', { username, email, password });
            console.log(res.data);
            alert("Registration successful!");
        } catch (error) {
            setError(error.response.data);
            alert(error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Registration;
