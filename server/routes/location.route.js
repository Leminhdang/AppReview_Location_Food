var express = require("express");
var router = express.Router();
var controller = require("../controllers/location.controller");

router.post("/addLocation", controller.createLocation);
router.post("/searchLocation", controller.searchLocation);
router.post("/getLocationById", controller.getLocationById);
router.post("/getAllLocation", controller.getAllLocation);
router.post("/updateLocation", controller.updateLocation);
router.post("/deleteLocation", controller.deleteLocation);
router.post("/getLocationByRatting", controller.getLocationByRatting);
// Lấy địa điểm ghim trong bài viết
router.post("/getLocationByPostId", controller.getLocationByPostId);
// Lấy địa điểm yêu thích
router.post("/getFavoritesLocation", controller.getFavoritesLocation);

module.exports = router;
