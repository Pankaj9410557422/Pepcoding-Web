let puppeteer = require("puppeteer");
// let {email, password} = require("C:\Users\asus.LAPTOP-F97U0B83\Desktop\webdev PP\4_PromisesLecture\secret.js");
let gtab;
let email ="besopo1380@aramidth.com";
let pass ="12345678";

console.log("Before");

let browserPromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
})
browserPromise
    .then(function(browserInstance){
        let newTabPromise = browserInstance.pages();
        return newTabPromise;
    }).then(function(tabArr){
        gtab = tabArr[0];
        let loginPageWillBeOpenedPromise =gtab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        return loginPageWillBeOpenedPromise;
    }).then(function(){
        let emailWillBeTypedPromise = gtab.type("#input-1",email ,{ delay : 200});
        return emailWillBeTypedPromise;
    }).then(function(){
        let passWillBeTypedPromise = gtab.type("#input-2",pass,{ delay : 200});
        return passWillBeTypedPromise;
    }).then(function(){
        let loginPageWillBeClickedPromise =waitAndClick("button[data-analytics='LoginPassword']");
        // Promise.all([
        //     gtab.waitForNavigation({ waitUntil: 'networkidle0' }),
        //     gtab.click("button[data-analytics='LoginPassword']"),
        //     gtab.waitForSelector(".card-content h3[title='Interview Preparation Kit']", {visible:true})
        // ]);
        return loginPageWillBeClickedPromise;
    }).then(function(){
        let interviewPracticeWillBeClickedCombinedPromise = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
        // Promise.all([
        //     gtab.waitForNavigation({ waitUntil: 'networkidle0' }),
        //     gtab.click(".card-content h3[title='Interview Preparation Kit']"),
        //     gtab.waitForSelector("a[data-attr1='warmup']", {visible:true}),
        //     // gtab.click("h3[title='Interview Preparation Kit']"),
        // ]);
        return interviewPracticeWillBeClickedCombinedPromise;
    }).then(function(){
        let warmupChallengeWillBeClickedCombinedPromise =waitAndClick("a[data-attr1='warmup']")
        // Promise.all([
        //     gtab.waitForNavigation({ waitUntil: 'networkidle0' }), 
        //     //gtab.click(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled"),
        //     gtab.click("a[data-attr1='warmup']"),
        //     gtab.waitForSelector("a[data-attr1='sock-merchant']",{visible:true})

        // ]);
        return warmupChallengeWillBeClickedCombinedPromise;
    }).catch(function(err){
        console.log(err);
    })

    function waitAndClick(selector){
        return new Promise(function(resolve,reject){
            let selectorWaitPromise = gtab.waitForSelector(selector,{visible:true});
            selectorWaitPromise.then(function(){
                let selectorClickPromise = gtab.click(selector);
                return selectorClickPromise;
            }).then(function(){
                resolve();
            })
        })
    }



    // }).then(function(){
    //     let quesCombinedPromise = Promise.all([
    //         gtab.waitForNavigation({waitUntil:'networkidle0'}),
    //         gtab.click("a[data-attr1='sock-merchant']")
    //     ])
    //     return quesCombinedPromise;
    // }).then(function(){
    //     let quesSolverPromise = quesSolver();
    //     return quesSolverPromise;
    // })
console.log("After");``
// .then(function(){
//     console.log("warmup Challenges opened");
// }).catch(function(err){
//     console.log(err);
// })