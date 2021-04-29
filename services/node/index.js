const http = require('http');
const url = require('url');
const fs = require('fs');
const log = require('./console-log');
const db_temp = require("./db_temp");
const db_pw = require('./db_PW')


db_temp.connect() // Connects to database
db_pw.connect()

// Do something when a client sent a request ↓
const server = http.createServer(function (req, res) {
    log.info("Client connected");
    var q = url.parse(req.url, true);
    log.info("Request: "+q.pathname);

    // Send something back to the client ↓
    if (q.pathname.startsWith("/private/") || q.pathname.startsWith("/node_modules/")){
        res.writeHead(403, {'Content-Type': 'text/html'});
        res.end("403 Forbidden");
        log.warn("Request: Forbidden (403)");

    // Load css file ↓
    }else if (q.pathname.startsWith("/css/")){
        
        fs.readFile("./public"+ q.pathname, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/css'});
                log.warn("Request: Not Found (404)");
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            log.info("Send to client: "+q.pathname);
            return res.end();
        });
    // Load css file ↑
    }else if (q.pathname.startsWith("/js/")){
        fs.readFile("./public"+ q.pathname, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/js'});
                log.warn("Request: Not Found (404)");
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/js'});
            res.write(data);
            log.info("Send to client: "+q.pathname);
            return res.end();
        });
    }else if (q.pathname.endsWith("/data/temp/reload")){
        res.write("");
        db_temp.connect();
        log.info("Temp data reloaded")
        res.end();
    }else if (q.pathname.endsWith("/data/pw/reload")){
        res.write("");
        db_pw.connect();
        log.info("Pw data reloaded")
        res.end();
    }else if (q.pathname.startsWith("/data/")){
        fs.readFile("./public"+ q.pathname, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                log.warn("Request: Not Found (404)");
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(data);
            log.info("Send to client: "+q.pathname);
            return res.end();
        });
    // Load html file ↓
    }else if (q.pathname.endsWith("/")) {
        fs.readFile("./public/html"+ q.pathname + "index.html", function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                log.warn("Request: Not Found (404)");
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            log.info("Send to client: /html"+q.pathname+"index.html")
            return res.end();
        });
    }else if (q.pathname.startsWith("/test")){
        res.end("lol")
    }else{
        fs.readFile("./public/html"+ q.pathname+".html", function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                log.warn("Request: Not Found (404)");
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            log.info("Send to client: /html"+q.pathname+".html");
            return res.end();
        });
    }
    // Load html file ↑
    // Send something back to the client ↑
});
// Do something when a client sent a request ↑

// Starts the server ↓
server.listen(8080, () => {
    log.info("\x1b[32m"+"Server is open at port: "+"\x1b[0m"+"8080");
});
// Starts the server ↑