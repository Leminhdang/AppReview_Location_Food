const connection = require("../util/database");

module.exports = class Comment {
  constructor(body) {
    this.body = body;
  }
  async addComment() {
    const { post_id, user_id, content } = this.body;
    try {
      let sql = `INSERT INTO comment ( post_id, user_id, content) 
      VALUES (${post_id}, ${user_id},'${content}');`;
      await connection.query(sql);
      sql = `SELECT LAST_INSERT_ID() AS id `;
      const [id] = await connection.query(sql);
      return { success: true, id: id[0] };
    } catch (error) {
      return { success: false, msg: error.sqlMessage };
    }
  }
  async updateComment() {
    const { post_id, content } = this.body;
    try {
      let sql = `UPDATE comment SET content = '${content}' WHERE post_id = ${post_id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async deleteComment() {
    const { id } = this.body;
    try {
      let sql = `DELETE FROM comment  WHERE id=${id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy tất cả bình luận của bài viết
  async getCommentByPostId() {
    const { id } = this.body;
    try {
      let sql = `SELECT cm.id,cm.user_id,cm.content,cm.create_at,us.fullname,us.avatar
       FROM comment cm
       LEFT JOIN users us ON cm.user_id = us.id 
       WHERE post_id = ${id}`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
};
