var express = require("express");
var router = express.Router();
var controller = require("../controllers/voucher.controller");

router.post("/", controller.getAllVoucher);
//
router.post("/getVoucherById", controller.getVoucherById);
//
router.post("/createVoucher", controller.createVoucher);
//
router.post("/editVoucher", controller.editVoucher);
//
router.post("/deleteVoucher", controller.deleteVoucher);

router.post("/redeemVoucher", controller.redeemVouchers);

router.post("/checkRedeemVoucher", controller.checkRedeemVoucher);

router.post("/getVoucherByStatus", controller.getVoucherByStatus);

router.post("/updateStatus", controller.updateStatus);
module.exports = router;
