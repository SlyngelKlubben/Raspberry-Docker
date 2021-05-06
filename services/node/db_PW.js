const {Pool} = require('pg');
const log = require('./console-log');
const fs = require('fs');
const { timeEnd } = require('console');
var saveFile = './public/data/data_PW.json'
let db_info_file = fs.readFileSync('./pg_info.json');


//var db_info=JSON.parse(db_info_file);
const db_info = {
	user: "iot",
	password: "iot",
	host: "192.168.0.200",
	port: 5432,
	database: "hus"
}

const pool = new Pool(db_info);
exports.connect = function(){
	var power = [];
	var water = [];
	var powerAvg = 0;
	var waterAvg = 0;
	var pwAvg = [{power:0,water:0}];
	pool.query('SELECT power_w as power FROM el ORDER BY Id DESC limit 10', (err, res) => {
		if (err) {
			return log.error(err);
		}
		log.info("Connected to database");
		power = res.rows;
		power.forEach((element) => {
			powerAvg += (element['power']);
		});
		powerAvg = Math.round(powerAvg/power.length)
		//console.log(powerAvg);

		pool.query('SELECT flow_l_per_min as water FROM vand ORDER BY Id DESC limit 10', (err, res) => {
			if (err) {
				return log.error(err);
			}
			water = res.rows;
			water.forEach((element) => {
				waterAvg += (element['water']);
			});
			waterAvg = Math.round(waterAvg/water.length)
			//console.log(waterAvg);

			pwAvg[0]['power'] = powerAvg;
			pwAvg[0]['water'] = waterAvg;
			console.table(pwAvg)
			fs.writeFile(saveFile, JSON.stringify(pwAvg), function writeJSON(err){
			if(err) return log.error(err)
			});
		});
	});
}
