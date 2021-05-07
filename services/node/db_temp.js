const {Pool} = require('pg');
const log = require('./console-log');
const fs = require('fs');
const { timeEnd } = require('console');
var saveFile = './public/data/data_temp.json'
let db_info_file = fs.readFileSync('./pg_info.json');
//log.info(db_info);

var db_info=JSON.parse(db_info_file);
/*const db_info = {
	user: "iot",
	password: "iot",
	host: "192.168.0.200",
	port: 5432,
	database: "hus"
}*/

function compare(a, b) {
	// Use toUpperCase() to ignore character casing
	const macA = a.mac.toUpperCase();
	const macB = b.mac.toUpperCase();

	let comparison = 0;
	if (macA > macB) {
	  comparison = 1;
	} else if (macA < macB) {
	  comparison = -1;
	}
	return comparison;
}

const pool = new Pool(db_info);
exports.connect = function(){
	var nameMac = [];
	var tempMac = [];
	var tempMacClean = [];
	pool.query('SELECT mac, name FROM sensor_location limit 30', (err, res) => {
		if (err) {
			return log.error(err);
		}
		log.info("Connected to database");
		nameMac = res.rows;
		//console.table(nameMac);
		const pool = new Pool(db_info);
		var y = 0;
		for(var i = 0; i < nameMac.length; i++) {

			pool.query("select \"MAC\" as mac, timestamp as timestamp, ROUND(CAST(temperature as numeric), 1) as temp, ROUND(CAST(humidity as numeric), 1) as humidity from envi where \"MAC\"='"+nameMac[i]["mac"]+"' order by id desc limit 1",(err, res,) => {
				if (err) {
					return log.error(err);
				}
				tempMac = res.rows
				//console.table(tempMac);
				y++;
				if (tempMac != ""){
					tempMacClean.push(tempMac[0]);
				}
				if(y != nameMac.length){
					return;
				}
				for(var i1 = 0; i1 < tempMacClean.length; i1++) {
					for(var i2 = 0; i2 < nameMac.length; i2++) {
						if(tempMacClean[i1]["mac"] == nameMac[i2]["mac"]){
							tempMacClean[i1]["name"] = nameMac[i2]["name"]
						}
					}
				}
				tempMacClean.sort(compare)
				console.table(nameMac);
				console.table(tempMacClean);
				fs.writeFile(saveFile, JSON.stringify(tempMacClean), function writeJSON(err){
					if(err) return log.error(err)
				});
			});
		}
		//pool.end();
	});
}
