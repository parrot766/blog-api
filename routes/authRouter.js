const { Router } = require("express");
const { postSignup, postLogin } = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/signup", postSignup);
authRouter.post("/login", postLogin);

module.exports = authRouter;
