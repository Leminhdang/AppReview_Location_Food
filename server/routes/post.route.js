var express = require("express");
var router = express.Router();
var controller = require("../controllers/post.controller");

// Tạo bài viết
router.post("/createPost", controller.createPost);
// Tìm kiếm bài viết
router.post("/searchPost", controller.searchPost);
// Lấy tất cả bài viết
router.post("/getAllPosts", controller.getAllPosts);
//Lấy tất cả video
router.post("/getVideoByPosts", controller.getVideoByPosts);
// Lấy bài viết theo thời gian gần nhất
router.post("/getPostsSortByDate", controller.getPostsSortByDate);
// Lấy bài viết theo lượt tim
router.post("/getPostsSortByHeart", controller.getPostsSortByHeart);
// Lấy chi tiết bài viết
router.post("/getPostsById", controller.getPostsById);
// Lấy bài viết đã đăng
router.post("/getPostByUserId", controller.getPostsByUserId);
// Lấy bài viết đã lưu
router.post("/getPostsSaveByUserId", controller.getPostsSaveByUserId);
// Lấy tất cả bài viết có đính kèm địa điểm nào đó
router.post("/getPostsByLocation", controller.getPostsByLocation);
// Chỉnh sửa bài viết
router.post("/updatePost", controller.updatePost);
// Xoá bài viết
router.post("/deletePosts", controller.deletePosts);

// Lấy tất cả hình ảnh của 1 bài viết
router.post("/getImageByPostId", controller.getImageByPostId);
// Lấy đánh giá trung bình + số lượng đánh giá
router.post("/getCountAndRating", controller.getCountAndRating);
//reportPost
router.post("/reportPost", controller.reportPost);

router.post("/checkPostSave", controller.checkStatusPostSave);
router.post("/savePost", controller.savePost);
router.post("/deletePostSave", controller.deletePostSave);
router.post("/getVideoByPostId", controller.getVideoByPostId);
module.exports = router;
