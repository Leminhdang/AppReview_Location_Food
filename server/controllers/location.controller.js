const Location = require("../models/location.model");
module.exports = {
  createLocation: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      location = await location.createLocation();
      // if (location === true)
      res.json({ success: true, msg: location[0].insertId });
      // else res.json({ success: false, msg: location });
    } catch (error) {
      console.log(error.message);
    }
  },

  searchLocation: async (req, res, next) => {
    try {
      let sLocation = new Location(req.body);
      sLocation = await sLocation.searchLocation();
      if (sLocation[0].length > 0) {
        res.json({
          success: true,
          msg: "Get data success",
          data: sLocation[0],
        });
      } else {
        res.json({ success: false, msg: "LocationGet data null", data: null });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  getLocationById: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      location = await location.getLocationById();
      if (location[0].length > 0)
        res.json({ success: true, msg: "Get data success", data: location[0] });
      else if (location[0].length === 0)
        res.json({ success: false, msg: "Get data fail", data: null });
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllLocation: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      location = await location.getAllLocation();
      if (location[0].length > 0)
        res.json({ success: true, msg: "Get data success", data: location[0] });
      else if (location[0].length === 0)
        res.json({ success: false, msg: "Get data fail", data: null });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateLocation: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      location = await location.updateLocation();

      if (location === true) res.json({ success: true, msg: "UPdate success" });
      else res.json({ success: false, msg: location });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteLocation: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      location = await location.deleteLocation();
      if (location === true) res.json({ success: true, msg: "Delete success" });
      else res.json({ success: false, msg: location });
    } catch (error) {
      console.log(error.message);
    }
  },
  getLocationByRatting: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      location = await location.getLocationByRatting();
      if (location[0].length > 0)
        res.json({ success: true, msg: "Get data success", data: location[0] });
      else if (location[0].length === 0)
        res.json({ success: false, msg: "Get data fail", data: null });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy địa điểm ghim trong bài viết
  getLocationByPostId: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      let listData = await location.getLocationByPostId();
      if (listData.length > 0)
        res.json({
          success: true,
          msg: "Get data all post success",
          data: listData,
        });
      else if (listData.length === 0)
        res.json({
          success: false,
          msg: "Get data all food fail",
          data: null,
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Lấy địa điểm yêu thích

  getFavoritesLocation: async (req, res, next) => {
    try {
      let location = new Location(req.body);
      let listData = await location.getFavoritesLocation();
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
