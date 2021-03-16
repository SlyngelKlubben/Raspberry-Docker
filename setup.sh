curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash
mv -f ./docker-compose.yml ./IOTstack
mv ./services ./IOTstack
mv ./volumes ./IOTstack
git clone git@github.com:prest/prest.git ./IOTstack/volumes
mv -f ./Dockerfile ./IOTstack/volumes/prest