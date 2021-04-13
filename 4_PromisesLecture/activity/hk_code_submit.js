let puppeteer = require("puppeteer");
let {email, pass} = require("./secret");
let {codes} = require("./code")
let gtab;


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
    }).then(function(){
        let url = gtab.url();
        console.log(url);
        let quesObj = codes[0];
        let fqsp=questionSolver(url, quesObj.soln, quesObj.qName);
        for(let i=1;i<codes.length;i++){
            fqsp =fqsp.then(function(){
                return questionSolver(url,codes[i].soln, codes[i].qName)
            })
        }
        return fqsp;
    }).then(function(){
        console.log("All ques submitted");
    })
    .catch(function(err){
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
            }).catch(function(err){
                reject(err);
            })
        })
    }

    // questionName->appear->click
    // read 
    // copy 
    // paste 
    // submit
    //Remenber You cannot write the code in editor hme copy paste krni h

    function questionSolver(modulepageUrl, code, questionName) {
        return new Promise(function (resolve, reject) {
            // page visit 
            let reachedPageUrlPromise = gtab.goto(modulepageUrl);
            reachedPageUrlPromise
                .then(function () {
                    //  page h4 -> mathcing h4 -> click
                    // function will exceute inside the browser
                    function browserconsolerunFn(questionName) {
                        let allH4Elem = document.querySelectorAll("h4");
                        let textArr = [];
                        for (let i = 0; i < allH4Elem.length; i++) {
                            let myQuestion = allH4Elem[i]
                                .innerText.split("\n")[0];
                            textArr.push(myQuestion);
                        }
                        let idx = textArr.indexOf(questionName);
                        console.log(idx);
                        console.log("hello");
                        allH4Elem[idx].click();
                    }
                    let pageClickPromise = gtab.evaluate(browserconsolerunFn, questionName);
                    return pageClickPromise;
                })
                .then(function () {
                    // checkbox click
                    let inputWillBeClickedPromise = waitAndClick(".custom-checkbox.inline");
                    return inputWillBeClickedPromise;
                }).then(function () {
                    // type `
                    let codeWillBeTypedPromise = gtab.type(".custominput", code);
                    return codeWillBeTypedPromise;
                }).then(function () {
                    let controlIsHoldPromise = gtab.keyboard.down("Control");
                    return controlIsHoldPromise;
                }).then(function () {
                    // ctrl a
                    let aisPressedpromise = gtab.keyboard.press("a");
                    return aisPressedpromise;
                    // ctrl x
                }).then(function () {
                    let cutPromise = gtab.keyboard.press("x");
                    return cutPromise;
                })
                .then(function () {
                    let editorWillBeClickedPromise = gtab.click(".monaco-editor.no-user-select.vs");
                    return editorWillBeClickedPromise;
                })
    
                .then(function () {
                    // ctrl a
                    let aisPressedpromise = gtab.keyboard.press("a");
                    return aisPressedpromise;
                    // ctrl x
                })
                .then(function () {
                    let pastePromise = gtab.keyboard.press("v");
                    return pastePromise;
                })
                .then(function () {
                    let submitIsClickedPromise = gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
                    return submitIsClickedPromise;
                })
                // ctrlv
                // submit
                .then(function () {
                    resolve();
                }).catch(function () {
                    reject(err);
                })
            // questionName-> appear -> click
            // read 
            // copy
            // paste
            // submit 
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
// .then(function(){
//     console.log("warmup Challenges opened");
// }).catch(function(err){
//     console.log(err);
// })