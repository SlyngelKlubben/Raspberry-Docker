FROM node:current
WORKDIR /usr/app
COPY . .
RUN chmod 777 /usr/app -R
RUN ls -l
RUN npm install --quiet
CMD ["node", "index.js"]
