const { Router } = require("express");
const {
  getIndex,
  createUser,
  postLogin,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getIndex);
indexRouter.post("/signup", createUser);
indexRouter.post("/login", postLogin);

module.exports = indexRouter;
