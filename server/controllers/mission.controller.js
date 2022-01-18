const Mission = require("../models/mission.model");
const User = require("../models/user.model");
module.exports = {
  createMission: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      mission = await mission.createMission();
      let allUser = new User(req.body);
      allUser = await allUser.getAllUsers();
      if (mission[0].insertId !== undefined) {
        let mission1 = new Mission();
        allUser.forEach(async (user) => {
          await mission1.addStatusMissionForAllUser(
            user.id,
            mission[0].insertId
          );
        });
        res.json({ success: true, msg: "Mission created" });
      } else res.json({ success: false, msg: mission });
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllMissions: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      mission = await mission.getAllMissions();
      if (mission.length > 0)
        res.json({ success: true, msg: "Get data success", data: mission });
      else res.json({ success: false, msg: "Get data fail", data: null });
    } catch (error) {
      console.log(error.message);
    }
  },
  getMissionById: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      mission = await mission.getMissionById();
      if (mission.length > 0)
        res.json({ success: true, msg: "Get data success", data: mission });
      else res.json({ success: false, msg: "Get data fail", data: null });
    } catch (error) {
      console.log(error.message);
    }
  },
  getMissionByUserId: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      mission = await mission.getMissionByUserId();
      if (mission.length > 0)
        res.json({ success: true, msg: "Get data success", data: mission });
      else res.json({ success: false, msg: "Get data fail", data: null });
    } catch (error) {
      console.log(error.message);
    }
  },
  addStatusMissionForOneUser: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      let all_mission = await mission.getAllMissions();
      all_mission[0].forEach((element) => {
        // lấy tất cả nhiệm vụ về để thêm cho thành viên mới
        addData(element.id);
      });
      async function addData(id) {
        await mission.addStatusMissionForOneUser(id);
      }
      if (addData) res.json({ success: true });
      else res.json({ success: false });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      mission = await mission.updateStatus();
      if (mission) res.json({ success: true, msg: "Update data success" });
      else res.json({ success: false, msg: "Update data fail" });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateRateOfProgress: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      mission = await mission.updateRateOfProgress();
      if (mission) res.json({ success: true, msg: "Update data success" });
      else res.json({ success: false, msg: "Update data fail" });
    } catch (error) {
      console.log(error.message);
    }
  },
  checkStatusMission: async (req, res, next) => {
    try {
      let mission = new Mission(req.body);
      mission = await mission.checkStatusMission();
      if (mission) res.json({ success: true });
      else res.json({ success: false });
    } catch (error) {
      console.log(error.message);
    }
  },
};
