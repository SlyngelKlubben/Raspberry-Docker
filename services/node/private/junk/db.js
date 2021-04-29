const {Client} = require('pg');
var log = require('./console-log');
var nameMac = [];
var tempMac = [];

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
    .then(() => client.query("SELECT mac, name FROM sensor_location limit 1"))
    .then(results => nameMac = results.rows)
    .then(() => log.info(nameMac.length))
    .catch(err => log.error(err))
    .then(() => client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='"+nameMac[0]["mac"]+"' group by \"MAC\""))
    .then(results => console.table(results.rows))
    .catch(err => log.error(err))
    .finally(() => client.end())
    .then(() => test());
    /*
    client.connect()
    .then(() => client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi group by \"MAC\" limit 50")) // Work 
    .then(results => ting2 = results.rows)
    .then(() => console.log(ting2))
    .catch(err => log.error(err))
    .finally(() => client.end());
    */
}
function test() {
    const {Client} = require('pg');
    var log = require('./console-log');
    var nameMac = [];
    var tempMac = [];
    
    // Connect to database ↓
    const client = new Client({
        user: "iot",
        password: "iot",
        host: "192.168.0.200",
        port: 5432,
        database: "hus"
    });
    for(var i = 0; i < nameMac.length; i++){
        console.log(nameMac[i]["mac"]);
        client.connect();
        //.then(() => 
        client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='"+nameMac[i]["mac"]+"' group by \"MAC\"")
        .then(results => tempMac.push(results.rows))
        .then(() => console.log(tempMac))
        .catch(err => log.error(err));
    }
    client.end();
}
// Connect to database ↑