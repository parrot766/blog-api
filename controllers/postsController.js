const posts = require("../models/posts");
const jwt = require("jsonwebtoken");

async function getPosts(req, res) {
  const allPosts = await posts.getAllPosts();
  const publishedPosts = allPosts.filter((post) => post.isPublished);

  jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
    if (err || data.user.role !== "admin") {
      return res.json({ posts: publishedPosts });
    } else {
      return res.json({ posts: allPosts });
    }
  });
}

async function createPost(req, res) {
  const { title, content, isPublished } = req.body;

  jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      posts.createPost(title, content, isPublished, data.user.id);

      res.json({ message: "post created successfully" });
    }
  });
}

async function getPostByUuid(req, res) {
  const { postUuid } = req.params;

  const post = await posts.getPostByUuid(postUuid);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ post });
}

async function putPost(req, res) {
  const { postUuid } = req.params;
  const { title, content } = req.body;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const post = await posts.getPostByUuid(postUuid);
      if (!post) {
        return res.status(404).json({ error: "Not found" });
      }

      const updatedPost = await posts.updatePost(postUuid, title, content);

      res.json({ post: updatedPost });
    }
  });
}

async function deletePost(req, res) {
  const { postUuid } = req.params;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const post = await posts.getPostByUuid(postUuid);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      await posts.deletePost(postUuid);

      res.json({ message: "post deleted successfully" });
    }
  });
}

module.exports = {
  getPosts,
  createPost,
  getPostByUuid,
  putPost,
  deletePost,
};
