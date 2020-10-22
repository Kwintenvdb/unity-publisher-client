import React from 'react';
import { Authentication } from '../authentication/Authentication';
import { useAuth } from '../authentication/AuthContext';
import { StyledSpinnerNext } from 'baseui/spinner';

export function Login() {
    const { authStatusLoading } = useAuth();

    if (authStatusLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <StyledSpinnerNext />
            </div>
        );
    }

    return (
        <Authentication></Authentication>
    );
}
