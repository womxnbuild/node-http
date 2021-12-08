const http =  require('http');
const fs =  require('fs');
const path =  require('path');

const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
    console.log("Request for url = "+req.url+" and method =" + req.method);

    if (req.method === 'GET'){
        var fileUrl;
        if (fileUrl === '/') fileUrl = '/index.html';
        else fileUrl =  req.url;

        var filePath = path.resolve("./public"+fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt === '.html'){
            fs.exists(filePath, (exists) => {

            });
        }
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<html><head><title>node-http</title></head><body>"
    + "<h1> Hello world!</h1></body></html>");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port} `);
});
