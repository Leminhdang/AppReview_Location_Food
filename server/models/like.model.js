const connection = require("../util/database");

module.exports = class Like {
  constructor(body) {
    this.body = body;
  }
  async likePosts() {
    const { receiver_id, sender_id, post_id } = this.body;
    try {
      let sql = `INSERT INTO likes (receiver_id, sender_id,post_id) VALUES (${receiver_id}, ${sender_id},${post_id})`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy số lượng like
  async getLikeCount(post_id) {
    const { user_id } = this.body;
    let id;
    if (post_id) {
      id = post_id;
    } else {
      id = this.body.id;
    }
    try {
      let sql = `SELECT COUNT(likes.id) AS count FROM likes WHERE post_id = ${id}`;
      const [count] = await connection.query(sql);
      sql = `SELECT id FROM likes WHERE receiver_id = ${user_id} AND post_id = ${id}`;
      const [status] = await connection.query(sql);
      if (status.length > 0)
        return { success: true, data: { count: count[0].count, status: true } };
      return { success: true, data: { count: count[0].count, status: false } };
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async deleteLikePosts() {
    const { user_id, post_id } = this.body;
    try {
      let sql = `DELETE FROM likes WHERE receiver_id = ${user_id} AND post_id = ${post_id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
};
