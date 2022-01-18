var express = require("express");
var router = express.Router();
var controller = require("../controllers/like.controller");
//
router.post("/likePosts", controller.likePosts);
router.post("/getCount", controller.getLikeCount);
router.post("/deleteLikePosts", controller.deleteLikePosts);

module.exports = router;
