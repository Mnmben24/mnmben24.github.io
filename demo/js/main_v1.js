// register the service worker if available
var offline = false;
var registr;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
      updateViaCache: 'none'
      registr = reg;
        console.log('Successfully registered service worker', reg);
    }).catch(function(err) {
        console.warn('Error whilst registering service worker', err);
    });
}

window.addEventListener('offline', function(e) {
    // queue up events for server
    console.log("You are offline");
    offline = true;
    document.getElementsByTagName('body').style = "overscroll-behavior-y: contain;"
}, false);

window.addEventListener('online', function(e) {
    // queue up events for server
    registr.update();
    console.log("You are online");
    document.getElementsByTagName('body').style = "overscroll-behavior-y: auto;"
    offline = false;
}, false);
