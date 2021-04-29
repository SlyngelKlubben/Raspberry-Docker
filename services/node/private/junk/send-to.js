var log = require("./console-log");
var fs = require("fs");
var http = require("http")

exports.sendto = function(sendto){
    log.info(sendto)
    const server = http.createServer(function (req, res) {
        fs.readFile(sendto, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/css'});
                log.warn("Request: Not Found (404)");
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            log.info("Send to client: "+sendto);
            return res.end();
        });
    });
}


