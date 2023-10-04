const passport = require("passport");
const passportLocal = require("passport-local");
const userModel = require("../models/userModel");
const GitHubStrategy = require("passport-github2")

const githubStrategy = 
passport.use("github", new GitHubStrategy( 
    { 
      clientID:"Iv1.60312c44dbb83c65",
      clientSecret:"103d6a1e8d8691c19f60cd265dbd13625bf19e86",
      callbackURL:"http://localhost:8080/api/loginGithub-callback"
    }, 
    async (accessToken, refreshToken, profile, done) => { 
      try {
        console.log(profile) 
        let user = await userModel.findOne({username:profile.username}) 
        console.log(user)
        if(user){
          console.log(`El usuario ${profile.username} ya existe`)
          return done(null,user)
        }

        console.log(`El usuario ${profile.username} no existe`)
        newUser = {
          username : profile.username,
          name : profile._json.name
        }
        await userModel.create(newUser)
        return done(null,newUser)
        } catch (e) {
        console.log("Error al leer la db");
        return done(e);
      }
    }
  )
);

module.exports = githubStrategy;
