import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { isAuthenticated } from 'src/api';

const AuthContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: (authenticated: boolean) => { }
});

export const AuthProvider: React.FunctionComponent = ({ children }) => {
    const { data } = useQuery('auth', isAuthenticated);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(!!data);
    }, [data]);

    const setAuthenticated = (authenticated = true) => {
        setAuth(authenticated);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: auth, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);
