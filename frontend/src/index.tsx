import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import superagent from 'superagent';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();

async function init() {
    if ('serviceWorker' in navigator) {

        const sw = await navigator.serviceWorker.ready;
        console.log(sw);

        const publicKey = 'BE8WIaYS7oi4LE1nONDmiZ_qoUPw-H4CKC8B8ncRCSLguT0n69yKB0sLnwRzEv7rUOJJR_FBdyo4En4nuehhwak';
        const sub = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
        });
        console.log('subscription', sub);
        console.log(sub.toJSON());

        superagent.post('/api/subscribeToNotifications')
            .send(sub.toJSON())
            .then(() => {
                console.log('sent subscription');
            });
        // navigator.serviceWorker.register('sw.js').then(function (reg) {
        //     console.log('Service Worker Registered!', reg);

        //     reg.pushManager.getSubscription().then(function (sub) {
        //         if (sub === null) {
        //             // Update UI to ask user to register for Push
        //             console.log('Not subscribed to push service!');
        //         } else {
        //             // We have a subscription, update the database
        //             console.log('Subscription object: ', sub);
        //         }
        //     });
        // }).catch(function (err) {
        //     console.log('Service Worker registration failed: ', err);
        // });
    }
}

init();
