const {Client} = require('pg');
var log = require('./console-log');
var nameMac = [];
var tempMac = [];
var loop = false;
var globalei = 0;

// Connect to database ↓
const client = new Client({
    user: "iot",
    password: "iot",
    host: "192.168.0.200",
    port: 5432,
    database: "hus"
});
exports.connect = function() {
    client.connect()
    .then(() => log.info("Connected successfully to database"))
    .then(() => client.query("SELECT mac, name FROM sensor_location limit 10"))
    .then(results => nameMac = results.rows)
    .then(() => console.log(nameMac[0]["mac"]))
    .catch(err => log.error(err))
    .finally(() => client.end())
    .then(() => loop = true);
    var interval = setInterval(() => {
        if(loop == true){
            log.info("Loop is true")
            clearInterval(interval);
            
            for(var i = 0; i < nameMac.length; i++){
                globalei = i;
                const client = new Client({
                    user: "iot",
                    password: "iot",
                    host: "192.168.0.200",
                    port: 5432,
                    database: "hus"
                });
                log.info(i+"  "+globalei)
                client.connect()
                .then(() => log.info("Connected successfully to database"))
                .then(() => client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='"+nameMac[globalei]["mac"]+"' group by \"MAC\""))
                .then(results => tempMac = results.rows)
                .then(() => console.log(tempMac))
                .catch(err => log.error(err))
                .finally(() => client.end());
            }
        }
    },1000);
}
// Connect to database ↑
