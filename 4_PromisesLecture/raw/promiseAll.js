let fs = require("fs");
console.log("Before");
let p1=fs.promises.readFile("f1.txt");
let p2=fs.promises.readFile("f2.txt");
let p3=fs.promises.readFile("f3.txt");
console.log("After");

let combinedPromise=Promise.all([p1,p2,p3]);
console.log(combinedPromise);
combinedPromise
    .then(function(allFilesData){
        for(let i=0;i<allFilesData.length;i++){
            console.log("content ->" + allFilesData[i]);
        }
    })
console.log("After")