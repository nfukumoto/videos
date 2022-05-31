const fs = require('fs')
const http = require('http')

http.createServer((req,res) => {
    res.end("AAAAA")
}).listen(8080)

fs.appendFile("log-users.txt","Testando 1,2,3...\n",'utf8',function(err){
    if(err){
        throw err;
    }
});