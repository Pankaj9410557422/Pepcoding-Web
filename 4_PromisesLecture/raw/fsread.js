let fs = require("fs");
console.log("Before");
// using callbacks
// fs.readFile("f1.txt",function cb(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("data ->",data);
//     }
// })

//promises return intial state is always pending
let promise = fs.promises.readFile("f1.txt");
console.log("Initial state",promise);//Initial state of a promise is pending
console.log("After");
// As settimeout is not correct way it has its demerits
// setTimeout(function(){
//     console.log("final state", promise);
// },2000);
//consumer funstion it will be called when a primise is fullfilled
promise
    .then(function(data){
        console.log(data);
    })
    //reject
promise
    .catch(function(err){
        console.log(err);
    })
console.log("Hello");
