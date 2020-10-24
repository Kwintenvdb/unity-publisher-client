import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { KIND, Notification } from 'baseui/notification';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { isSubscribedToEmailAlerts, subscribeToEmailAlerts, unsubscribeFromEmailAlerts } from 'src/api';
import { createFormOverrides } from 'src/overrides/InputOverrides';
import { Card } from '../common/Card';

type FormData = {
    email: string;
};

export function Settings() {
    const { register, errors, handleSubmit } = useForm<FormData>();

    const { data: isSubscribed } = useQuery('subscribed', isSubscribedToEmailAlerts);
    const queryCache = useQueryCache();

    const invalidateSubscribedCache = () => {
        queryCache.invalidateQueries('subscribed');
    };

    const [subscribeMutation] = useMutation(subscribeToEmailAlerts, {
        onSuccess: () => invalidateSubscribedCache()
    });
    const [unsubscribeMutation] = useMutation(unsubscribeFromEmailAlerts, {
        onSuccess: () => invalidateSubscribedCache()
    });

    const emailFormError = () => !!errors.email;

    const enableAlerts = (formData: FormData) => {
        subscribeMutation(formData.email);
    }

    const disableAlerts = () => {
        unsubscribeMutation();
    };

    return (
        <div>
            <h2 className="font-semibold mb-4">Settings</h2>

            <Card title="Notification Settings">
                <div className="mb-4">
                    <p>You can enable email alerts for new sales here. You will be automatically sent an email when your assets have new sales.</p>
                    <p>The server polls for new sales every 5 minutes.</p>
                </div>

                {isSubscribed &&
                    <div className="mb-4">
                        <Notification kind={KIND.info}>
                            Email alerts are currently enabled.
                        </Notification>
                    </div>
                }

                <form onSubmit={handleSubmit(isSubscribed ? disableAlerts : enableAlerts)}>
                    {!isSubscribed &&
                        <div>
                            <FormControl label={() => 'Email for sales alerts'} error={emailFormError() && 'Enter a valid email address.'}>
                                <Input name="email" type="email" placeholder="Email address"
                                    error={emailFormError()}
                                    overrides={createFormOverrides(register({ required: true }))} />
                            </FormControl>
                        </div>
                    }

                    {isSubscribed
                        ? <Button type="submit">Disable Email Alerts</Button>
                        : <Button type="submit">Enable Email Alerts</Button>
                    }
                </form>
            </Card>
        </div>
    );
}
