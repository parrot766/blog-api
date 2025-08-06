const { Router } = require("express");
const verifyToken = require("../middlewares/auth");
const {
  getPosts,
  createPost,
  getPostByUuid,
  putPost,
  deletePost,
} = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.get("/", verifyToken, getPosts);
postsRouter.post("/", verifyToken, createPost);
postsRouter.get("/:postUuid", verifyToken, getPostByUuid);
postsRouter.put("/:postUuid", verifyToken, putPost);
postsRouter.delete("/:postUuid", verifyToken, deletePost);

module.exports = postsRouter;
