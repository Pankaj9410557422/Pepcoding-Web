"use strict";
let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer= document.querySelector(".main_container");
let body=document.body;
let plusButton=document.querySelector(".fa-plus");
let crossBtn = document.querySelector(".fa-times");
let delState=false;


// for(let i=0; i<colorBtn.length;i++){
//     colorBtn[i].addEventListener("click", function(e){
//         let color = colorBtn[i].classList[1];
//         mainContainer.style.backgroundColor=color;
//     })
// }


plusButton.addEventListener("click", createModal);
crossBtn.addEventListener("click", setDeleteState);
function createModal(){
    let modalContainer=document.querySelector(".modal_container");   
    if(modalContainer == null){
    modalContainer=document.createElement("div");
    modalContainer.setAttribute("class","modal_container");
    modalContainer.innerHTML=`<div class="input_container">
    <textarea class="modal_input" placeholder="Enter your task here"></textarea>
</div>
<div class="modal_filter_container">
    <div class="filter pink"></div>
    <div class="filter blue"></div>
    <div class="filter green"></div>
    <div class="filter black"></div>
</div>`;
    body.appendChild(modalContainer);
    handleModal(modalContainer);
    } 
    let textarea=modalContainer.querySelector("div");
    textarea.value="";
}

function handleModal(modal_container){
    let cColor = "black";
    let modalfilter = document.querySelectorAll(".modal_filter_container .filter");
    //setAttribute already present attribute ko hta deta h in this case it removes the filter and color class and makes it a border class 
    //so avoid using in such cases
    //modalfilter[3].setAttribute("class","border");
    modalfilter[3].classList.add("border");
    for(let i=0; i<modalfilter.length;i++){
        modalfilter[i].addEventListener("click",function(e){
            //remove border from elements
            modalfilter.forEach((filter)=>{
                filter.classList.remove("border");
            })
            modalfilter[i].classList.add("border");
            cColor =modalfilter[i].classList[1];
            // console.log("curent priority class", cColor);
        })    
    }
    let textArea = document.querySelector(".modal_input");
    console.log(textArea);
    textArea.addEventListener("keydown", function(e){
        console.log(e);
        if(e.key=="Enter"&&textArea.value!=""){
            console.log("Task ",textArea.value,"color ", cColor);
            //remove modal
            modal_container.remove();
            //create taskBox
            createTask(cColor, textArea.value);
        }
    })
}

function createTask(color, task){
    // color area click-> among colors
    let taskContainer = document.createElement("div");
    let uid = new ShortUniqueId();
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#${uid()}</h3>
        <div class="task_desc" contenteditable="true" >${task}</div>
    </div>
</div >`;
    mainContainer.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    console.log(taskFilter);
    taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click",deleteTask);

}
function changeColor(e){
    let taskFilter=e.currentTarget;
    console.log(taskFilter);
    let colors=["pink", "blue", "green","black"];
    let cColor=taskFilter.classList[1];
    let idx=colors.indexOf(cColor);
    let newColorIdx = (idx+1)%4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);
}
function setDeleteState(e){
    let crossBtn=e.currentTarget;
    let parent = crossBtn.parentNode;
    if(delState==false){
        parent.classList.add("active");
    }else{
        parent.classList.remove("active");
    }
    delState =!delState;
}
function deleteTask(e){
    let taskContainer = e.currentTarget;
    if(delState){
        taskContainer.remove();
    }
}