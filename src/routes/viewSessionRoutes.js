const { Router } = require("express");

const viewSessionRoutesFn = (io) => {
  const pagesFn = require("../controllers/sessionsViewControllers");

  const { register, login, recoveryPassword } = pagesFn(io);

  const router = Router();

  const sessionMiddleware = (req, res, next) => {  
    if (req.user) {  
      res.redirect("/realTimeProducts");
    }
    return next();
  };

  router.get("/register", sessionMiddleware, register); 

  router.get("/login", sessionMiddleware, login); 

  router.get("/recovery-password", recoveryPassword);

  return router;
};

module.exports = viewSessionRoutesFn;
