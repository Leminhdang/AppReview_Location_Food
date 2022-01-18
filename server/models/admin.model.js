const connection = require("../util/database");

module.exports = class Admin {
  constructor(body) {
    this.body = body;
  }
  async getCount() {
    try {
      let sql = `SELECT COUNT(post.id) AS count FROM post`;
      let [posts_count] = await connection.query(sql);
      sql = `SELECT COUNT(locations.id) AS count FROM locations`;
      let [locations_count] = await connection.query(sql);
      sql = `SELECT COUNT(users.id) AS count FROM users`;
      let [users_count] = await connection.query(sql);
      sql = `SELECT COUNT(voucher_store.id) AS count FROM voucher_store`;
      let [voucher_store] = await connection.query(sql);

      return {
        posts_count: posts_count[0].count,
        locations_count: locations_count[0].count,
        users_count: users_count[0].count,
        voucher_store: voucher_store[0].count,
      };
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async loginAdmin() {
    const { username, password } = this.body;
    try {
      let sql = `SELECT email,hash FROM identity WHERE email = '${username}'`;
      let [admin] = await connection.query(sql);
      if (admin.length > 0) {
        if (password === admin[0].hash) {
          return { success: true };
        }
        return "Mật khẩu không chính xác";
      }
      return "Tên đăng nhâp không chính xác";
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async getAllPostLike() {
    try {
      let sql = `SELECT post.id as post_id,users.id as user_id,users.avatar, users.fullname,post.title, post.content,images.image_url,
      (select count(*) from likes where post_id = post.id) as TotalLikes,post.location_id,post.create_at
      FROM post 
      LEFT JOIN images on images.post_id = post.id 
      LEFT JOIN users on users.id = post.user_id 
      
      GROUP by post.id 
      ORDER  BY TotalLikes  DESC`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async getPostReport() {
    try {
      let sql = `SELECT pr.id, pr.sender_id,us.fullname, us.avatar, pr.content,pr.status,lc.address,pr.receiver_id, u.fullname as peoplePost,p.id as postId,
      (select count(*) from likes where post_id = p.id) as TotalLikes, 
      pr.cause,pr.create_at AS create_at_report,p.title,p.content as content_post,p.hashtag,p.rating,p.location_id,p.create_at,images.image_url FROM posts_report pr 
      LEFT JOIN users us ON pr.sender_id = us.id 
      LEFT JOIN post p ON pr.post_id = p.id
      LEFT JOIN images ON images.post_id = pr.post_id
      LEFT JOIN locations lc ON lc.id=p.location_id
      LEFT JOIN users u ON pr.receiver_id = u.id
      
    
      
      GROUP BY images.post_id
      `;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async updateStatusPostRepost() {
    const { id } = this.body;
    try {
      let sql = `UPDATE posts_report SET status=1 WHERE id=${id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
  async getNotificationReport() {
    try {
      let sql = `SELECT n.sender_id, n.receiver_id, n.type, n.create_at, n.posts_id,post.title,post.id,users.fullname,images.image_url,post.content as content_post,post.location_id,lc.address,post.create_at,
      u.fullname as peoplePost,users.avatar,posts_report.id as idReport,posts_report.status,
      (select count(*) from likes where post_id = post.id) as TotalLikes, 
      posts_report.cause FROM notifications n
            LEFT JOIN post on post.id = n.posts_id
            LEFT JOIN posts_report on posts_report.post_id = n.posts_id
            LEFT JOIN users ON users.id = n.sender_id
            LEFT JOIN images ON images.post_id = n.posts_id
            LEFT JOIN locations lc ON lc.id = post.location_id
            LEFT JOIN users u ON n.receiver_id = u.id
            WHERE type="report"
            GROUP BY images.post_id
      `;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return false;
    }
  }
};
