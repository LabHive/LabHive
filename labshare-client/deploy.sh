#!/bin/bash
set -eu

export ENV="$1"
export TAG="$(echo "$ENV" | tr '[:upper:]' '[:lower:]')"
export DOMAIN="${TAG}."

SECRETS="$HOME/volumes/secret"
if [[ -d "$(pwd)/secret" ]]; then
    SECRETS="$(pwd)/secret";
elif [[ -d "$HOME/LabHiveSecrets_${ENV}" ]]; then
    SECRETS="$HOME/LabHiveSecrets_${ENV}";
fi


docker volume create LabHive_${ENV}_secret;
docker run --rm -v "$SECRETS":/src -v LabHive_${ENV}_secret:/dst busybox cp -r /src/. /dst/;

# setup docker volumes
if ! docker volume ls | grep -q "LabHive_${ENV}_mongodb"; then
    echo "Setup docker volumes for ${ENV}"
    docker volume create "LabHive_${ENV}_mongodb_Config";
    docker volume create "LabHive_${ENV}_mongodb_DB";

    docker run --rm -v "$HOME/volumes/mongodb_Config":/src -v LabHive_${ENV}_mongodb_Config:/dst busybox cp -r /src/. /dst
    docker run --rm -v "$HOME/volumes/mongodb_DB":/src -v LabHive_${ENV}_mongodb_DB:/dst busybox cp -r /src/. /dst
fi

OPTIONS=""
if [[ "$TAG" != "staging" ]]; then
    OPTIONS="--force"
    echo "Build docker image for ${ENV} locally"
    docker-compose -f docker-compose.staging.yml build
fi

echo "$(docker service ls)";
if ! docker service ls | grep -q "LabHive_${ENV}"; then
    echo "Deploy new ${ENV}"
    docker stack deploy -c docker-compose.staging.yml LabHive_${ENV}
else
    echo "Update deployment for ${ENV}"
    docker service update $OPTIONS --image labhive/labhive:${TAG} LabHive_${ENV}_app
fi

echo "Migrate DB for ${ENV}"
docker run --rm -v $(pwd):/app -w /app --network LabHive_${ENV}_network -e "PRODUCTION=1" node /bin/bash -c "npm i && npm run migrations up";
