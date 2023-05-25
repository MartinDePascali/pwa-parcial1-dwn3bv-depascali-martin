console.log("SW: I'm a service worker");

self.addEventListener('install', event => {

    const install = new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log("SW: Install complete");
            self.skipWaiting();
            resolve();
        }, 500);
    });
    event.waitUntil(install);
});

self.addEventListener('fetch', event => {
    if(event.request.url.includes('https://swapi.dev')){
        const response = new Response(`{
            "ok": false,
            "data": [],
            "message": "No se puede acceder a la API"
        }`, {
            headers: {
                'Content-type': 'application/json'
            }
        });

        event.respondWith(response);
    }
});