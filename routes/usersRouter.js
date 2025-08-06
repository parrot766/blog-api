const { Router } = require("express");
const verifyToken = require("../middlewares/auth");
const { getUser, deleteUser } = require("../controllers/userController");

const usersRouter = Router();

usersRouter.get("/:username", verifyToken, getUser);
usersRouter.delete("/:username", verifyToken, deleteUser);

module.exports = usersRouter;
