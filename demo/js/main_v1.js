// register the service worker if available
var offline = false;
var registr;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        console.log('Successfully registered service worker', reg);
    }).catch(function(err) {
        console.warn('Error whilst registering service worker', err);
    });
}

window.addEventListener('offline', function(e) {
    // queue up events for server
    console.log("You are offline");
    offline = true;
}, false);

window.addEventListener('online', function(e) {
    // queue up events for server
    console.log("You are online");
    offline = false;
}, false);
