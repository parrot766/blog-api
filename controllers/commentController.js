const comments = require("../models/comments");
const posts = require("../models/posts");
const jwt = require("jsonwebtoken");

async function getComments(req, res) {
  const { postUuid } = req.params;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const post = await posts.getPostByUuid(postUuid);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const postComments = await comments.getComments(post.id);

      res.json({ comments: postComments });
    }
  });
}

async function postComment(req, res) {
  const { postUuid } = req.params;
  const { content } = req.body;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const post = await posts.getPostByUuid(postUuid);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      await comments.createComment(content, data.user.id, post.id);

      return res.json({ message: "comment created successfully" });
    }
  });
}

async function putComment(req, res) {
  const { commentUuid } = req.params;
  const { newContent } = req.body;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const comment = await comments.getCommentByUuid(commentUuid);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const updatedComment = await comments.updateComment(
        commentUuid,
        newContent,
      );

      return res.json({ comment: updatedComment });
    }
  });
}

async function deleteComment(req, res) {
  const { commentUuid } = req.params;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const comment = await comments.getCommentByUuid(commentUuid);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      await comments.deleteComment(commentUuid);

      return res.json({ message: "comment deleted successfully" });
    }
  });
}

module.exports = {
  getComments,
  postComment,
  putComment,
  deleteComment,
};
