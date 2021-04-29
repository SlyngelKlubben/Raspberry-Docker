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
    .then(() => client.query("SELECT mac, name FROM sensor_location limit 3"))
    .then(results => nameMac = results.rows)
    .then(() => log.info(nameMac.length))
    .catch(err => log.error(err))
    .then(() => client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='"+nameMac[0]["mac"]+"' group by \"MAC\""))
    .then(results => console.table(results.rows))
    .catch(err => log.error(err))
    .then(() => console.log('Debug1'))
  .then(() => client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='"+nameMac[1]["mac"]+"' group by \"MAC\""))
    .then(results => console.table(results.rows))
    .catch(err => log.error(err))
    .then(() => console.log('Debug11'))
    .then(() => test())
    .finally(() => client.end())
    .then(() => console.log('Debug2'));

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
   
    // Connect to database ↓
    const client = new Client({
        user: "iot",
        password: "iot",
        host: "192.168.0.200",
        port: 5432,
        database: "hus"
    });
    console.log('Debug3')
    for(var i = 0; i < nameMac.length; i++){
        console.log(nameMac[i]["mac"]);
        console.log('Debug4')
        //client.connect();
        console.log(nameMac[0]["mac"]);
        //.then(() => 
        client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='3C:71:BF:31:5E:3D' group by \"MAC\"")
        .then(() =>console.log('Debug55'))
        .then(results => tempMac.push(results.rows))
        .then(() => console.log(tempMac))
        .catch(err => log.error(err))
        .then(() =>console.log('Debug6'));
        console.log('Debug7')
    }
    client.end();
}
// Connect to database ↑