import { createContext, useState } from 'react';
import { apiCall } from '../services/commonapi';
import { apiConstants } from '../Constants/routingConstants';
import { SERVERNAME, showErrorToast, showSuccessToast } from '../utilities/utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password, role) => {
        try {
            const data = await apiCall(`${SERVERNAME}${apiConstants?.userlogin}`, 'POST', { email, password, role });
            showSuccessToast('Login successful');
            setUser(data.user);
        } catch (error) {
            showErrorToast(error.message);
        }
    };

    const register = async (email, password, role) => {
        try {
            const data = await apiCall(`${SERVERNAME}${apiConstants?.newLogin}`, 'POST', { email, password, role });
            showSuccessToast('Registration successful');
            setUser(data.user);
        } catch (error) {
            showErrorToast(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};