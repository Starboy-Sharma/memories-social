const mongoose = require("mongoose");

// Create database connection
const db = require("../config/keys").MongoURI;

console.log('DB', db);

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    // Connect to mongo db
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      })
      .then(() => console.log(`Mongo DB connected wuuhuuu...`))
      .catch((error) => {
        console.log(`Error in DB connection: ${error}`)
        process.exit(1);
      });
  }
}

module.exports = new Database();