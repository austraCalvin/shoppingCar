const shoppinCarCacheName = ("shoppinCarCache");
navigator && 
navigator.serviceWorker && 
navigator.serviceWorker.register("serviceWorker.js").catch((error) => {

    console.log("error message at register serviceWorker file");
    console.log(error);

}).then((response) => {

    console.log("response message at register serviceWorker file");
    console.log(response);

});
async function serviceWorkerInstall(e) {

    console.log("response from serviceWorkerInstall event!");
    console.log(e);

    const cache = (await self.caches.open(shoppinCarCacheName));
    const addCache = cache.addAll(["index.html", "style.css", "script.js", "img/apple.png", "img/bread.png", "img/meat.png", "img/melon.png", "img/onion.png", "img/orange.png"]);

    e.waitUntil(addCache);

};
function serviceWorkerActivate(e) {

    console.log("response from serviceWorkerActivate event!");
    console.log(e);

};
async function serviceWorkerFetch(e) {

    console.log("response from serviceWorkerFetch event!");
    console.log(e);
    console.log(e.request);
    console.log(e.request.url);

    const cache = (await self.caches.open(shoppinCarCacheName));
    const response = (async function(){

        const resp_1 = await cache.match(e.request);

        if(resp_1){

            console.log(resp_1);
            return resp_1

        }else{

            console.log(resp_1);
            const resp_2 = await cache.match("index.html");
            return resp_2;

        };

    })();

    console.log(response);
    e.respondWith(response);

};
self.addEventListener("install", serviceWorkerInstall);
self.addEventListener("activate", serviceWorkerActivate);
self.addEventListener("fetch", serviceWorkerFetch);