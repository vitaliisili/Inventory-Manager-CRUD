FROM node:alpine3.18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
EXPOSE 3000
RUN npm install
CMD ["npm", "run", "start"]