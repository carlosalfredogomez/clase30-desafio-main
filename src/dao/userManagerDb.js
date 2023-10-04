const session = require("express-session");
const userModel = require("../models/userModel");
const { hashPassword } = require("../utils/passwordHash");
const passport = require("passport");

const initializePassport = require("../config/passportConfig")

class UserManagerDb {
  constructor(io) {
    this.io = io;
  }

  async getUser(email) {
    try {
      const user = await userModel.findOne({ email: email });
      return user;
    } catch (e) {
      console.log("Error al leer la db");
      return { status: 500, data: "Error al leer la db" };
    }
  }

  async createUser(data) {
    try {
      const exist = await this.getUser(data.email);
      data.password = hashPassword(data.password); 
      if (exist == null) {
        const user = await userModel.create(data);
        console.log(user);
        console.log(`Usuario ${data.email} creado correctamente`);
        return {
          status: 200,
          data: `Usuario ${data.email} creado correctamente`,
        };
      }
      return {
        status: 400,
        data: `El Usuario ${data.email} ya existe`,
      };
    } catch (e) {
      console.log("Error al leer la db");
      this.io.emit(
        "errorRegister",
        JSON.stringify({ error: 400, data: "Error al leer la db" })
      );
      return;
    }
  }

  async recoveryPassword(data) {
    try {
      console.log(data);
      const newPassword = hashPassword(data.password);
      console.log(newPassword)
      await userModel.updateOne( { email: data.email } , { password:newPassword }
      );
      console.log( `Usuario ${data.email}, cambio la contraseña satisfactiriamente`);
      return {
        status: 200,
        data: `Usuario ${data.email}, cambio la contraseña satisfactiriamente`,
      };
    } catch (e) {
      console.log("Error al leer la db");
      return { status: 500, data: "Error al leer la db" };
    }
  }

  
  
}

module.exports = { UserManagerDb };
