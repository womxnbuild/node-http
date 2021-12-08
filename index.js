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
            // this is a callback function if the param file doesn't exists
            fs.exists(filePath, (exists) => {
                if (!exists){
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html');
                    res.end("<html><head>404 Not Found</head>" +
                        "<body> File Not Found</body></html>");
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html');
            res.end("<html><head><title>404 Not Found</title></head>" +
                "<body> File not an HTML file</body></html>");
            return;
        }
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html');
        res.end("<html><head><title>404 Not Found</title></head>" +
            "<body> Request Method Not Found</body></html>");
        return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<html><head><title>node-http</title></head><body>"
    + "<h1> Hello world!</h1></body></html>");
    return;
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port} `);
});