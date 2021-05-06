#FROM node:current-alpine
FROM node:current
WORKDIR /usr/app
COPY . .
RUN npm install --quiet
CMD ["node", "index.js"]