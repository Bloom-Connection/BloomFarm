const assets = [
    "/", "/css", "index.html", "marketplace.html", "signin.html", "signup.html", "reset-password.html", "forgot-password.html", "consumer-dashboard.html", "farmer-dashboard.html", "add-produce.html", "sw-register.js", 
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"] ;

self.addEventListener("install", event => { //we listen for the install event
    event.waitUntil( // in case where our cache is downloading large resources, the browser should wait until completion before the SW goes down
        caches.open("assets").then( cache => { // then we open a cache like a folder with a cache name using the caches API and then we can do something with our opened cache
            cache.addAll(assets) // on installing the sw, we cache resources using the add method or addAll that receives an array of assets(urls)
        })
    );
    

    }); 

    // To serve the files we listen to the fetch event
    
    // self.addEventListener("fetch", event => {
    //     if (event.request.url == "https://localhost:3000/fake") {
    //         const response = new Response(`Hello, I'm a response on URL ${event.request.url}`);
    //         event.respondWith(response);
    //     } else {
            // we want to try and see if the request is cached, and we do this by calling the API manually
            // event.respondWith(
            //     caches.open("assets").then( cache => {
            //         cache.match(event.request).then( cachedResponse => { // match is the search function
            //            if (cachedResponse) {
                        //    It's a cache HIT
                    //        return cachedResponse;
                    //    } else {
                        //    It's a cache MISS 
                        //    return fetch(event.request);
    //                    }  // This is a cache first pattern
    //                 }) 
    //             })
    //             )
    //         }
    //   });

// Cache first strategy
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)  // searching in the cache
            .then( response => {
                if (response) {
                    // The request is in the cache 
                    return response; // cache hit
                } else {
                    // We need to go to the network  
                    return fetch(event.request);  // cache miss
                }
            })
    );
});

    