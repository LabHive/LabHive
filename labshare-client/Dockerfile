FROM node:latest
ARG enableDev=false
ARG staging=false

COPY . /app/
WORKDIR /app

RUN /bin/bash -c "[ -f secret/jsonwebtoken_hmacKey.txt ] || (echo 'File is missing secret/jsonwebtoken_hmacKey.txt'; exit 1;)"

RUN rm -rf dist* && \
    rm -rf node_modules && \
    npm install

ENV ENABLE_DEV $enableDev
ENV STAGING $enableDev
RUN npm run build
RUN "$(npm bin)/tsc"

ENTRYPOINT [ "node", "./dist-backend/backend/main.js" ]
