const Voucher = require("../models/voucher.model");
const User = require("../models/user.model");

module.exports = {
  getAllVoucher: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.getAllVoucher();
      res.json({
        success: true,
        msg: "Get data success",
        data: voucher,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getVoucherById: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.getVoucherById();
      res.json({
        success: true,
        msg: "Get data success",
        data: voucher,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  createVoucher: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.createVoucher();
      res.json({
        success: true,
        msg: "Add data success",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  editVoucher: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.editVoucher();
      if (voucher === false) {
        res.json({
          success: false,
          msg: "Edit data failed",
        });
      }
      res.json({
        success: true,
        msg: "Edit data success",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteVoucher: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.deleteVoucher();
      if (voucher === false) {
        res.json({
          success: false,
          msg: "Delete data false",
        });
      }
      res.json({
        success: true,
        msg: "Delete data success",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  redeemVouchers: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      let user = new User(req.body);
      voucher = await voucher.redeemVouchers();
      user = await user.deductMoney();
      if (voucher === false) {
        res.json({
          success: false,
          msg: "Redeem voucher false",
        });
      }
      res.json({
        success: true,
        msg: "Redeem voucher success",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  checkRedeemVoucher: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.checkRedeemVoucher();
      if (voucher === true) {
        res.json({
          success: true,
          msg: "Check redeem voucher false",
        });
      }
      res.json({
        success: false,
        msg: "Check redeem voucher success",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getVoucherByStatus: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.getVoucherByStatus();
      res.json({
        success: true,
        msg: "Get data voucher by status",
        data: voucher,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      let voucher = new Voucher(req.body);
      voucher = await voucher.updateStatus();
      if (voucher === true) {
        res.json({
          success: true,
          msg: "Update data success",
        });
      } else {
        res.json({
          success: false,
          msg: "Update data failed",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
