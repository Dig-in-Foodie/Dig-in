FROM node:16

# ENV NODE_ENV=production

WORKDIR /app

COPY package* .json ./

RUN npm ci

COPY server/ ./server/
COPY client/ .client/

RUN cd server/ && npm run build
RUN cd client/ && npm run build

CMD cd client/ && npm start
