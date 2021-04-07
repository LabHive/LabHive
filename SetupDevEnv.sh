#!/bin/bash
set -eu

err_report() {
    echo "Error on line $1"
}

trap 'err_report $LINENO' ERR

cd "$(dirname "$0")"

git submodule update --init

if docker volume ls | grep -q labhive_mongodb_stagingDB; then
    docker volume rm labhive_mongodb_stagingDB
    docker volume rm labhive_mongodb_stagingConfig
fi

docker volume create labhive_mongodb_stagingDB
docker volume create labhive_mongodb_stagingConfig

docker run \
    --rm -d \
    -v labhive_mongodb_stagingDB:/data/db \
    -v labhive_mongodb_stagingConfig:/data/configdb \
    -v $(pwd)/sample_data:/backup \
    --name mongodb \
    mongo;
docker exec mongodb mongorestore /backup/dump/
docker rm -f mongodb

npm install

touch .env
echo "BASE_URL=http://localhost:8080" > .env
echo "STAGING=1" >> .env

