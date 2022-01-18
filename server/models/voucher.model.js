const connection = require("../util/database");
async function checkVoucher(id) {
  try {
    let sql = `SELECT id, title from voucher_store WHERE id = ${id}`;
    let [data] = await connection.query(sql);
    return await data;
  } catch (error) {
    return error.sqlMessage;
  }
}
module.exports = class Voucher {
  constructor(body) {
    this.body = body;
  }
  async getAllVoucher() {
    try {
      let sql = `SELECT id, title, detail, coins, amount_used, code, expiry_date, store_image, voucher_image, create_at, update_at,
      (select count(*) from voucher_wallet where voucher_id = voucher_store.id) as TotalVoucher FROM voucher_store`;
      let [data] = await connection.query(sql);
      return await data;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getVoucherById() {
    const { id } = this.body;
    try {
      let sql = `SELECT id, title, detail, coins, amount_used, code, expiry_date, store_image, voucher_image, create_at, update_at FROM voucher_store WHERE id = ${id}`;
      let [data] = await connection.query(sql);
      return await data;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  async createVoucher() {
    const {
      title,
      detail,
      amount,
      amount_used,
      code,
      expiry_date,
      store_image,
      voucher_image,
    } = this.body;
    try {
      if (
        title.length > 0 ||
        detail.length > 0 ||
        amount.length > 0 ||
        amount_used.length > 0 ||
        code.length > 0 ||
        expiry_date.length > 0 ||
        store_image.length > 0 ||
        voucher_image.length > 0
      ) {
        let sql = `INSERT INTO voucher_store( title, detail, coins, amount_used, code, expiry_date, store_image, voucher_image) VALUES ( 
            '${title}','${detail}','${amount}','${amount_used}','${code}','${expiry_date}','${store_image}','${voucher_image}')`;
        return await connection.query(sql);
      }
      return null;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async editVoucher() {
    const {
      id,
      title,
      detail,
      amount,
      amount_used,
      code,
      expiry_date,
      store_image,
      voucher_image,
    } = this.body;
    try {
      if (
        id > 0 ||
        title.length > 0 ||
        detail.length > 0 ||
        amount.length > 0 ||
        amount_used.length > 0 ||
        code.length > 0 ||
        expiry_date.length > 0 ||
        store_image.length > 0 ||
        voucher_image.length > 0
      ) {
        let check = await checkVoucher(id);
        if (check.length > 0) {
          var dateNow = new Date().toISOString().split("T")[0];
          let sql = `
            UPDATE voucher_store SET title='${title}',detail='${detail}',coins='${amount}',amount_used='${amount_used}',code='${code}',expiry_date='${expiry_date}',store_image='${store_image}',voucher_image='${voucher_image}',update_at= '${dateNow}' WHERE id='${id}'`;
          return await connection.query(sql);
        } else {
          return false;
        }
      }
      return null;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async deleteVoucher() {
    const { id } = this.body;
    try {
      if (id > 0) {
        let check = await checkVoucher(id);
        if (check.length > 0) {
          let sql = `DELETE FROM voucher_store WHERE id = ${id}`;
          return await connection.query(sql);
        }
        return false;
      }
      return null;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async redeemVouchers() {
    const { voucher_id, user_id, coins } = this.body;
    try {
      if (user_id > 0 && voucher_id > 0 && coins > 0) {
        let check = await checkVoucher(voucher_id);
        if (check.length > 0) {
          let sql = `INSERT INTO voucher_wallet( voucher_id, user_id) VALUES (${voucher_id}, ${user_id})`;
          await connection.query(sql);
          return true;
        }
        return false;
      }
      return null;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async checkRedeemVoucher() {
    const { voucher_id, user_id } = this.body;
    try {
      if (user_id > 0 && voucher_id > 0) {
        let check = await checkVoucher(voucher_id);
        if (check.length > 0) {
          let sql = `SELECT id,  status FROM voucher_wallet WHERE voucher_id =  ${voucher_id} AND user_id = ${user_id}`;
          let [data] = await connection.query(sql);
          if (data.length > 0) {
            return true;
          }
          return false;
        }
        return false;
      }
      return null;
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async getVoucherByStatus() {
    const { status, user_id } = this.body;
    try {
      if (user_id > 0) {
        let sql = `SELECT vw.id,vw.voucher_id,vw.status,vs.title,vs.detail,vs.coins, vs.amount_used, vs.code, vs.expiry_date, vs.store_image, vs.voucher_image FROM voucher_wallet vw LEFT JOIN voucher_store vs ON vs.id = vw.voucher_id WHERE  status =${status} AND user_id = ${user_id}`;
        let [data] = await connection.query(sql);
        return await data;
      } else {
        return null;
      }
    } catch (error) {
      return error.sqlMessage;
    }
  }
  async updateStatus() {
    const { id } = this.body;
    try {
      if (id > 0) {
        let sql = `UPDATE voucher_wallet SET status = 1 WHERE id =  ${id}`;
        await connection.query(sql);
        return true;
      } else {
        return null;
      }
    } catch (error) {
      return error.sqlMessage;
    }
  }
};
