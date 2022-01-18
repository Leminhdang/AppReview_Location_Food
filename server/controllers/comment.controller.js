const Comment = require("../models/comment.model");
module.exports = {
  addComment: async (req, res, next) => {
    try {
      let comment = new Comment(req.body);
      comment = await comment.addComment();
      if (comment.success === true)
        res.json({
          success: true,
          msg: "Đã bình luận thành công",
          id: comment.id,
        });
      else res.json({ success: false, msg: comment.msg });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateComment: async (req, res, next) => {
    try {
      let comment = new Comment(req.body);
      comment = await comment.updateComment();
      if (comment === true) res.json({ success: true, msg: "Update success" });
      else res.json({ success: false, msg: comment });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteComment: async function (req, res, next) {
    try {
      let comment = new Comment(req.body);
      comment = await comment.deleteComment();
      if (comment === true) res.json({ success: true, msg: "Delete success" });
      else res.json({ success: false, msg: comment });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy tất cả bình luận của bài viết
  getCommentByPostId: async (req, res, next) => {
    try {
      let comment = new Comment(req.body);
      let listData = await comment.getCommentByPostId();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
