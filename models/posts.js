const prisma = require("../prisma/client");

async function getAllPublishedPosts() {
  return await prisma.post.findMany({
    where: { isPublished: true },
    select: {
      uuid: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

async function getAllPosts() {
  return await prisma.post.findMany({
    select: {
      uuid: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      isPublished: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

async function createPost(title, content, isPublished, authorId) {
  return await prisma.post.create({
    data: {
      title,
      content,
      isPublished,
      authorId,
    },
  });
}

async function getPostByUuid(postUuid) {
  return await prisma.post.findUnique({
    where: { uuid: postUuid },
    select: {
      id: true,
      uuid: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

async function updatePost(postUuid, title, content, isPublished) {
  return await prisma.post.update({
    where: { uuid: postUuid },
    data: {
      title,
      content,
      isPublished,
    },
    select: {
      uuid: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

async function deletePost(postUuid) {
  return await prisma.post.delete({
    where: { uuid: postUuid },
  });
}

module.exports = {
  getAllPublishedPosts,
  createPost,
  getPostByUuid,
  updatePost,
  deletePost,
  getAllPosts,
};
