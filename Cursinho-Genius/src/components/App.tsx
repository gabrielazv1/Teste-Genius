import { useState } from 'react';
import Login from './Login';
import NavBar from './NavBar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? <NavBar /> : <Login onLogin={handleLoginSuccess} />}
        </div>
    );
}

export default App;
