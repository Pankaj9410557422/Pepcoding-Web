let puppeteer = require("puppeteer");
let {email, pass} = require("../../secret");
let {codes} = require("./code")
console.log("Before");
(async function(){
    try{
    let browserInstance = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    });
    let newTab = await browserInstance.newPage();
    await newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    await newTab.type("#input-1",email ,{ delay : 200});
    await newTab.type("#input-2",pass,{ delay : 200});
    await newTab.click("button[data-analytics='LoginPassword']");
    await waitAndClick(".card-content h3[title='Interview Preparation Kit']",newTab);
    await waitAndClick("a[data-attr1='warmup']",newTab);
    let url = newTab.url();
    for(let i=0;i<codes.length;i++){
        await questionSolver(url,codes[i].soln, codes[i].qName,newTab);
    }
    console.log("Finished");
}catch(error){
    console.log(error);
}
})();

async function waitAndClick(selector,newTab){
        await newTab.waitForSelector(selector,{visible:true});
        //we did not wait this promise coz we want the calling person to await this calling function
        let selectorClickPromise = newTab.click(selector);
        return selectorClickPromise;
}
async function questionSolver(url, code, questionname,gtab){
    await gtab.goto(url);
    //click as per question name
    await gtab.evaluate(browserconsolefn,questionname);
    //initially typing ans in custom input
    await waitAndClick(".checkbox.input",gtab);
    await gtab.type(".custominput",code);
    await gtab.keyboard.down("Control");
    await gtab.keyboard.press("a");
    await gtab.keyboard.press("x");
    await gtab.keyboard.up("Control");
    //copy paste code ans in editor
    await gtab.click(".hr-monaco-editor-parent");
    await gtab.keyboard.down("Control");
    await gtab.keyboard.press("a");
    await gtab.keyboard.press("v");
    await gtab.keyboard.up("Control");
    //click submit
    await gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
}
function browserconsolefn(questionname){
    let allh4Ele=document.querySelectorAll("h4"); 
    let textarr=[];
    for(let i=0;i<allh4Ele.length;i++){
        let text=allh4Ele[i].innerText.split("\n")[0];
        textarr.push(text);
    }
    
    let idx = textarr.indexOf(questionname);
    allh4Ele[idx].click();
}