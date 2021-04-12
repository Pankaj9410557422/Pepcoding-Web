let fs = require("fs");
let frP=fs.promises.readFile("f1.txt");
console.log("Before");
let thenKP = frP.then(cb);
console.log("then ka promise", thenKP);
//cb behaves in a particular manner
function cb(data){
    console.log("data"+data);
}
setTimeout(function(){
    console.log(thenKP);
},1000);
console.log("After");
//thenKP->resolve/reject->(depends on cb k return value pr)
//thenKP
    //value->value
    //nothing->undefined
    //pending promise->thenKP will wait for that pending Promise