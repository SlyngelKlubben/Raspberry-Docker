const {Client} = require('pg');
var log = require('./console-log');
var nameMac = [];
var tempMac = [];
var tempMacClean = [];
var isNotDone = true;

// Connects to database ↓
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
    .then(() => client.query("SELECT mac, name FROM sensor_location"))
    .then(results => nameMac = results.rows)
    .then(() => log.info(nameMac.length))
    .catch(err => log.error(err))
    .finally(() => client.end())
	.then(() => test());
}
function test(){
	for(var i = 0; i < nameMac.length; i++){
		const client = new Client({
			user: "iot",
			password: "iot",
			host: "192.168.0.200",
			port: 5432,
			database: "hus"
		});
		client.connect();
		log.info("Connected successfully to database");
		log.info(i);
		client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='"+nameMac[i]["mac"]+"' group by \"MAC\"")
		//.then(() => log.info("Connected successfully to database"))
		//.then(() => client.query("select \"MAC\" as mac, MAX(timestamp) as time from envi where \"MAC\"='"+nameMac[i]["mac"]+"' group by \"MAC\""))
		.then(results => tempMac = results.rows)
		.then(() => console.log(tempMac))
		.catch(err => log.error(err))
		.finally(() => client.end());
	}
}
// Connects to database ↑
