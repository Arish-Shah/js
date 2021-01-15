const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect("", { useUnifiedTopology: true })
    .then(client => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No Connection");
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
