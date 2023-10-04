const passport = require("passport");
const passportLocal = require("passport-local");
const userModel = require("../models/userModel");
const { hashPassword, isValidPassword } = require("../utils/passwordHash");

const LocalStrategy = passportLocal.Strategy;

const localStrategyRegister = 
passport.use( 
"register", 
new LocalStrategy( 
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    try {
      const exist = await userModel.findOne({ email: username }); 

      if (exist == null) {
        const body = req.body;
        body.password = hashPassword(body.password); 
        let user = await userModel.create(body);
        console.log(user);
        console.log(`Usuario ${username} creado correctamente`);
        return done(null, user);
      }

      console.log(`El usuario ${username} ya existe`);
      return done(null, false, {message:`El usuario ${username} ya existe`});
    } catch (e) {
      console.log("Error al leer la db");
      return done(e);
    }
  }
)
);

module.exports = localStrategyRegister;