import { useState, useEffect } from 'react';
import Login from './Login';
import NavBar from './NavBar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? <NavBar/> : <Login onLogin={handleLoginSuccess} />}
        </div>
    );
}

export default App;
