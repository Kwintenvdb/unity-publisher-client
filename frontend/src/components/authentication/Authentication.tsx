import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import superagent from 'superagent';
import { useAuth } from './AuthContext';
import { Card } from '../common/Card';
import { useMutation } from 'react-query';

function authenticate(data: FormData): Promise<void> {
    return superagent.post('/api/authenticate')
        .send(data)
        .then(() => {
            console.log('authenticated');
        });
}

export function Authentication() {
    const { register, handleSubmit } = useForm<FormData>();
    const { isAuthenticated, setAuthenticated } = useAuth();

    const [authenticateMutation, { isLoading }] = useMutation(authenticate);

    const onSubmit = async (data: FormData) => {
        await authenticateMutation(data);
        setAuthenticated(true);
    };

    if (isAuthenticated) {
        return (
            <Redirect to="/"></Redirect>
        );
    }

    return (
        <div className="container h-full flex items-center justify-center">
            <div className="w-1/3">
                <Card title="Log in">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl label={() => "Email"}>
                            <Input name="email" type="email" placeholder="Email address" overrides={{
                                Input: {
                                    props: {
                                        ref: register
                                    }
                                }
                            }} />
                        </FormControl>

                        <FormControl label={() => "Password"}>
                            <Input name="password" type="password" placeholder="Password" overrides={{
                                Input: {
                                    props: {
                                        ref: register
                                    }
                                }
                            }} />
                        </FormControl>
                        <Button type="submit" isLoading={isLoading}>Submit</Button>
                    </form>
                </Card>

            </div>

        </div>
    );
}
