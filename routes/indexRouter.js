const { Router } = require("express");
const {
  getIndex,
  postSignup,
  postLogin,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getIndex);
indexRouter.post("/signup", postSignup);
indexRouter.post("/login", postLogin);

module.exports = indexRouter;
