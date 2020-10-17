import webpush, { PushSubscription } from 'web-push';

export class NotificationService {
    private subscription: PushSubscription | null = null;

    constructor() {
        const publicKey = 'BE8WIaYS7oi4LE1nONDmiZ_qoUPw-H4CKC8B8ncRCSLguT0n69yKB0sLnwRzEv7rUOJJR_FBdyo4En4nuehhwak';
        const privateKey = 'PxL0WOCsZeKc1z7mv9rrxOPYvorQ2DqQuUMvri37wqA';
        webpush.setVapidDetails(
            'http://localhost:3000',
            publicKey,
            privateKey
        );
    }

    subscribe(subscription: PushSubscription) {
        this.subscription = subscription;
    }

    unsubscribe() {
        this.subscription = null;
    }

    sendNotification(payload: string) {
        if (this.subscription) {
            console.log('sending push notification to frontend');
            webpush.sendNotification(this.subscription, payload);
        }
    }
}
