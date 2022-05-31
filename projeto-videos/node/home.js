const fs = require('fs')
const http = require('http')

http.createServer((req,res) => {
    fs.readFile("../index.html",(err,data) => {
        if(err) throw err;
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write(data)
        res.end()
    })
}).listen(8080)