sudo apt-get install git -y
git clone https://github.com/SlyngelKlubben/Raspberry-Docker.git
cd ./Raspberry-Docker
curl -fsSL https://raw.githubusercontent.com/SlyngelKlubben/Raspberry-Docker/master/docker-compose.yml
curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash
find_ip=`ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'`
sed -i "s/PREST_PG_HOST=/PREST_PG_HOST=$find_ip/g" docker-compose.yml
cp -f ./docker-compose.yml ./IOTstack
cp -r ./services ./IOTstack
cp -r ./volumes ./IOTstack
git clone https://github.com/prest/prest.git ./IOTstack/services/prest
cp -f ./Dockerfile ./IOTstack/services/prest
echo "Reboot to make this work properly"
