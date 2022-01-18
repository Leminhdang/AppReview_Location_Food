const connection = require("../util/database");
const admin = require("firebase-admin");
var serviceAccount = require("../util/serviceAccountKey.json");
const moment = require("moment");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = class Post {
  constructor(body) {
    this.body = body;
  }
  async sendNotification() {
    const { sender_id, receiver_id, type, posts_id } = this.body;
    if (sender_id !== receiver_id) {
      try {
        let sql = `SELECT fullname FROM users WHERE id = ${sender_id}`;
        const [[user]] = await connection.query(sql);
        if (type === "comment" || type === "report") {
          sql = `INSERT INTO notifications (sender_id,receiver_id,type,posts_id) VALUES (${sender_id},${receiver_id},'${type}',${posts_id})`;
          await connection.query(sql);
          const message = {
            data: {
              type: type,
              sender: user.fullname,
              posts_id: `${posts_id}`,
            },
            topic: `${receiver_id}`,
          };
          return await admin.messaging().send(message);
        }
        if (type === "like") {
          sql = `SELECT id FROM notifications WHERE sender_id = ${sender_id} AND receiver_id = ${receiver_id} AND type='${type}'`;
          const [data] = await connection.query(sql);
          if (data.length === 0) {
            sql = `INSERT INTO notifications (sender_id,receiver_id,type,posts_id) VALUES (${sender_id},${receiver_id},'${type}',${posts_id})`;
            await connection.query(sql);
            const message = {
              data: {
                type: type,
                sender: user.fullname,
                posts_id: `${posts_id}`,
              },
              topic: `${receiver_id}`,
            };
            return await admin.messaging().send(message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getNotifications() {
    let { id } = this.body;
    try {
      let sql = `SELECT notifications.id, users.fullname,notifications.posts_id, post.title, notifications.read,
      notifications.sender_id,notifications.create_at,notifications.type,users.avatar
      FROM notifications 
      LEFT JOIN users ON notifications.sender_id = users.id 
      LEFT JOIN post ON notifications.posts_id = post.id WHERE notifications.receiver_id= ${id} ORDER BY notifications.id DESC`;
      const [notifications] = await connection.query(sql);
      return { success: true, data: notifications };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  }

  async readNotify() {
    let { id } = this.body;
    const update_at = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    try {
      let sql = `UPDATE notifications SET notifications.read = 1, update_at='${update_at}' WHERE id = ${id}`;
      await connection.query(sql);
      return { success: true, msg: "Update success" };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  }
};
