import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routingConstants } from '../Constants/routingConstants';

const MainLogin = () => {
    const navigate = useNavigate();

    const navigateToUserLogin = () => {
        navigate(routingConstants?.newLogin );
    };

    const navigateToAdminLogin = () => {
        navigate(routingConstants?.userlogin);
    };

    return (
        <div>
            <div className="main-login-container">
                <div>
                    <h2>Login</h2>
                </div>
                <div>
                    <button onClick={navigateToUserLogin}>New Registration</button>
                    <button onClick={navigateToAdminLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default MainLogin;