const connection = require("../util/database");
module.exports = class Post {
  constructor(body) {
    this.body = body;
  }
  async createPost() {
    const {
      user_id,
      title,
      content,
      hashtag,
      rating,
      image,
      video,
      location_id,
    } = this.body;
    try {
      let sql = `INSERT INTO post (user_id,title,content,hashtag,rating,location_id) 
      VALUES (${user_id},'${title}','${content}','${hashtag}',${rating},${
        location_id ? location_id : null
      })`;
      await connection.query(sql);
      sql = `SELECT id FROM post ORDER BY id DESC LIMIT 1`;
      let [rows] = await connection.query(sql);
      if (image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          sql = `INSERT INTO images (post_id,image_url) 
            VALUES (${rows[0].id},'${image[i]}')`;
          await connection.query(sql);
        }
      }
      if (video.length > 0) {
        for (let i = 0; i < video.length; i++) {
          sql = `INSERT INTO videos (post_id,video_url,thumbnail) 
            VALUES (${rows[0].id},'${video[i].url}','${video[i].thumbnail}')`;
          await connection.query(sql);
        }
      }
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async searchPost() {
    const { value } = this.body;
    try {
      let sql = `SELECT p.id, p.user_id,us.fullname AS name_user, us.avatar, p.title AS title_post, 
      p.content, p.hashtag,p.rating AS rate_post,
      img.image_url AS image_post, video.video_url,p.location_id,p.create_at,
      lc.name AS location_name,lc.image_url AS location_image,lc.address
      FROM post p 
      LEFT JOIN locations lc ON p.location_id = lc.id 
      LEFT JOIN users us ON p.user_id = us.id 
      LEFT JOIN images img ON p.id = img.post_id 
      LEFT JOIN videos video ON video.post_id = p.id WHERE title LIKE '%${value}%' OR hashtag LIKE '%${value}%'`;
      let data = await connection.query(sql);
      return data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy tất cả bài viết trong trang home
  async getAllPosts() {
    try {
      let sql = `SELECT post.id as post_id,users.id as user_id,users.avatar, users.fullname,post.title, post.content,images.image_url,
      (select count(*) from likes where post_id = post.id) as TotalLikes, post.location_id,post.create_at
      FROM post LEFT JOIN images on images.post_id = post.id LEFT JOIN users on users.id = post.user_id GROUP by post.id`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  //Lấy tất cả video
  async getVideoByPosts() {
    try {
      let sql = `SELECT p.id, p.user_id,us.fullname AS name_user, us.avatar, p.title AS title_post,p.create_at,p.content AS content_post,video.video_url AS video_post,p.create_at FROM post p 
      LEFT JOIN users us ON p.user_id = us.id 
      LEFT JOIN videos video ON video.post_id = p.id WHERE video.video_url IS NOT NULL`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy bài viết theo thời gian gần nhất
  async getPostsSortByDate() {
    try {
      let sql = `SELECT post.id as post_id,users.id as user_id,users.avatar, post.title, post.content,images.image_url,
      (select count(*) from likes where post_id = post.id) as TotalLikes, post.location_id,post.create_at
      FROM post LEFT JOIN images on images.post_id = post.id LEFT JOIN users on users.id = post.user_id GROUP by post.id
      ORDER BY post.create_at DESC
      LIMIT 5`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy bài viết theo lượt yêu thích
  async getPostsSortByHeart() {
    try {
      let sql = `SELECT post.id as post_id,users.id as user_id,users.avatar, post.title, post.content,images.image_url,
      (select count(*) from likes where post_id = post.id) as TotalLikes, post.location_id,post.create_at
      FROM post LEFT JOIN images on images.post_id = post.id LEFT JOIN users on users.id = post.user_id GROUP by post.id  
      ORDER BY TotalLikes DESC`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }

  // Lấy bài viết đã đăng
  async getPostsByUserId() {
    const { id } = this.body;
    try {
      let sql = `SELECT post.id as post_id,users.id as user_id,users.avatar, users.fullname,post.title, post.content,images.image_url,
      (select count(*) from likes where post_id = post.id) as TotalLikes, post.location_id,post.create_at
      FROM post LEFT JOIN images on images.post_id = post.id LEFT JOIN users on users.id = post.user_id WHERE users.id = ${id} 
      GROUP by images.post_id 
     `;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy bài viết đã lưu
  async getPostsSaveByUserId() {
    const { id } = this.body;
    try {
      let sql = `SELECT p.id AS post_id, p.title , p.content ,p.rating ,img.image_url,
      video.video_url,p.create_at,p.location_id,us.id AS user_id FROM post p LEFT JOIN users us ON p.user_id = us.id LEFT JOIN images img 
      ON p.id = img.post_id LEFT JOIN videos video ON video.post_id = p.id LEFT JOIN posts_save 
      ON posts_save.post_id = p.id WHERE posts_save.user_id = ${id};
      `;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async getPostsByLocation() {
    const { id } = this.body;
    try {
      let sql = `SELECT p.id, p.user_id,us.fullname AS name_user, us.avatar, p.title AS title_post, 
      (select count(*) from likes where post_id = p.id) as TotalLikes,
      p.content, p.hashtag,p.rating AS rate_post,img.image_url AS image_post, video.video_url,p.location_id,p.create_at,
      lc.name AS location_name,lc.image_url AS location_image,lc.address
      FROM post p 
      LEFT JOIN locations lc ON p.location_id = lc.id 
      LEFT JOIN users us ON p.user_id = us.id 
      LEFT JOIN images img ON p.id = img.post_id 
      LEFT JOIN videos video ON video.post_id = p.id
      WHERE lc.id = ${id}`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy tất cả hình ảnh trong 1 bài viết
  async getImageByPostId() {
    const { id } = this.body;
    try {
      let sql = `SELECT images.image_url AS url, images.post_id FROM images LEFT JOIN post ON images.post_id = post.id 
      WHERE images.post_id =${id}`;
      let [data] = await connection.query(sql);
      return await data;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Chỉnh sửa bài viết
  async updatePost() {
    const { id, title, hashtag, rating, location_id, update_at, content } =
      this.body;
    try {
      let sql = `UPDATE post SET title='${title}',hashtag='${hashtag}',rating=${rating},
      location_id=${location_id},update_at='${update_at}',content='${content}' WHERE id=${id} `;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  // Xoá bài viết
  async deletePosts() {
    const { id } = this.body;
    try {
      let sql = `DELETE FROM post WHERE id=${id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy chi tiết bài viết
  async getPostsById() {
    const { id } = this.body;
    try {
      let sql = `SELECT p.id,p.user_id,p.title,p.content,p.rating,us.fullname,p.location_id,
      p.create_at,us.avatar FROM post p
      LEFT JOIN users us ON p.user_id = us.id 
      WHERE p.id = ${id}`;
      let [data] = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy đánh giá trung bình + số lượng đánh giá
  async getCountAndRating() {
    const { id } = this.body;
    try {
      let sql = `SELECT SUM(post.rating)/COUNT(post.id) AS rating, COUNT(post.id) AS count,locations.name,
      locations.name,locations.image_url ,locations.address
      FROM post LEFT JOIN locations ON post.location_id = locations.id WHERE post.id = ${id}`;
      let [data] = await connection.query(sql);
      console.log(data);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  //report
  async reportPost() {
    const { post_id, receiver_id, sender_id, cause, content } = this.body;
    try {
      if (post_id > 0 && receiver_id > 0 && sender_id > 0) {
        let sql = `INSERT INTO posts_report(post_id, receiver_id, sender_id, content, cause) VALUES (${post_id},${receiver_id},${sender_id},'${content}','${cause}')`;
        await connection.query(sql);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async checkPostSaveByUserId() {
    const { post_id, user_id } = this.body;
    try {
      if (post_id > 0 && user_id > 0) {
        let sql = `SELECT id, user_id, post_id FROM posts_save WHERE post_id = ${post_id} and user_id = ${user_id}`;
        let [data] = await connection.query(sql);
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async savePost() {
    const { post_id, user_id } = this.body;
    try {
      if (post_id > 0 && user_id > 0) {
        let sql = `INSERT INTO posts_save(user_id, post_id) VALUES (${user_id},${post_id})`;
        await connection.query(sql);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async deletePostSave() {
    const { post_id, user_id } = this.body;
    try {
      if (post_id > 0 && user_id > 0) {
        let sql = `DELETE FROM posts_save WHERE user_id = ${user_id} and post_id = ${post_id}`;
        await connection.query(sql);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getVideoByPostId() {
    const { id } = this.body;
    try {
      let sql = `SELECT videos.video_url AS url,videos.thumbnail,videos.post_id FROM videos LEFT JOIN post ON videos.post_id = post.id 
      WHERE videos.post_id =${id}`;
      let [data] = await connection.query(sql);
      return await data;
    } catch (error) {
      return error.sqlMessage;
    }
  }
};
