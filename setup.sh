#!/bin/bash
pg_host=""
pg_port=""
pg_user=""
pg_pass=""
pg_db=""

sudo apt-get install git -y
git clone https://github.com/SlyngelKlubben/Raspberry-Docker.git
cd ./Raspberry-Docker
curl -fsSL https://raw.githubusercontent.com/SlyngelKlubben/Raspberry-Docker/master/docker-compose.yml | cat > docker-compose.yml
curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash

yml_file="docker-compose.yml"

echo "[{\"user\":\"$pg_user\",\"password\":\"$pg_pass\",\"host\":\"$pg_host\",\"port\":\"$pg_port\",\"database\":\"$pg_db\"}]" > ./services/node/pg_info.json

sed -i "s/{pg_host}/$pg_host/g" $yml_file
sed -i "s/{pg_port}/$pg_port/g" $yml_file
sed -i "s/{pg_user}/$pg_user/g" $yml_file
sed -i "s/{pg_pass}/$pg_pass/g" $yml_file
sed -i "s/{pg_db}/$pg_db/g" $yml_file

cp -f ./docker-compose.yml ./IOTstack
cp -r ./services ./IOTstack
cp -r ./volumes ./IOTstack
git clone https://github.com/prest/prest.git ./IOTstack/services/prest
cp -f ./Dockerfile ./IOTstack/services/prest
echo "Reboot to make this work properly"
