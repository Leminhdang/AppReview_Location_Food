const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");

module.exports = {
  // Đăng ký tài khoản
  createUserAccount: async (req, res, next) => {
    try {
      let account = new Account(req.body);
      account = await account.createUserAccount();
      res.json(account);
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, msg: error.message });
    }
  },
  // Đăng nhập bằng GG,FB
  socialAuth: async (req, res, next) => {
    try {
      let account = new Account(req.body);
      account = await account.socialAuth();
      if (account.success) {
        const info = account.msg.user;
        let token = jwt.sign({ info }, process.env.JWT_KEY);
        const { fullname, avatar, id, method } = account.msg.user;
        res.json({
          success: true,
          msg: "Đăng nhập thành công",
          data: {
            token,
            id,
            method,
            fullname,
            avatar,
          },
        });
      } else res.json(account);
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, msg: error.message });
    }
  },
  // Đăng nhập bằng email, password
  loginWithUserName: async (req, res, next) => {
    try {
      let account = new Account(req.body);
      account = await account.loginWithUserName();

      if (account.success) {
        const info = account.msg.user;
        let token = jwt.sign({ info }, process.env.JWT_KEY);
        const { fullname, avatar, id, method } = account.msg.user;
        res.json({
          success: true,
          msg: "Đăng nhập thành công",
          data: {
            token,
            id,
            method,
            fullname,
            avatar,
          },
        });
      } else res.json(account);
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, msg: error.message });
    }
  },
  // Đổi mật khẩu
  changePassword: async (req, res, next) => {
    try {
      let account = new Account(req.body);
      account = await account.changePassword();
      if (account === true)
        return res.json({ success: true, msg: "Mật khẩu đã được thay đổi" });
      return res.json({ success: false, msg: account });
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, msg: error.message });
    }
  },
  // Gửi email reset mật khẩu
  sendEmail: async (req, res, next) => {
    try {
      let account = new Account(req.body);
      account = await account.sendEmail();
      res.json(account);
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, msg: error.message });
    }
  },
  // Verify code để lấy lại mật khẩu
  verifyCode: async (req, res, next) => {
    try {
      let account = new Account(req.body);
      account = await account.verifyCode();
      if (account === true)
        return res.json({ success: true, msg: "Xác thực thành công" });
      return res.json({ success: false, msg: account });
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, msg: error.message });
    }
  },
  // Thay đổi mật khẩu sau khi verify code
  resetPassword: async (req, res, next) => {
    let account = new Account(req.body);
    account = await account.resetPassword();
    if (account === true) return res.json({ success: true, msg: "Thành công" });
    return res.json({ success: false, msg: account });
  },

  deleteUser: async (req, res, next) => {
    try {
      let user = new Account(req.body);
      user = await user.deleteUser();
      if (user === true) res.json({ success: true });
      else res.json({ success: false });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      let user = new Account(req.body);
      user = await user.updateStatus();
      if (user === true) res.json({ success: true });
      else res.json({ success: false });
    } catch (error) {
      console.log(error.message);
    }
  },
};
