let puppeteer = require("puppeteer");
let browserWillBeLaunched = puppeteer.launch({
    headless:false
})
// browserWillBeLaunched
//     .then(function(browserInstance){
//         //newtab
//         let newPagePromise = browserInstance.newPage();
//         newPagePromise
//             .then(function(newPage){
//                 console.log("new page opened");
//                 //go to pepcoding
//                 let pageWillBeOpenedPromise =newPage.goto("https://www.pepcoding.com");
//                 pageWillBeOpenedPromise
//                     .then(function(){
//                         console.log("page is opened");
//                     })
//             })
//     })
browserWillBeLaunched
    .then(function(browserInstance){
        //newtab
        let newPagePromise = browserInstance.newPage();
            return newPagePromise;
    }).then(function(newPage){
                console.log("new page opened");
                //go to pepcoding
                let pageWillBeOpenedPromise =newPage.goto("https://www.pepcoding.com");
                return pageWillBeOpenedPromise;
    }).then(function(){
                        console.log("page is opened");
    }).catch(function(err){
        console.log(err);
    })