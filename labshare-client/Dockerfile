FROM node:14
ARG enableDev=false
ARG staging=false


COPY packag*.json /app/
RUN cd /app && npm install

COPY public /app/public/
COPY src /app/src/
COPY LICENSE *.json *.js /app/

WORKDIR /app

ENV ENABLE_DEV $enableDev
ENV STAGING $enableDev

RUN npm run build

VOLUME [ "/app/secret" ]

ENTRYPOINT [ "node", "./dist-backend/backend/main.js" ]
