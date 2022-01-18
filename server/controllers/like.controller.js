const Like = require("../models/like.model");
module.exports = {
  likePosts: async (req, res, next) => {
    try {
      let like = new Like(req.body);
      like = await like.likePosts();
      if (like === true)
        return res.json({ success: true, message: "Successfully" });
      return res.json({ success: false, msg: like });
    } catch (error) {
      console.log(error.message);
    }
  },

  getLikeCount: async (req, res, next) => {
    try {
      let like = new Like(req.body);
      const count = await like.getLikeCount();
      if (count.success === true)
        return res.json({
          success: true,
          message: "Successfully",
          data: count.data,
        });
      return res.json({ success: false, msg: count });
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteLikePosts: async (req, res, next) => {
    try {
      let like = new Like(req.body);
      const count = await like.deleteLikePosts();
      if (count === true)
        return res.json({
          success: true,
          message: "Successfully",
          data: count.data,
        });
      return res.json({ success: false, msg: count });
    } catch (error) {
      console.log(error.message);
    }
  },
};
