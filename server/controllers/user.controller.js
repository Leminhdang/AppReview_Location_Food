const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.getAllUsers();
      res.json({
        success: true,
        msg: "Get data success",
        data: user,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getFollower: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.getFollower();
      res.json({ success: true, data: user });
    } catch (error) {
      console.log(error.message);
    }
  },
  checkFollower: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.checkFollower();
      if (user === true) res.json({ success: true });
      else res.json({ success: false });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteFollower: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.deleteFollower();
      if (user === true) res.json({ success: true });
      else res.json({ success: false });
    } catch (error) {
      console.log(error.message);
    }
  },
  addFollower: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.addFollower();
      if (user === true) res.json({ success: true });
      else res.json({ success: false });
    } catch (error) {
      console.log(error.message);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.getUserById();
      if (user.length > 0)
        res.json({ success: true, msg: "Get data success", data: user[0] });
      else if (user.length === 0)
        res.json({ success: false, msg: "Get data fail", data: null });
    } catch (error) {
      console.log(error.message);
    }
  },
  getCount: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.getCount();
      return res.json({ success: true, msg: "Get data success", data: user });
    } catch (error) {
      return res.json({ success: false, msg: error.message });
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      let user = new User(req.body);
      user = await user.updateProfile();
      if (user.success === true)
        res.json({
          success: true,
          msg: "Thông tin cá nhân đã được thay đổi",
          data: user.data,
        });
      else res.json({ success: false, msg: user });
    } catch (error) {
      console.log(error.message);
    }
  },
  changePassword: async (req, res, next) => {
    let user = new User(req.body);
    user = await user.changePassword();
    if (user === true)
      return res.json({ success: true, msg: "Mật khẩu đã được thay đổi" });
    return res.json({ success: false, msg: user });
  },
  deductMoney: async (req, res, next) => {
    let user = new User(req.body);
    user = await user.deductMoney();
    if (user === true)
      return res.json({ success: true, msg: "Coins đã được thay đổi" });
    return res.json({ success: false, msg: "Giao dịch failed" });
  },
  updateCoinsAndExp: async (req, res, next) => {
    let user = new User(req.body);
    user = await user.updateCoinsAndExp();
    if (user === true)
      return res.json({ success: true, msg: "Thay đổi thành công" });
    else {
      return res.json({ success: false, msg: "Thay đổi failed" });
    }
  },

  updateInformation: async function (req, res, next) {
    let user = new User(req.body);
    user = await user.updateInformation();
    if (user === true)
      return res.json({ success: true, msg: "Thông tin đã được thay đổi" });
    return res.json({ success: false, msg: user });
  },

  checkIn: async function (req, res, next) {
    let user = new User(req.body);
    user = await user.checkIn();
    if (user === true) return res.json({ success: true, msg: "Success" });
    return res.json({ success: false, msg: user });
  },

  getCheckInStatus: async function (req, res, next) {
    let user = new User(req.body);
    user = await user.getCheckInStatus();
    if (user.success === true)
      return res.json({ success: true, msg: "Success", data: user.data });
    return res.json({ success: false, msg: user });
  },
};
