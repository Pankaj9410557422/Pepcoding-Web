let fs = require("fs");
let arr=["f1.txt", "f2.txt", "f3.txt"];
 
(async function fn(){
    let data=[];
    for(let i=0; i<arr.length;i++){
        let frp = fs.promises.readFile(arr[i]);
        console.log("data "+frp);
        data.push(frp);
    }
    let allFilesRead= await Promise.all(data);
    for(let i=0; i<allFilesRead.length;i++){
        console.log(allFilesRead[i]+"")
    }

})(); //IIFE->Immediately Invoked Function Expression