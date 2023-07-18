# Stage 2: Build the backend 
FROM node:16-alpine as backend 

WORKDIR /app/server 

COPY server/package*.json ./ 

RUN npm install 

COPY server/ ./ 

RUN npm run start
# Stage 1: Build the frontend 
FROM node:16 as frontend 

WORKDIR /app/client 

COPY client/package*.json ./ 

RUN npm install 

COPY client/ ./ 

RUN npm run start


# Stage 3: Combine frontend and backend 
FROM node:16-alpine 

WORKDIR /app 

COPY --from=frontend /app/client/build ./client/build 

COPY --from=backend /app/server/build ./server/build 

EXPOSE 3000

EXPOSE 5000 
CMD ["npm", "start"]
