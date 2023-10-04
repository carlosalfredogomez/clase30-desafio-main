const { UserManagerDb } = require("../dao/userManagerDb");
const { isValidPassword } = require("../utils/passwordHash");

const pagesFn = (io) => {
  const manager = new UserManagerDb(io);
  const register = async (req, res) => {
  };

  const loginPost = async (req, res) => {
    return res.redirect("/realTimeProducts")
  };

  const registerPost = async (req, res) => {
    return res.redirect("/login")
  };

  const registerDelete = async (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        console.log("Se destruyo la sesion");
        res.json({ status: 200, data: "Se destruyo la sesion" });
      } else {
        res.send(err);
      }
    });
  };

  const resetPassword = async (req, res) => {
    const data = req.body;
    let response = await manager.getUser(data.email);
    if (response == null) {
      console.log(`El usuario ${data.email} no existe`);
      res.json({
        status: 400,
        data: `El usuario ${data.email} no existe`,
      });
      return;
    }
    let responseRecovery = await manager.recoveryPassword(data);
    console.log(responseRecovery);
    res.json(responseRecovery);
  };

  return {
    register,
    registerPost,
    loginPost,
    registerDelete,
    resetPassword,
  };
};

module.exports = pagesFn;
