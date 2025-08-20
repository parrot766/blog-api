const { Router } = require("express");
const verifyToken = require("../middlewares/auth");
const {
  getComments,
  postComment,
  putComment,
  deleteComment,
} = require("../controllers/commentController");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", getComments);
commentsRouter.post("/", verifyToken, postComment);
commentsRouter.put("/:commentUuid", verifyToken, putComment);
commentsRouter.delete("/:commentUuid", verifyToken, deleteComment);

module.exports = commentsRouter;
