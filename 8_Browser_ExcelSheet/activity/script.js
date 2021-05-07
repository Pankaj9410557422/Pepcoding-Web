let addbtnContainer=document.querySelector(".add-sheet-container");
let sheetList=document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelector(".grid .col");
let addressBar = document.querySelector(".address-box")



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
// formula
for(let i=0; i<Allcells.length;i++){
    Allcells[i].addEventListener("click", function handleCell(){
        let rid= Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));

        let rowAdd = rid+1;
        let colAdd = String.fromCharCode(cid+65);
        console.log(rowAdd);
        
        let address = colAdd+rowAdd;
        addressBar.value = address;
    })
}
Allcells[0].click();




