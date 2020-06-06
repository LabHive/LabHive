// In this file you can configure migrate-mongo
const fs = require("fs")

const connectionBase = process.env.PRODUCTION ? 'mongodb' : 'localhost';
let userPassword = "";
if (fs.existsSync("secret/dbConfig.json")) {
  const f = JSON.parse(fs.readFileSync("secret/dbConfig.json", { encoding: "utf8" }))
  userPassword = f.username + ":" + f.password + "@"
}

const config = {
  mongodb: {
    url: `mongodb://${userPassword}${connectionBase}:27017/?authSource=admin`,

    databaseName: "labshare",

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "src/backend/database/migrations/",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js"
};

// Return the config as a promise
module.exports = config;
