let puppeteer = require("puppeteer");
let links=["https://www.amazon.in","https://www.flipkart.com","https://paytmmall.com"];
console.log("Before");
let pName = process.argv[2];
(async function(){
    try{
        let browserInstance = await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"]
        });
        let AmazonArr = await getListingFromAmazon(links[0],browserInstance,pName);
        let FlipkartArr = await getListingFromFlipkart(links[1],browserInstance,pName);
        let paytmMallArr = await getListingPaytm(links[2], browserInstance,pName);
        console.table(AmazonArr);
        console.table(FlipkartArr);
        console.table(paytmMallArr);
    }catch(err){
        console.log(err);
    }
})();

//product name, url of home page
//output->top 5 matching product->priceNAme print
async function getListingFromAmazon(link, browserInstance,pName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("#twotabsearchtextbox", pName,{delay:200});
    await newTab.click("#nav-search-submit-button");
    await newTab.waitForSelector(".a-section.a-spacing-medium .a-size-medium.a-color-base.a-text-normal",{visible:true});
    await newTab.waitForSelector(".a-price-whole",{visible:true});
    function consoleFn(priceSelector, pNameSelector){
        let priceArr=document.querySelectorAll(priceSelector);
        let pNameArr = s=document.querySelectorAll(pNameSelector);
        let details =[];
        for(let i=0; i<5;i++){
            let price =priceArr[i].innerText;
            let Name = pNameArr[i].innerText;
            details.push({
                price, Name

            })
        }
        return details;
    }
    let detailsArr = await newTab.evaluate(consoleFn,".a-price-whole",".a-section.a-spacing-medium .a-size-medium.a-color-base.a-text-normal");
    return detailsArr;
    //a price whole
    //.a-section.a-spacing-medium .a-size-medium.a-color-base.a-text-normal


}
async function getListingFromFlipkart(link, browserInstance,pName){
    let newTab=await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.click("._2KpZ6l._2doB4z");
    await newTab.type("._3704LK",pName);
    await newTab.click("button[type='submit']",pName);
    await newTab.waitForSelector("._30jeq3._1_WHN1",{visible:true});
    await newTab.waitForSelector("._2kHMtA",{visible:true});
    function consoleFn(priceSelector, pNameSelector){
        let priceArr=document.querySelectorAll(priceSelector);
        let pNameArr = s=document.querySelectorAll(pNameSelector);
        let details =[];
        for(let i=0; i<5;i++){
            let price =priceArr[i].innerText;
            let Name = pNameArr[i].innerText;
            details.push({
                price, Name

            })
        }
        return details;
    }
    let detailsArr = await newTab.evaluate(consoleFn,"._30jeq3._1_WHN1","._4rR01T");
    return detailsArr;


}

async function getListingPaytm(url, browserInstance, pName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(url);
    //iconSearch _2Ysz ->search icon click
    //searchInput  ->search bar for typing
    await newTab.type("#searchInput",pName,{delay:100});
    await newTab.keyboard.press("Enter");
    await newTab.waitForSelector(".UGUy",{visible:true});
    await newTab.waitForSelector("._1kMS",{visible:true});
    function consoleFn(priceSelector, pNameSelector){
        let priceArr=document.querySelectorAll(priceSelector);
        let pNameArr = s=document.querySelectorAll(pNameSelector);
        let details =[];
        for(let i=0; i<5;i++){
            let price =priceArr[i].innerText;
            let Name = pNameArr[i].innerText;
            details.push({
                price, Name

            })
        }
        return details;
    }
    let detailsArr = await newTab.evaluate(consoleFn,"._1kMS",".UGUy");
    return detailsArr;
    //UGUy ->class selector for pname
    //_1kMS ->price class selector
}