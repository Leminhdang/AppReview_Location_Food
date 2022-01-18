var express = require("express");
var router = express.Router();
var controller = require("../controllers/mission.controller");

router.post("/", controller.getAllMissions);
router.post("/addMission", controller.createMission);
router.post(
  "/addStatusMissionByOneUser",
  controller.addStatusMissionForOneUser
);
router.post("/getMissionById", controller.getMissionById);
router.post("/getMissionByUserId", controller.getMissionByUserId);
router.post("/updateStatus", controller.updateStatus);
router.post("/updateRateOfProgress", controller.updateRateOfProgress);
router.post("/checkStatus", controller.checkStatusMission);
module.exports = router;
