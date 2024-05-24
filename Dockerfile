FROM node:14
WORKDIR /usr/src/app
COPY articles-front/package*.json ./
RUN npm install
COPY Shop-Online-Front .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]