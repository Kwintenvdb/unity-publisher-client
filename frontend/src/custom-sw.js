// @ts-ignore ts(1208)
console.log('test test test2');

self.addEventListener('push', event => {
    console.log('received push notification');
    console.log(event);

    console.log(event.data.text());
    console.log(event.data.json());
});
