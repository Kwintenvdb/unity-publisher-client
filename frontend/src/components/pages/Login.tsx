import React from 'react';
import { Authentication } from '../authentication/Authentication';
import { useAuth } from '../authentication/AuthContext';
import { Spinner } from 'baseui/spinner';

export function Login() {
    const { authStatusLoading } = useAuth();

    if (authStatusLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Spinner></Spinner>
            </div>
        );
    }

    return (
        <Authentication></Authentication>
    );
}
