const connection = require("../util/database");
const moment = require("moment");
module.exports = class User {
  constructor(body) {
    this.body = body;
  }

  async getAllUsers() {
    const { id } = this.body;
    try {
      let sql = `SELECT id, identity_id, fullname, avatar, information, coins,level, exp FROM users`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async getPostsByUserId() {
    const { id } = this.body;
    try {
      let sql = `SELECT u.id,p.id,p.title,p.content,p.create_at,i.id,i.image_url,v.video_url FROM post p  LEFT JOIN users u  ON p.user_id = u.id LEFT JOIN images i ON i.post_id = p.id LEFT JOIN videos v ON v.post_id = p.id WHERE u.id = ${id}`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getImageByUserId() {
    const { id } = this.body;
    try {
      let sql = `SELECT u.id, u.identity_id,p.id as id_post,i.id as id_image, i.image_url FROM post p  LEFT JOIN users u ON p.user_id = u.id LEFT JOIN images i ON i.post_id = p.id  WHERE u.id = ${id}`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getFollower() {
    const { user_id } = this.body;
    try {
      let sql = `SELECT p.id, user_id, follower_id, u.fullname, u.avatar FROM follower p LEFT JOIN users u ON u.id = p.follower_id WHERE p.user_id  = ${user_id}`;
      let [data] = await connection.query(sql);
      return data;
    } catch (error) {
      return false;
    }
  }
  async checkFollower() {
    const { user_id, follower_id } = this.body;
    try {
      let sql = `SELECT id FROM follower WHERE user_id = ${user_id} and follower_id = ${follower_id}`;
      let [data] = await connection.query(sql);

      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async deleteFollower() {
    const { user_id, follower_id } = this.body;
    try {
      let sql = `DELETE FROM follower WHERE user_id = ${user_id} and follower_id = ${follower_id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addFollower() {
    const { user_id, follower_id } = this.body;
    try {
      let sql = `INSERT INTO follower( user_id, follower_id) VALUES (${user_id}, ${follower_id})`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserById() {
    const { id } = this.body;
    try {
      let sql = `SELECT id, identity_id, fullname, avatar, information, coins , level, exp,email,gender,phone_number
       FROM users WHERE id = ${id}`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async updateProfile() {
    const { id, fullname, avatar, gender, phone_number } = this.body;
    try {
      const update_at = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      let sql = `UPDATE users SET fullname='${fullname}',avatar='${avatar}',gender='${gender}',
      phone_number='${phone_number}',update_at='${update_at}' WHERE id=${id} `;
      await connection.query(sql);
      return { success: true, data: { id, fullname, avatar } };
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async getCount() {
    const { id } = this.body;
    try {
      let sql = `SELECT COUNT(id) AS count FROM follower WHERE user_id = ${id}`;
      let [followCount] = await connection.query(sql);
      sql = `SELECT COUNT(i.id) AS count FROM post p LEFT JOIN images i ON i.post_id = p.id WHERE user_id = ${id}`;
      let [imageCount] = await connection.query(sql);
      sql = `SELECT COUNT(id) AS count FROM post WHERE user_id = ${id}`;
      let [postsCount] = await connection.query(sql);
      return {
        imageCount: imageCount[0].count,
        followCount: followCount[0].count,
        postsCount: postsCount[0].count,
      };
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getCoinAndLv(user_id) {
    try {
      let sql = `SELECT coins, level, exp FROM users WHERE id = ${user_id}`;
      let [data] = await connection.query(sql);
      return data;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async deductMoney() {
    const { user_id, coins } = this.body;
    try {
      let [dataCoin] = await this.getCoinAndLv(user_id);
      let newCoins = dataCoin.coins + coins;
      let sql = `UPDATE users SET coins=${newCoins} WHERE id = ${user_id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async updateInformation() {
    const { id, information } = this.body;

    try {
      const update_at = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      let sql = `UPDATE users SET information='${information}',update_at='${update_at}' WHERE id=${id} `;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async updateCoinsAndExp() {
    const { user_id, coins, exp } = this.body;
    try {
      let [dataCoinAndLv] = await this.getCoinAndLv(user_id);
      if (coins > 0 && exp > 0) {
        let newCoins = dataCoinAndLv.coins + coins;
        let newExp = dataCoinAndLv.exp + exp;
        let level = dataCoinAndLv.level;
        if (newExp >= 100) {
          let exp = newExp - 100;
          let newLevel = level + 1;
          let sql = `UPDATE users SET coins=${newCoins},exp=${exp}, level=${newLevel} WHERE id = ${user_id}`;
          await connection.query(sql);
          return true;
        } else {
          let sql = `UPDATE users SET coins=${newCoins},exp=${newExp} WHERE id = ${user_id}`;
          await connection.query(sql);
          return true;
        }
      } else if (exp === 0) {
        let sql = `UPDATE users SET coins=${coins} WHERE id = ${user_id}`;
        await connection.query(sql);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async checkIn() {
    const { id, number_checkin_days, coins, checkin } = this.body;
    try {
      const update_at = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      let sql = `UPDATE users SET checkin_date='${update_at}',update_at='${update_at}',
       number_checkin_days=${number_checkin_days}, coins=${coins}, check_in = ${checkin} WHERE id=${id} `;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async getCheckInStatus() {
    const { id } = this.body;
    try {
      let sql = `SELECT check_in,checkin_date,coins,number_checkin_days FROM users WHERE id=${id}`;
      const [data] = await connection.query(sql);
      return { success: true, data: data[0] };
    } catch (error) {
      return error.sqlMessage;
    }
  }
};
