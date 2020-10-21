import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import superagent from 'superagent';
import { useAuth } from './AuthContext';

export function Authentication() {
    const { register, handleSubmit } = useForm<FormData>();
    const { isAuthenticated, setAuthenticated } = useAuth();

    const onSubmit = (data: FormData) => {
        superagent.post('/api/authenticate')
            .send(data)
            .then(() => {
                console.log('authenticated');
                setAuthenticated();
            });
    };

    if (isAuthenticated) {
        return (
            <Redirect to="/"></Redirect>
        );
    }

    return (
        <div>
            <p>Log in</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="email" type="email" ref={register} />
                <input name="password" type="password" ref={register} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
