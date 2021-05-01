let addbtnContainer=document.querySelector(".add-sheet-container");
let sheetList=document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click",handleActiveSheet)

addbtnContainer.addEventListener("click",function(){
    let sheetsArr= document.querySelectorAll(".sheet");
    console.log(sheetsArr);
    let lastSheetElem= sheetsArr[sheetsArr.length-1];
    let idx= lastSheetElem.getAttribute("sheetIdx");
    idx=Number(idx);
    let NewSheet= document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    NewSheet.setAttribute("sheetIdx",idx+1);
    NewSheet.innerHTML=`Sheet ${idx+1}`;
    //page add
    sheetList.appendChild(NewSheet);
    NewSheet.addEventListener("click", handleActiveSheet);
})

function handleActiveSheet(e){
    let MySheet= e.currenTarget;
    let sheetsArr= document.querySelectorAll(".sheet");
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active-sheet");
    })
    if(!MySheet.classList[1]){
        MySheet.classList.add("active-sheet");
    }
}
let topRow = document.querySelector(".top-row");
let str="";
for(let i=0; i<26;i++){
    str+=`<div class='col'>${String.fromCharCode(65+i)}</div>`
}
topRow.innerHTML=str;
let leftCol = document.querySelector(".left-col");
str="";
for(let i=0; i<100;i++){
    str+=`<div class='left-col_box'>${i+1}</div>`
}
leftCol.innerHTML=str;
//2d array 
//formula to finr row col ->${String.fromCharCode(65 + j)}${i + 1}    isko neeche div k andr daal kr dekh
let grid = document.querySelector(".grid");
        str = "";
        for (let i = 0; i < 100; i++) {
            str += `<div class="row">`
            for (let j = 0; j < 26; j++) {
                str += `<div class='col'></div>`
            }
            str += "</div>";
        }
grid.innerHTML = str;

