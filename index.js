const http = require("node:http");
const { URL } = require('node:url');
const fs = require('node:fs');
const path = require('path');

const server = http.createServer((req, res) => {

    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const myPath = myUrl.pathname;

    let fileToFetch = "";

    // console.log("myPath is ", myPath);

    if (myPath == "/" || myPath == "")
        fileToFetch = "index.html";
    else if (myPath == "/about")
        fileToFetch = "about.html";
    else if (myPath == "/contact-me")
        fileToFetch = "contact-me.html";
    else
        fileToFetch = myPath

    const filePath = path.join(__dirname, fileToFetch);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err)
                console.error(err);
            else
                console.error("invalid path entered")

            //read and send 404.html 
            fs.readFile(path.join(__dirname, "404.html"), 'utf8', (err, notFoundData) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 - Internal Server Error');
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(notFoundData, 'utf-8');
                }
            });

        } else {
            const extname = String(path.extname(filePath)).toLowerCase();
            const mimeTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css'
            };
            const contentType = mimeTypes[extname] || 'application/octet-stream';


            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    }
    );

});

server.listen(8080, () => {
    console.log(`Server running at http://localhost:8080/`);
});