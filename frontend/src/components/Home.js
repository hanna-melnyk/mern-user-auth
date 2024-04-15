import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
