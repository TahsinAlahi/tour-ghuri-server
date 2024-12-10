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

// post a tourist spot
async function createTouristSpot(req, res, next) {
  try {
    const {
      image,
      touristSpotName,
      countryName,
      location,
      shortDescription,
      averageCost,
      seasonality,
      travelTime,
      totalVisitorsPerYear,
      userEmail,
      userName,
    } = req.body;

    if (
      !image ||
      !touristSpotName ||
      !countryName ||
      !location ||
      !userEmail ||
      !userName ||
      !averageCost ||
      !seasonality ||
      !travelTime ||
      !totalVisitorsPerYear ||
      !shortDescription
    )
      throw createHttpErrors(400, "Missing required fields");

    const newTouristSpot = await touristSpotCollection.insertOne(req.body);
    const returnData = {
      _id: newTouristSpot.insertedId,
      ...req.body,
    };

    res.status(201).json(returnData);
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

// delete a book
async function deleteTouristSpot(req, res, next) {
  const { id } = req.params;
  try {
    const isValid = ObjectId.isValid(id);
    if (!isValid) throw createHttpErrors(404, "Invalid ID");

    const data = await touristSpotCollection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });
    if (!data) throw createHttpErrors(404, "Tourist spot not found");

    res.status(200);
  } catch (error) {
    next(error);
  }
}

// patching a tourist spot
async function patchTouristSpot(req, res, next) {
  const { id } = req.params;

  try {
    const isValid = ObjectId.isValid(id);
    if (!isValid) throw createHttpErrors(400, "Invalid Id");

    const {
      image,
      touristSpotName,
      countryName,
      location,
      shortDescription,
      averageCost,
      seasonality,
      travelTime,
      totalVisitorsPerYear,
      userEmail,
      userName,
    } = req.body;

    const changedField = {
      ...(image && { image }),
      ...(touristSpotName && { touristSpotName }),
      ...(countryName && { countryName }),
      ...(location && { location }),
      ...(shortDescription && { shortDescription }),
      ...(averageCost && { averageCost }),
      ...(seasonality && { seasonality }),
      ...(travelTime && { travelTime }),
      ...(totalVisitorsPerYear && { totalVisitorsPerYear }),
      ...(userEmail && { userEmail }),
      ...(userName && { userName }),
    };

    const changedData = await touristSpotCollection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: changedField },
      { returnDocument: "after" }
    );

    if (!changedData) throw createHttpErrors(404, "Tourist spot not found");

    res.status(200).json(changedData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTouristSpots,
  getTouristSpot,
  patchTouristSpot,
  createTouristSpot,
  deleteTouristSpot,
  deleteTouristSpot,
};
