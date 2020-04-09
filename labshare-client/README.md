# LabHive

## Run using docker locally in dev mode
* VueJS Application is debuggable with the browser addon VueDev
* MongoDB is accessible via mongo-express at `localhost:8081` 
* Application available at `localhost:5000`
```
mkdir secret
echo "randomHmacKey" > secret/jsonwebtoken_hmacKey.txt
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up -d
```


## Run locally for development
```shell
$(npm bin)/tsc --watch --outDir dist-backend;
node dist-backend/backend/main.js # or F5 in VSCode
npm run serve
```
