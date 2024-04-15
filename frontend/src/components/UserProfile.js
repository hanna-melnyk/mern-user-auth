import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>No user data</p>
            )}
        </div>
    );
}

export default UserProfile;
