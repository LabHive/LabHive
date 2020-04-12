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

## Environment Variable
The following env variables can be set to control the behavior of the application.
* `PRODUCTION`, default: `false`
    * Requires the file `secret/jsonwebtoken_hmacKey.txt` containing string, used as HMAC Key
    * Sets `ENABLE_MAIL` automatically to `true`, unless explicitly set to `false`
* `ENABLE_MAIL`, default: `false` (`true`, if `PRODUCTION` is enabled)
    * Enables that mails are sent for account activation and password forget.
    * Setting this variable requires the file `secret/mailConfig.json` with [SMTP Transport options](https://nodemailer.com/smtp/)
* `DISABLE_VERIFICATION`, default: `false`
    * Disables that accounts have to be verified
* `BASE_URL`, default: `undefined`, e.g. `http://localhost:8080`
    * Used to generate links (activation, password reset)
