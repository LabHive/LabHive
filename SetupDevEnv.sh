#!/bin/bash
set -eu

cd "$(dirname "$0")"

docker volume rm labhive_mongodb_stagingDB || true
docker volume rm labhive_mongodb_stagingConfig || true

docker volume create labhive_mongodb_stagingDB
docker volume create labhive_mongodb_stagingConfig

docker run \
    --rm -d \
    -v labhive_mongodb_stagingDB:/data/db \
    -v labhive_mongodb_stagingConfig:/data/configdb \
    -v $(pwd)/backup:/backup \
    --name mongodb \
    mongo;
docker exec mongodb mongorestore /backup/dump/
docker rm -f mongodb

npm install

touch .env
echo "BASE_URL=http://localhost:8080" >> .env
echo "STAGING=1" >> .env

