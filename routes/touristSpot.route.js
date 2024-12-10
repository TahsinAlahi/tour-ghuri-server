const router = require("express").Router();
const touristSpotControllers = require("../controllers/touristSpot.controller");

router.route("/").get(touristSpotControllers.getAllTouristSpots).post();
router.route("/:id").get().patch().delete();

module.exports = router;
