const dotenv = require("dotenv");

let _ENV = dotenv.config().parsed;

module.exports = {
  development: {
    username: _ENV["DB_USERNAME"],
    password: _ENV["DB_PASSWORD"],
    database: _ENV["DB_NAME"],
    host: _ENV["DB_HOST"],
    port: _ENV["DB_PORT"],
    dialect: _ENV["DB_DIALECT"]
  },
  test: {
    username: _ENV["DB_USERNAME"],
    password: _ENV["DB_PASSWORD"],
    database: _ENV["DB_TEST"],
    host: _ENV["DB_HOST"],
    port: _ENV["DB_PORT"],
    dialect: _ENV["DB_DIALECT"]
  },
  production: {
    username: _ENV["DB_USERNAME"],
    password: _ENV["DB_PASSWORD"],
    database: _ENV["DB_PRODUCTION"],
    host: _ENV["DB_HOST"],
    port: _ENV["DB_PORT"],
    dialect: _ENV["DB_DIALECT"]
  }
}
