import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Notification } from 'baseui/notification';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Card } from '../common/Card';
import { useMutation } from 'react-query';
import { createFormOverrides } from 'src/overrides/InputOverrides';
import { AuthCredentials, authenticate } from 'src/api';

type LocationState = {
    referrer: Location;
};

export function Authentication() {
    const location = useLocation<LocationState>();
    const { register, handleSubmit } = useForm<AuthCredentials>();
    const { isAuthenticated, setAuthenticated } = useAuth();
    const [authenticateMutation, { isLoading }] = useMutation(authenticate);

    const onSubmit = async (data: AuthCredentials) => {
        await authenticateMutation(data);
        setAuthenticated(true);
    };

    if (isAuthenticated) {
        return (
            <Redirect to={location.state.referrer} />
        );
    }

    return (
        <div className="container h-full flex items-center justify-center">
            <div className="lg:w-1/3 w-1/2">
                <Card title="Log in with your Unity ID">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl label={() => 'Email'}>
                            <Input name="email" type="email" placeholder="Email address" overrides={createFormOverrides(register)} />
                        </FormControl>

                        <FormControl label={() => 'Password'}>
                            <Input name="password" type="password" placeholder="Password" overrides={createFormOverrides(register)} />
                        </FormControl>
                        <Button type="submit" isLoading={isLoading}>Submit</Button>
                    </form>

                    <Notification kind="warning" overrides={{
                        Body: {
                            style: {
                                width: '100%'
                            }
                        }
                    }}>
                        <p className="mb-1">IMPORTANT NOTE</p>
                        <p className="font-normal">
                            Enter your Unity ID credentials here. Your credentials are not stored in the database, they are
                            only kept in memory on the server. Only a single logged in user is allowed per server instance.
                            This application has no affiliation with Unity Technologies.
                        </p>
                    </Notification>
                </Card>

            </div>

        </div>
    );
}
