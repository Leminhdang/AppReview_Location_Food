var express = require("express");
var router = express.Router();
var controller = require("../controllers/admin.controller");
router.post("/getCount", controller.getCount);
router.post("/loginAdmin", controller.loginAdmin);
router.post("/getAllPostLike", controller.getAllPostLike);
router.post("/getPostReport", controller.getPostReport);
router.post("/updateStatusReport", controller.updateStatusReport);
router.post("/getNotificationReport", controller.getNotificationReport);

module.exports = router;
