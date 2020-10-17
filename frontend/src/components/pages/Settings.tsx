import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { Card } from '../common/Card';
import { Button } from 'baseui/button';
import { Checkbox, STYLE_TYPE } from 'baseui/checkbox';

export function Settings() {
    const [isSubscribed, setSubscribed] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        isSubscribedToPush().then(setSubscribed);
    }, []);

    const isSubscribedToPush = async () => {
        const sw = await navigator.serviceWorker.ready;
        const sub = await sw.pushManager.getSubscription();
        return sub !== null;
    };

    const enableNotifications = async () => {
        console.log('enabling notifications');

        const sw = await navigator.serviceWorker.ready;
        console.log(sw);

        const publicKey = 'BE8WIaYS7oi4LE1nONDmiZ_qoUPw-H4CKC8B8ncRCSLguT0n69yKB0sLnwRzEv7rUOJJR_FBdyo4En4nuehhwak';
        const sub = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
        });
        setSubscribed(true);
        console.log(sub.toJSON());

        superagent.post('/api/notifications/subscribe')
            .send(sub.toJSON())
            .then(() => {
                console.log('sent subscription');
            });
    };

    const disableNotifications = async () => {
        console.log('disabling notifications');
        const sw = await navigator.serviceWorker.ready;
        const sub = await sw.pushManager.getSubscription();
        await sub?.unsubscribe();
        await superagent.post('/api/notifications/unsubscribe')
            .then(() => console.log('sent unsubscription'));
        setSubscribed(false);
    };

    return (
        <div>
            <h2 className="font-semibold mb-4">Settings</h2>

            <Card title="Notification Settings">
                {/* TODO make the button appear to request permission to show notifications */}
                {isSubscribed
                    ? <Button onClick={disableNotifications}>Disable Push Notifications</Button>
                    : <Button onClick={enableNotifications}>Enable Push Notifications</Button>
                }

                {/* TODO use the toggle to switch notifications on and off */}
                <Checkbox
                    checked={notificationsEnabled}
                    onChange={e => setNotificationsEnabled(e.currentTarget.checked)}
                    checkmarkType={STYLE_TYPE.toggle_round}>
                    Enable Push Notifications
                </Checkbox>
            </Card>
        </div>
    );
}
