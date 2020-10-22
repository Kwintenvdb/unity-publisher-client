import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { isAuthenticated } from 'src/api';

const AuthContext = React.createContext({
    isAuthenticated: false,
    authStatusLoading: false,
    setAuthenticated: (authenticated: boolean) => { }
});

export const AuthProvider: React.FunctionComponent = ({ children }) => {
    const { data, isLoading } = useQuery('auth', isAuthenticated);
    const [auth, setAuth] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        setAuth(!!data);
        setAuthLoading(!!isLoading);
    }, [data, isLoading]);

    const setAuthenticated = (authenticated = true) => {
        console.log('setting authenticated', authenticated);
        setAuth(authenticated);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: auth, setAuthenticated, authStatusLoading: authLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);
