import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { Card } from '../common/Card';
import { Button } from 'baseui/button';
import { Checkbox, STYLE_TYPE } from 'baseui/checkbox';
import { Notification, KIND } from 'baseui/notification';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { isSubscribedToEmailAlerts, subscribeToEmailAlerts, unsubscribeFromEmailAlerts } from 'src/api';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { createFormOverrides } from 'src/overrides/InputOverrides';
import { useForm } from 'react-hook-form';

// tido formdata

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

    // useEffect(() => {
    //     isSubscribedToPush().then(setSubscribed);
    // }, []);

    // const isSubscribedToPush = async () => {
    //     if ('serviceWorker' in navigator) {
    //         const sw = await navigator.serviceWorker.ready;
    //         const sub = await sw.pushManager.getSubscription();
    //         return sub !== null;
    //     }
    //     return false;
    // };

    // const enableNotifications = async () => {
    //     console.log('enabling notifications');

    //     const sw = await navigator.serviceWorker.ready;
    //     console.log(sw);

    //     const publicKey = 'BE8WIaYS7oi4LE1nONDmiZ_qoUPw-H4CKC8B8ncRCSLguT0n69yKB0sLnwRzEv7rUOJJR_FBdyo4En4nuehhwak';
    //     const sub = await sw.pushManager.subscribe({
    //         userVisibleOnly: true,
    //         applicationServerKey: publicKey
    //     });
    //     setSubscribed(true);
    //     console.log(sub.toJSON());

    //     superagent.post('/api/notifications/subscribe')
    //         .send(sub.toJSON())
    //         .then(() => {
    //             console.log('sent subscription');
    //         });
    // };

    // const disableNotifications = async () => {
    //     console.log('disabling notifications');
    //     const sw = await navigator.serviceWorker.ready;
    //     const sub = await sw.pushManager.getSubscription();
    //     await sub?.unsubscribe();
    //     await superagent.post('/api/notifications/unsubscribe')
    //         .then(() => console.log('sent unsubscription'));
    //     setSubscribed(false);
    // };

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

                {/* <Input */}
                {/* TODO make the button appear to request permission to show notifications */}


                {/* TODO use the toggle to switch notifications on and off */}
                {/* <Checkbox
                    checked={notificationsEnabled}
                    onChange={e => setNotificationsEnabled(e.currentTarget.checked)}
                    checkmarkType={STYLE_TYPE.toggle_round}>
                    Enable Push Notifications
                </Checkbox> */}
            </Card>
        </div>
    );
}
