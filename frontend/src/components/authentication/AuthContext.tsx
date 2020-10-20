import React from 'react'
import { useQuery } from 'react-query';
import { isAuthenticated } from 'src/api';

const AuthContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: () => { }
});

export const AuthProvider: React.FunctionComponent = ({ children }) => {
    let { data: isAuth } = useQuery('auth', isAuthenticated);

    const setAuthenticated = () => {
        isAuth = true;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!isAuth, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);
