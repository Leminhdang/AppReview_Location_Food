var jwt = require("jsonwebtoken");
module.exports = {
  checkLogin: (req, res, next) => {
    let auth = req.headers.key;
    try {
      auth = auth.split(" ")[1];
    } catch (e) {
      res.json({ success: false, msg: e });
    }
    if (auth) {
      jwt.verify(auth, process.env.JWT_KEY, function (err, decoded) {
        if (err) {
          res.json({ success: false, msg: err });
        } else {
          next();
        }
      });
    } else {
      res.json({ success: false, msg: "No token provided" });
    }
  },
  checkRequest: (req, res, next) => {
    let api_key = req.headers.key;
    if (api_key) {
      if (api_key === process.env.API_KEY) next();
      else {
        res.json({ success: false, msg: "Api key incorrect" });
      }
    } else {
      res.json({ success: false, msg: "Api key not found" });
    }
  },
};
