const Notify = require("../models/notifications.model");
module.exports = {
  sendNotification: async (req, res, next) => {
    try {
      let notify = new Notify(req.body);
      notify = await notify.sendNotification();
      return res.json(notify);
    } catch (error) {
      console.log(error.message);
    }
  },

  getNotifications: async function (req, res, next) {
    try {
      let notify = new Notify(req.body);
      notify = await notify.getNotifications();
      return res.json(notify);
    } catch (error) {
      console.log(error.message);
    }
  },

  readNotify: async (req, res, next) => {
    try {
      let notify = new Notify(req.body);
      notify = await notify.readNotify();
      return res.json(notify);
    } catch (error) {
      console.log(error.message);
    }
  }
};
