let puppeteer = require("puppeteer");
//no of videos
//views
//watch time
//list of videos ->excel sheet[name, duration]

//no of videos, views ->easy kaam ->initial page ka data get kr lo
//phir scroll handle kr lo
//let Arr = document.querySelectorAll("#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer")
// let newArr=[];
// newArr.push(Arr[0].innerText(),Arr[1].innerText());

(async function(){
    try{
        let browserInstance = await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"]
        });
        let newTab = await browserInstance.newPage();
        await newTab.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");
        //evaluate
        let arr = await newTab.evaluate(consoleFn);
        let videocount = arr[0].split(" ")[0];
        videocount = Number(videocount);
        console.log(arr[0]);
        console.log(arr[1]);
        
        let pCurrentVideoCount=await scrollDown(newTab,"#video-title");
        while(videocount-50 > pCurrentVideoCount){
            pCurrentVideoCount=await scrollDown(newTab,"#video-title");
        }
        
        let timeDurArr = await newTab.evaluate(getStats,"span.style-scope.ytd-thumbnail-overlay-time-status-renderer","#video-title");
         console.table(timeDurArr);
        //get title-> a#video-title
        //duration ->"span.style-scope.ytd-thumbnail-overlay-time-status-renderer"

        
    }catch(err){
        console.log(err);
    }
})();

function consoleFn(){
let Arr = document.querySelectorAll("#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer")
let newArr=[];
newArr.push(Arr[0].innerText,Arr[1].innerText);  
return newArr; 
}

async function scrollDown(newTab, title){
    //.circle.style-scope.paper-spinner
    function getLenConsole(title){
        window.scrollBy(0, window.innerHeight);
        let titleEleArr = document.querySelectorAll(title);
        return titleEleArr.length;
    }
    return newTab.evaluate(getLenConsole,title);
}

function getStats(durationSelec,titleSelec){
    let durEleArr= document.querySelectorAll(durationSelec);
    let titleEleArr = document.querySelectorAll(titleSelec);
    let nameNewArr=[];
    for(let i=0; i<durEleArr.length;i++){
        let duration=durEleArr[i].innerText;
        let title = titleEleArr[i].innerText;
        nameNewArr.push({duration,title});
    }
    return nameNewArr;
}