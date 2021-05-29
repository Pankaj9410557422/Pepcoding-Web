let constraints = {video:true, audio:true};
let videoPlayer = document.querySelector('video');
let vidRecordBtn = document.querySelector('#record-video');
let captureBtn = document.querySelector('#click-picture');
let mediaRecorder;
let recordState = false;
let chunks = [];
let filter='';
let currZoom=1;
let zoomInBtn=document.querySelector("#in");
let zoomOutBtn=document.querySelector("#out");
    
zoomInBtn.addEventListener("click",function(){
    let vidScale =Number(videoPlayer.style.transform.split("(")[1].split(")")[0]);
    if(vidScale<3){
        currZoom=vidScale+0.2;
        videoPlayer.style.transform=`scale(${currZoom})`;
    }
})
zoomOutBtn.addEventListener("click",function(){
    let vidScale =Number(videoPlayer.style.transform.split("(")[1].split(")")[0]);
    if(vidScale>1){
        currZoom=vidScale-0.2;
        videoPlayer.style.transform=`scale(${currZoom})`;
    }
})


let allFilters = document.querySelectorAll('.filter');
for(let i=0; i<allFilters.length;i++){
    allFilters[i].addEventListener("click",function(e){
        filter=e.currentTarget.style.backgroundColor;
        removeFilter();
        addFilterToScreen(filter);
    })
}
function addFilterToScreen(filterColor){
    let filter = document.createElement('div');
    filter.classList.add("on-screen-filter");
    filter.style.height='100vh';
    filter.style.width='100vw';
    filter.style.backgroundColor=`${filterColor}`;
    filter.style.position='fixed';
    filter.style.top="0px";
    document.querySelector('body').appendChild(filter);
}
function removeFilter(){
    let el = document.querySelector(".on-screen-filter");
    if(el){
        el.remove();
    }
}

vidRecordBtn.addEventListener("click",function(){
    let innerDiv = vidRecordBtn.querySelector("#record-div");
    if(mediaRecorder!=undefined)
    {
    if(recordState==false)
    {
        recordState=true;
        currZoom=1;
        videoPlayer.style.transform=`scale(${currZoom})`;
        mediaRecorder.start();
        innerDiv.classList.add("recording-animation");
    }
    else{
        recordState=false;
        mediaRecorder.stop();
        innerDiv.classList.remove("recording-animation");
    }
}
})
navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
    videoPlayer.srcObject=mediaStream;
mediaRecorder = new MediaRecorder(mediaStream);
mediaRecorder.ondataavailable = function(e){
    chunks.push(e.data)
}
mediaRecorder.onstop=function()
{
    let blob = new Blob(chunks,{type:'video/mp4'});
    chunks =[];
    let blobUrl = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = blobUrl;
    link.download='video.mp4';
    link.click();
    link.remove();
}


}).catch(function(err){
    console.log(err);
})
captureBtn.addEventListener('click',function()
{
    let clickDiv = captureBtn.querySelector("#click-div");
    console.log(('clicked'));
    clickDiv.classList.add("capture-animation");
    capture(filter);
    clickDiv.classList.remove("capture-animation");
})
function capture(filter)
{
    let c = document.createElement('canvas');
    c.width = videoPlayer.videoWidth;
    c.height = videoPlayer.videoHeight;
    let tool = c.getContext('2d');
    //shift origin kyuki vo (0,0) pr hota h or zoom center k hisab se hona chaiye
    tool.translate(c.width/2,c.height/2);
    //scaling
    tool.scale(currZoom,currZoom);
    //shift back to (0,0)
    tool.translate(-c.width/2,-c.height/2);

    tool.drawImage(videoPlayer,0,0);
    if(filter!=''){
        tool.fillStyle=filter;
        tool.fillRect(0,0,c.width,c.height);
    }
    let link = document.createElement('a');
    link.download = 'image.png';
    link.href = c.toDataURL();
    link.click();
    link.remove();
    c.remove();
}