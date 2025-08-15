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

postsRouter.get("/", getPosts);
postsRouter.post("/", verifyToken, createPost);
postsRouter.get("/:postUuid", getPostByUuid);
postsRouter.put("/:postUuid", verifyToken, putPost);
postsRouter.delete("/:postUuid", verifyToken, deletePost);

module.exports = postsRouter;
