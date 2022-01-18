var express = require("express");
var router = express.Router();
var controller = require("../controllers/comment.controller");
router.post("/addComment", controller.addComment);
router.post("/updateComment", controller.updateComment);
router.post("/deleteComment", controller.deleteComment);
// Lấy bình luận của bài viết
router.post("/getCommentByPostId", controller.getCommentByPostId);
module.exports = router;
