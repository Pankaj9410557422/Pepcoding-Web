let fs = require("fs");
function promisifiedReadFile(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,cb(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}