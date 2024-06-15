const http = require("node:http");
const { URL } = require("node:url");
const fs = require("node:fs");
const path = require("path");
const express = require("express");

const app = express();
const port = 3000;

function readAndSend(fileToFetch, res) {
    const filePath = path.join(__dirname, "public", fileToFetch);
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            // cannot read html file 
            // read and send 404.html
            fs.readFile(path.join(__dirname, "public", "404.html"), "utf-8", (err, data) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(data)
                }
            })
        } else {
            res.send(data);
        }
    })
}

// first step is to server static files from public dir
app.use(express.static(path.join(__dirname, 'public')));

//routing for index
const indexHandler = function (req, res) {
    fileToFetch = "index.html";
    
    // attempting to read file
    readAndSend(fileToFetch,res);
}

app.get("/", indexHandler);
app.get("/index", indexHandler);
app.get("/home", indexHandler);

//routing for about
app.get("/about",(req,res)=>{
    readAndSend("about.html",res);  
})

//routing for contact-me
app.get("/contact-me",(req,res)=>{
    readAndSend("contact-me.html",res);  
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});