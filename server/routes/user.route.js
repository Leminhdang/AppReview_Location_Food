var express = require("express");
var router = express.Router();
var controller = require("../controllers/user.controller");
const auth = require("../common/auth");
const middleware = [auth.checkLogin, auth.checkRequest];

router.post("/", controller.getAllUsers);
//
router.post("/getUserById", controller.getUserById);
//

router.post("/getCount", controller.getCount);
//follow
router.post("/getFollower", controller.getFollower);
router.post("/addFollower", controller.addFollower);
router.post("/checkFollower", controller.checkFollower);
router.post("/deleteFollower", controller.deleteFollower);
router.post("/updateProfile", controller.updateProfile);

router.post("/deductMoney", controller.deductMoney);
router.post("/updateCoinsAndExp", controller.updateCoinsAndExp);
router.post("/updateInformation", controller.updateInformation);
router.post("/checkIn", controller.checkIn);
router.post("/getCheckInStatus", controller.getCheckInStatus);

module.exports = router;
