var express = require("express");
var router = express.Router();
var controller = require("../controllers/notifications.controller");
const auth = require("../common/auth");

router.post("/sendNotify", controller.sendNotification);
router.post("/getNotifications", controller.getNotifications);
router.post("/readNotify", controller.readNotify);


module.exports = router;
