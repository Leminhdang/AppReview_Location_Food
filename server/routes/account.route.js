var express = require("express");
var router = express.Router();
var controller = require("../controllers/account.controller");
const auth = require("../common/auth");
const middleware = [auth.checkLogin, auth.checkRequest];

router.post("/register", controller.createUserAccount);
//
router.post("/social-auth", controller.socialAuth);
//
router.post("/login", auth.checkRequest, controller.loginWithUserName);
//
router.post("/change-password", controller.changePassword);
//
router.post("/send-email", auth.checkRequest, controller.sendEmail);
//
router.post("/verify-code", auth.checkRequest, controller.verifyCode);

router.post("/reset-password", auth.checkRequest, controller.resetPassword);
router.post("/deleteUser", controller.deleteUser);
router.post("/updateStatus",controller.updateStatus);

module.exports = router;
