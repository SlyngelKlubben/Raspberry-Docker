FROM nodered/node-red:latest
USER root
RUN apk update
RUN apk upgrade
RUN apk add --no-cache eudev-dev

RUN cd /usr/src/node-red && npm install --save  node-red-contrib-home-assistant-websocket
RUN cd /usr/src/node-red && npm install --save  node-red-node-rbe
RUN cd /usr/src/node-red && npm install --save  node-red-node-pi-gpiod
RUN cd /usr/src/node-red && npm install --save  node-red-node-openweathermap
RUN cd /usr/src/node-red && npm install --save  node-red-node-email
RUN cd /usr/src/node-red && npm install --save  node-red-dashboard
RUN cd /usr/src/node-red && npm install --save  node-red-contrib-zigbee2mqtt
RUN cd /usr/src/node-red && npm install --save  node-red-contrib-influxdb
RUN cd /usr/src/node-red && npm install --save  node-red-contrib-boolean-logic
RUN cd /usr/src/node-red && npm install --save  node-red-contrib-blynk-ws
RUN cd /usr/src/node-red && npm install --save  node-red-configurable-ping


