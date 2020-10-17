import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { Card } from '../common/Card';

export function Settings() {
    const [isSubscribed, setSubscribed] = useState(false);

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

            <Card>
                <h2 className="mb-2 text-gray-600">Notification Settings</h2>

                {isSubscribed
                    ? <button className="accent" onClick={disableNotifications}>Disable Push Notifications</button>
                    : <button className="accent" onClick={enableNotifications}>Enable Push Notifications</button>
                }
            </Card>
        </div>
    );
}
