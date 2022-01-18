const connection = require("../util/database");

module.exports = class Location {
  constructor(body) {
    this.body = body;
  }
  //Tạo mới địa điểm
  async createLocation() {
    const {
      name,
      image_url,
      address,
      phone,
      opening_hours,
      lowest_price,
      biggest_price,
    } = this.body;
    try {
      let sql = `INSERT INTO locations (name,image_url,address,phone,opening_hours,lowest_price,biggest_price)
       VALUES ('${name}','${image_url}','${address}','${phone}','${opening_hours}','${lowest_price}',
       '${biggest_price}')`;

      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  //Tìm kiếm địa điểm
  async searchLocation() {
    const { value } = this.body;
    try {
      if (value.length > 0) {
        let sql = `SELECT id,name,image_url,address,phone,opening_hours,rating,lowest_price,biggest_price FROM locations WHERE name LIKE '%${value}%'`;
        return await connection.query(sql);
      }
      return null;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  //lấy địa điểm theo id
  async getLocationById() {
    const { id } = this.body;
    try {
      let sql = `SELECT id,name,image_url,address,phone,opening_hours,rating FROM locations WHERE id = ${id}  `;
      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  //Sửa location
  async updateLocation() {
    const {
      id,
      name,
      image_url,
      address,
      phone,
      opening_hours,
      lowest_price,
      biggest_price,
    } = this.body;
    try {
      let sql = `UPDATE locations SET name='${name}',image_url=${image_url}',address='${address}',phone='${phone}',opening_hours='${opening_hours}',lowest_price='${lowest_price}',biggest_price='${biggest_price}' WHERE id = ${id})`;

      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  //Lấy tất cả địa điểm
  async getAllLocation() {
    try {
      let sql = `SELECT id,name,image_url,address,phone,opening_hours,rating,lowest_price,biggest_price FROM locations`;
      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy địa điểm theo lượt đánh giá
  async getLocationByRatting() {
    try {
      let sql = `SELECT id,name,image_url,address,phone,opening_hours,rating FROM locations ORDER BY rating DESC `;
      return await connection.query(sql);
    } catch (error) {
      return error.sqlMessage;
    }
  }
  //Xóa địa điểm
  async deleteLocation() {
    const { id } = this.body;
    try {
      let sql = `DELETE FROM locations WHERE id= '${id}'`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  // Lấy địa điểm ghim trong bài viết
  async getLocationByPostId() {
    const { id } = this.body;
    try {
      let sql = `SELECT p.location_id,lc.name,lc.image_url,lc.address,lc.rating
      FROM post p
      LEFT JOIN locations lc ON lc.id=p.location_id
      WHERE p.id = '${id}'`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
  // Lấy địa điểm yêu thích

  async getFavoritesLocation() {
    try {
      let sql = `SELECT locations.id,locations.name, locations.image_url, SUM(post.rating)/COUNT(post.location_id) 
      AS rate, COUNT(post.rating) AS count, locations.address FROM locations LEFT JOIN post ON locations.id = post.location_id 
      GROUP BY locations.id ORDER BY COUNT(post.location_id) DESC LIMIT 10`;
      let data = await connection.query(sql);
      return await data[0];
    } catch (error) {
      return error.sqlMessage;
    }
  }
};
