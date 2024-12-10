const createHttpErrors = require("http-errors");
const { touristSpotCollection } = require("../database");

async function getAllTouristSpots(req, res, next) {
  try {
    const data = await touristSpotCollection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllTouristSpots };
