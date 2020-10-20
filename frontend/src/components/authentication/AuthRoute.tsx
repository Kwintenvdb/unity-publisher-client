import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const AuthRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route {...rest}>
            {isAuthenticated ? children : <Redirect to="/login"></Redirect>}
        </Route>
    );
}
