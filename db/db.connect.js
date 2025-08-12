const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB;

const initialiseDatabase = async () => {
  await mongoose
    .connect(MongoUri)
    .then(() => console.log("connected to database!"))
    .catch((error) =>
      console.log("error in connecting to the database", error)
    );
};

module.exports = initialiseDatabase;
