const createHttpErrors = require("http-errors");
const { ObjectId } = require("mongodb");
const { touristSpotCollection } = require("../database");

// get all tourist spots
async function getAllTouristSpots(req, res, next) {
  try {
    const data = await touristSpotCollection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

// get a single tourist spot
async function getTouristSpot(req, res, next) {
  const { id } = req.params;

  try {
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) throw createHttpErrors(400, "Invalid ID");

    const data = await touristSpotCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    // error if data was not found
    if (!data) throw createHttpErrors(404, "Tourist spot not found");

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllTouristSpots, getTouristSpot };
