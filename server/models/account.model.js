const connection = require("../util/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const message = require("../util/html");
const { v4: uuidv4 } = require("uuid");

module.exports = class Account {
  constructor(body) {
    this.body = body;
  }

  async getUser(uid, email) {
    let sql = "";
    if (email)
      sql = `SELECT identity.email,identity.hash, users.fullname,users.avatar,users.id 
      FROM identity LEFT JOIN users 
      ON identity.id = users.identity_id WHERE identity.email = '${email}' LIMIT 1`;
    else
      sql = `SELECT identity.email,identity.hash, users.fullname,users.avatar,users.id 
      FROM identity LEFT JOIN users 
      ON identity.id = users.identity_id WHERE identity.hash = '${uid}' LIMIT 1`;
    const [data] = await connection.query(sql);
    if (data.length > 0) return data[0];
    return null;
  }

  async getUserId(identity_id) {
    let sql = `SELECT id, fullname,avatar FROM users WHERE identity_id = ${identity_id}`;
    return await connection.query(sql);
  }

  async createUserAccount() {
    const { email, password, token } = this.body;
    console.log("token", token);
    const hash = await bcrypt.hash(password, saltRounds);
    try {
      if (await this.getUser(-1, email))
        return { success: false, msg: "Email đã được sử dụng" };
      let sql = `INSERT INTO identity (email,hash,method) VALUES ('${email}','${hash}','local')`;
      await connection.query(sql);
      sql = `SELECT id FROM identity ORDER BY id DESC LIMIT 1`;
      let [rows] = await connection.query(sql);
      const fullname = email.slice(0, email.indexOf("@"));
      sql = `INSERT INTO users (identity_id, fullname) VALUES ('${rows[0].id}','${fullname}')`;
      await connection.query(sql);
      return { success: true, msg: "Đăng ký thành công" };
    } catch (error) {
      return { success: false, msg: error.sqlMessage };
    }
  }
  async socialAuth() {
    const { uid, fullname, image_url, method } = this.body;
    try {
      const user = await this.getUser(uid);
      if (user) {
        return { success: true, msg: { user } };
      }
      let sql = `INSERT INTO identity (hash,method) VALUES ('${uid}','${method}')`;
      await connection.query(sql);
      sql = `SELECT id FROM identity ORDER BY id DESC LIMIT 1`;
      let [rows] = await connection.query(sql);
      sql = `INSERT INTO users (identity_id,fullname,avatar) VALUES ('${rows[0].id}','${fullname}','${image_url}')`;
      await connection.query(sql);
      sql = `SELECT LAST_INSERT_ID() AS id `;
      const [[id]] = await connection.query(sql);
      return {
        success: true,
        msg: { user: { id: id.id, fullname, avatar: image_url, method } },
      };
    } catch (error) {
      return { success: false, msg: error.sqlMessage };
    }
  }

  async loginWithUserName() {
    const { email, password } = this.body;
    try {
      const user = await this.getUser(-1, email);

      if (user) {
        const check = await bcrypt.compare(password, user.hash);
        if (check) {
          return { success: true, msg: { user } };
        }
        return { success: false, msg: "Mật khẩu không chính xác" };
      }
      return { success: false, msg: "Tài khoản không tồn tại" };
    } catch (error) {
      return { success: false, msg: error.sqlMessage };
    }
  }

  async changePassword() {
    const { id, oldPassword, newPassword } = this.body;
    try {
      let sql = `SELECT hash FROM identity WHERE id = ${id}`;
      const [user] = await connection.query(sql);
      if (user) {
        const check = await bcrypt.compare(oldPassword, user[0].hash);
        if (check) {
          const hash = await bcrypt.hash(newPassword, saltRounds);
          try {
            sql = `UPDATE identity SET hash = '${hash}' WHERE id = ${id}`;
            await connection.query(sql);
            return true;
          } catch (error) {
            return error.sqlMessage;
          }
        }
        return "Mật khẩu cũ không đúng";
      }
      return "User is not exits";
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async sendEmail() {
    const { email } = this.body;
    let code = uuidv4();
    code = code.slice(0, 6).toUpperCase();
    try {
      let sql = `SELECT id, email FROM identity WHERE email = '${email}' LIMIT 1`;
      const [user] = await connection.query(sql);
      if (user.length > 0) {
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          service: "gmail",
          auth: {
            user: "quoctungdev.test@gmail.com", // generated ethereal user
            pass: "26062000Aa", // generated ethereal password
          },
        });
        await transporter.sendMail({
          from: '"Radar Food " <quoctungdev.test@gmail.com>', // sender address
          to: `${email}`, // list of receivers
          subject: "Yêu cầu lấy lại mật khẩu", // Subject line
          html: message.message(code), // html body
        });
        const save = await this.saveCode(user[0].id, code);
        if (save === true)
          return {
            success: true,
            msg: "Mã OTP đã được gửi về email của bạn",
            data: { id: user[0].id },
          };
        return save;
      }
      return { success: false, msg: "Địa chỉ email không chính xác" };
    } catch (error) {
      return { success: false, msg: error.sqlMessage };
    }
  }

  async saveCode(id, code) {
    try {
      let sql = `UPDATE reset_password SET status = 0 WHERE identity_id = ${id}`;
      await connection.query(sql);
      sql = `INSERT INTO reset_password (identity_id,code) VALUES (${id},'${code}')`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async verifyCode() {
    const { id, code } = this.body;
    try {
      let sql = `SELECT id,code FROM reset_password WHERE identity_id = ${id} 
      AND create_at > now() - INTERVAL 2 minute AND status = 1`;
      const [result] = await connection.query(sql);
      if (result.length > 0) {
        if (code === result[0].code) {
          sql = `UPDATE reset_password SET status = 0 WHERE code = '${code}'`;
          try {
            await connection.query(sql);
            return true;
          } catch (error) {
            return error.sqlMessage;
          }
        }
        return "Mã OTP không chính xác";
      }
      return "Mã OTP đã hết hạn vui lòng nhận lại mã mới";
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async resetPassword() {
    const { id, password } = this.body;
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      let sql = `UPDATE identity SET hash = '${hash}' WHERE id = ${id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async deleteUser() {
    const { id } = this.body;
    try {
      let sql = `DELETE FROM identity WHERE id = ${id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async updateStatus() {
    const { id } = this.body;
    try {
      let sql = `UPDATE identity SET Status = 0 WHERE id = ${id}`;
      await connection.query(sql);
      return true;
    } catch (error) {
      return error.sqlMessage;
    }
  }
};
