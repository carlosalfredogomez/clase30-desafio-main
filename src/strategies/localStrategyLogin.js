const passport = require("passport");
const passportLocal = require("passport-local");
const userModel = require("../models/userModel");
const { hashPassword, isValidPassword } = require("../utils/passwordHash");

const LocalStrategy = passportLocal.Strategy;

const localStrategyLogin = 
passport.use("login", new LocalStrategy( 
    { usernameField: "email" }, 
    async (username, password, done) => {
      try {
        let user = await userModel.findOne({email:username});
        if (user == null) {
          console.log(`Usuario es invalido`);
          return done(null,false,{message:`Datos incorrectos`})
        }
        if (!isValidPassword(password, user.password)) {
          console.log(`Contraseña invalida`);
          return done(null,false,{message:`Contraseña invalida`})
        }
        console.log(`${user.email} a iniciado sesion`);
        user = user.toObject(); 
        delete user.password; 
        return done(null,user)
        } catch (e) {
        console.log("Error al leer la db");
        return done(e);
      }
    }
  )
);

module.exports = localStrategyLogin;