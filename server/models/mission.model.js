const connection = require("../util/database");

module.exports = class Post {
  constructor(body) {
    this.body = body;
  }
  async createMission() {
    const { title, content, maximum_progress, coins, exp } = this.body;
    try {
      if (
        title.length > 0 ||
        content.length > 0 ||
        maximum_progress.length > 0 ||
        coins.length > 0 ||
        exp.length > 0
      ) {
        let sql = `INSERT INTO mission( title, content, maximum_progress, coins, exp) VALUES ('${title}','${content}','${maximum_progress}','${coins}','${exp}')`;
        return await connection.query(sql);
      }
      return null;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getAllMissions() {
    try {
      let sql = `SELECT id, title, content, maximum_progress, coins,exp, create_at, update_at FROM mission`;
      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getMissionById() {
    let { id } = this.body;
    try {
      let sql = `SELECT id, title, content, maximum_progress, coins,exp, create_at, update_at FROM mission where id = ${id}`;
      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getMissionByUserId() {
    let { user_id } = this.body;

    try {
      let sql = `SELECT sm.id, sm.user_id, sm.mission_id , sm.rate_of_progress,m.title,m.content,m.maximum_progress,m.coins,m.exp, sm.status  FROM status_mission sm LEFT JOIN mission m on m.id = sm.mission_id WHERE user_id = ${user_id}`;
      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async addStatusMissionForAllUser(user_id, mission_id) {
    try {
      let sql = `INSERT INTO status_mission(user_id, mission_id, rate_of_progress) VALUES (${user_id}, ${mission_id}, 0)`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addStatusMissionForOneUser(mission_id) {
    const { user_id } = this.body;
    try {
      let sql = `INSERT INTO status_mission(user_id, mission_id, rate_of_progress) VALUES (${user_id}, ${mission_id}, 0)`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
  async updateStatus() {
    const { user_id, mission_id } = this.body;
    try {
      let sql = `UPDATE status_mission SET status=true WHERE user_id =${user_id} And mission_id = ${mission_id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
  async updateRateOfProgress() {
    const { user_id, mission_id } = this.body;
    try {
      let getRateofProgress = `SELECT  rate_of_progress  FROM status_mission WHERE user_id =${user_id} And mission_id = ${mission_id}`;
      let [dataProgress] = await connection.query(getRateofProgress);
      let progress = dataProgress[0].rate_of_progress + 1;
      let sql = `UPDATE status_mission SET rate_of_progress = ${progress} WHERE user_id =${user_id} And mission_id = ${mission_id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
  async checkStatusMission() {
    const { user_id, mission_id } = this.body;
    try {
      let sql = `SELECT id, status FROM status_mission  WHERE user_id =${user_id} And mission_id = ${mission_id}`;
      let [data] = await connection.query(sql);
      if (data[0].status === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
