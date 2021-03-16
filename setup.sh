sudo apt-get install git -y
git clone https://github.com/SlyngelKlubben/Raspberry-Docker.git
cd ./Raspberry-Docker
curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash
cp -f ./docker-compose.yml ./IOTstack
cp ./services ./IOTstack
cp ./volumes ./IOTstack
git clone https://github.com/prest/prest.git ./IOTstack/volumes
cp -f ./Dockerfile ./IOTstack/volumes/prest
echo "Reboot to make this work properly"
