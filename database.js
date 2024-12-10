const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);
const tourGhuriDataBase = client.db("tour-ghuri");
const touristSpotCollection = tourGhuriDataBase.collection("tourist-spots");

module.exports = { client, tourGhuriDataBase, touristSpotCollection };
