const fs = require('fs');
const http = require('http');

http.createServer((req,res) => {
    fs.writeFile("log-users.txt","testando 1,2,3...\n",(err) => {
        if(err) throw err

        res.write("Escrevi");
        res.end();
    });
}).listen(8080)