const { Router } = require("express");
const { postSignup, postLogin } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.post("/signup", postSignup);
indexRouter.post("/login", postLogin);

module.exports = indexRouter;
