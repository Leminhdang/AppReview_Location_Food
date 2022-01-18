const Post = require("../models/post.model");
module.exports = {
  // Tạo bài viết
  createPost: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      post = await post.createPost();
      if (post === true)
        res.json({ success: true, msg: "Bài viết đã được đăng" });
      else res.json({ success: false, msg: post });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Tìm kiếm bài viết
  searchPost: async (req, res, next) => {
    try {
      let sPost = new Post(req.body);
      sPost = await sPost.searchPost();
      res.json({
        success: true,
        msg: "Successfully",
        data: sPost,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy tất cả bài viết cho trang Home
  getAllPosts: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getAllPosts();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  //Lấy tất cả video video
  getVideoByPosts: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getVideoByPosts();
      if (listData.length > 0)
        res.json({
          success: true,
          msg: "Get data videos success",
          data: listData,
        });
      else
        res.json({
          success: false,
          msg: "Get data videos fail",
          data: null,
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy tất cả bài viết theo thời gian gần nhất
  getPostsSortByDate: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getPostsSortByDate();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy tất cả bài viết theo lượt tim
  getPostsSortByHeart: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getPostsSortByHeart();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  // Lấy chi tiết bài viết
  getPostsById: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getPostsById();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lây tất cả bài viết đã đăng
  getPostsByUserId: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getPostsByUserId();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  // Lấy tất cả bài viết đã lưu
  getPostsSaveByUserId: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getPostsSaveByUserId();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  // Lấy tất cả bài viết có đính kèm địa điểm nào đó
  getPostsByLocation: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getPostsByLocation();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy tất cả bài viết trong 1 bài viết
  getImageByPostId: async (req, res, next) => {
    try {
      let post = new Post(req.body);
      let listData = await post.getImageByPostId();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  // Chỉnh sửa bài viết
  updatePost: async function (req, res, next) {
    try {
      let post = new Post(req.body);
      post = await post.updatePost();
      if (post === true) res.json({ success: true, msg: "Update success" });
      else res.json({ success: false, msg: post });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Xoá bài viết
  deletePosts: async function (req, res, next) {
    try {
      let post = new Post(req.body);
      post = await post.deletePosts();
      if (post === true) res.json({ success: true, msg: "Delete success" });
      else res.json({ success: false, msg: post });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy đánh giá trung bình + số lượng đánh giá
  getCountAndRating: async function (req, res, next) {
    try {
      let post = new Post(req.body);
      post = await post.getCountAndRating();
      res.json({
        success: true,
        msg: "Successfully",
        data: post,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // report
  reportPost: async function (req, res, next) {
    try {
      let post = new Post(req.body);
      post = await post.reportPost();

      if (post === true) {
        res.json({
          success: true,
          msg: "Report success",
        });
      } else {
        res.json({
          success: false,
          msg: "Report failed",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  checkStatusPostSave: async function (req, res, next) {
    try {
      let post = new Post(req.body);
      post = await post.checkPostSaveByUserId();
      console.log(post.length);
      if (post.length === 0) {
        res.json({
          success: true,
          msg: "Successfully",
        });
      } else {
        res.json({
          success: false,
          msg: "Failed",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  savePost: async function (req, res, next) {
    try {
      let post = new Post(req.body);
      post = await post.savePost();
      if (post === true) {
        res.json({
          success: true,
          msg: "Save success",
        });
      } else {
        res.json({
          success: false,
          msg: "Save failed",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  deletePostSave: async function (req, res, next) {
    try {
      let post = new Post(req.body);
      post = await post.deletePostSave();
      if (post === true) {
        res.json({
          success: true,
          msg: "Save success",
        });
      } else {
        res.json({
          success: false,
          msg: "Save failed",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  getVideoByPostId: async (req, res, next) => {
    try {
      try {
        let post = new Post(req.body);
        let listData = await post.getVideoByPostId();
        res.json({
          success: true,
          msg: "Successfully",
          data: listData,
        });
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {}
  },
};
