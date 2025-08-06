const prisma = require("../prisma/client");

async function getComments(postId) {
  return await prisma.comment.findMany({
    where: { postId },
    select: {
      uuid: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function getCommentByUuid(commentUuid) {
  return await prisma.comment.findUnique({
    where: { uuid: commentUuid },
    select: {
      uuid: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function createComment(content, authorId, postId) {
  return await prisma.comment.create({
    data: {
      postId,
      content,
      authorId,
    },
  });
}

async function updateComment(commentUuid, content) {
  return await prisma.comment.update({
    where: { uuid: commentUuid },
    data: { content },
    select: {
      uuid: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function deleteComment(commentUuid) {
  return await prisma.comment.delete({
    where: { uuid: commentUuid },
  });
}

module.exports = {
  getComments,
  getCommentByUuid,
  createComment,
  updateComment,
  deleteComment,
};
