const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");

module.exports = {
  getCount: async (req, res, next) => {
    try {
      let admin = new Admin(req.body);
      admin = await admin.getCount();
      return res.json({ success: true, msg: "Get data success", data: admin });
    } catch (error) {
      return res.json({ success: false, msg: error.message });
    }
  },

  loginAdmin: async function (req, res, next) {
    try {
      let admin = new Admin(req.body);
      admin = await admin.loginAdmin();
      if (admin.success === true) {
        return res.json({ success: true, msg: "Đăng nhập thành công" });
      }
      return res.json({ success: false, msg: admin });
    } catch (error) {
      return res.json({ success: false, msg: error.message });
    }
  },
  //Lấy bài viết theo lượt like cao
  getAllPostLike: async (req, res, next) => {
    try {
      let post = new Admin(req.body);
      let listData = await post.getAllPostLike();
      res.json({
        success: true,
        msg: "Successfully",
        data: listData,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getPostReport: async (req, res, next) => {
    try {
      let admin = new Admin(req.body);
      admin = await admin.getPostReport();
      return res.json({ success: true, msg: "Get data success", data: admin });
    } catch (error) {
      return res.json({ success: false, msg: error.message });
    }
  },
  updateStatusReport: async (req, res, next) => {
    try {
      let admin = new Admin(req.body);
      admin = await admin.updateStatusPostRepost();
      return res.json({ success: true, msg: "update data success" });
    } catch (error) {
      return res.json({ success: false, msg: error.message });
    }
  },
  getNotificationReport: async (req, res, next) => {
    try {
      let admin = new Admin(req.body);
      admin = await admin.getNotificationReport();
      return res.json({ success: true, msg: "get data success", data: admin });
    } catch (error) {
      return res.json({ success: false, msg: error.message });
    }
  },
};
