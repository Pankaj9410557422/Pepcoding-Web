let addbtnContainer=document.querySelector(".add-sheet-container");
let sheetList=document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let fontBtn = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let allAlignmentBtns = document.querySelectorAll(".alignment-container>*");
let sheetDB=workSheetDB[0];


firstSheet.addEventListener("click",handleActiveSheet)
//create sheets and give them functionality
addbtnContainer.addEventListener("click",function(){
    let sheetsArr= document.querySelectorAll(".sheet");
    // console.log(sheetsArr);
    let lastSheetElem= sheetsArr[sheetsArr.length-1];
    let idx= lastSheetElem.getAttribute("sheetIdx");
    idx=Number(idx);
    let NewSheet= document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    NewSheet.setAttribute("sheetIdx",idx+1);
    NewSheet.innerText=`Sheet ${idx+1}`;
    //page add
    sheetList.appendChild(NewSheet);
    

    //set active
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active-sheet");
    })
    sheetsArr=document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length-1].classList.add("active-sheet");
    initCurrentSheetDB();
    sheetDB=workSheetDB[idx];
    initUI();
    NewSheet.addEventListener("click", handleActiveSheet);
})

function handleActiveSheet(e){
    let MySheet= e.currentTarget;
    let sheetsArr= document.querySelectorAll(".sheet");

    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active-sheet");
    })
    if(!MySheet.classList[1]){
        MySheet.classList.add("active-sheet");
    }
    let sheetindex=MySheet.getAttribute("sheetIdx");
    sheetDB=workSheetDB[sheetindex-1];
    setUI(sheetDB);
}

// *****************************************************
// adress set krta h on click of a cell formula container m
for(let i=0; i<Allcells.length;i++){
    Allcells[i].addEventListener("click", function handleCell(){
        let rid= Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));

        let rowAdd = rid+1;
        let colAdd = String.fromCharCode(cid+65);
        // console.log(rowAdd);
        
        let address = colAdd+rowAdd;
        addressBar.value = address;
        let cellObj = sheetDB[rid][cid];
        if(cellObj.bold==true){
            boldElem.classList.add("active-btn");
        }else{
            boldElem.classList.remove("active-btn");
        }
        if(cellObj.italic ==true){
            italicElem.classList.add("active-btn");
        }else{
            italicElem.classList.remove("active-btn");
        }
        if(cellObj.underline == true){
            underlineElem.classList.add("active-btn");
        }else{
            underlineElem.classList.remove("active-btn");
        }


        //allignment
        for(let i=0;i<allAlignmentBtns.length;i++){
            allAlignmentBtns[i].classList.remove("active-btn");
        }
        if(cellObj.halign=="left"){
            leftBtn.classList.add("active-btn");
        }else if(cellObj.halign=="right"){
            rightBtn.classList.add("active-btn");
        }else if(cellObj.halign="center"){
            centerBtn.classList.add("active-btn");
        }
    });
}
// initial cell k click ko emmulate krne k liye 
Allcells[0].click();


// ******************************formatting**************** 
 
leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    cell.style.textAlign = "left";
    for(let i=0; i<allAlignmentBtns.length;i++){
        allAlignmentBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    cellObj.halign="left";
})
rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    cell.style.textAlign = "right";
    for(let i=0; i<allAlignmentBtns.length;i++){
        allAlignmentBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    cellObj.halign = "right";
})
centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    cell.style.textAlign = "center";
    for(let i=0; i<allAlignmentBtns.length;i++){
        allAlignmentBtns[i].remove("active-btns");
    }
    centerBtn.classList.add("active-btn");
    cellObj.halign="center";
})

fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    console.log(fontSize);
    cell.style.fontSize = fontSize+"px";
})

fontFamily.addEventListener("change", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    // console.log(fontSize);
    let cFont = fontFamily.value;
    cell.style.fontFamily = cFont;
})


boldElem.addEventListener("click", function(){
    let isActive = boldElem.classList.contains("active-btn");
    let address = addressBar.value;
    let {rid, cid} = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if(isActive == false){
        // cell text bold 
        cell.style.fontWeight ="bold";
        boldElem.classList.add("active-btn");
        cellObj.bold=true;
    }else{
        cell.style.fontWeight="normal";
        boldElem.classList.remove("active-btn");
        cellObj.bold=false;
    }
    console.log(sheetDB);
})

italicElem.addEventListener("click", function(){
    let isActive = italicElem.classList.contains("active-btn");
    let address = addressBar.value;
    let {rid, cid} = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cellObj=sheetDB[rid][cid];
    if(isActive == false){
        // ceel text italic
        cell.style.fontStyle ="italic";
        italicElem.classList.add("active-btn");
        cellObj.italic = true;
    }else{
        cell.style.fontStyle="normal";
        italicElem.classList.remove("active-btn");
        cellObj.italic = false;
    }
})

underlineElem.addEventListener("click", function(){
    let isActive = underlineElem.classList.contains("active-btn");
    let address = addressBar.value;
    let {rid, cid} = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cellObj=sheetDB[rid][cid];
    if(isActive == false){
        // cell text underline
        cell.style.textDecoration ="underline";
        underlineElem.classList.add("active-btn");
        cellObj.underline=true;
    }else{
        cell.style.textDecoration="none";
        underlineElem.classList.remove("active-btn");
        cellObj.underline = false;
    }
})




// ******************************* 
//formatting
function getRIdCIdfromAddress(adress) {
    // A1
    let cellColAdr = adress.charCodeAt(0);
    // console.log(cellColAdr);
    let cellrowAdr = adress.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };

}
function initUI(){
    for(let i=0; i<Allcells.length;i++){
        Allcells[i].innerHTML="";
        Allcells[i].style.fontWeight="normal";
        Allcells[i].style.fontStyle="normal";
        Allcells[i].style.textDecoration="none";
        Allcells[i].style.fontFamily="Arial";
        Allcells[i].style.fontSize="10px";
        Allcells[i].style.textAlign="left";
        Allcells[i].style.innerText="";
    }
}
for(let i=0; i<Allcells.length;i++){
    Allcells[i].addEventListener("blur", function handle(){
        let address = addressBar.value;
        let {rid, cid} = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        cellObject.value=cell.innerText;
    })
}
function setUI(sheetDB){{
    for(let i=0; i<sheetDB.length;i++){
        for(let j=0; j<sheetDB[i].length;j++){
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let {bold, italic, underline, fontFamily,fontSize, halign, value} = sheetDB[i][j];
            cell.style.fontWeight=bold==true?"bold":"normal";
            cell.style.fontStyle=italic==true?"italic":"normal";
            cell.style.textDecoration=underline==true?"underline":"none";
            cell.innerText=value;
        }
    }
}

}




