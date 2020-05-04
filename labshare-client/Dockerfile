FROM node:latest
ARG enableDev=false
ARG staging=false

COPY public /app/public/
COPY src /app/src/
COPY LICENSE *.json *.js /app/

WORKDIR /app

RUN npm install

ENV ENABLE_DEV $enableDev
ENV STAGING $enableDev

RUN npm run build

VOLUME [ "/app/secret" ]

ENTRYPOINT [ "node", "./dist-backend/backend/main.js" ]
