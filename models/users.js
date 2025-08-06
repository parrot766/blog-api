const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");

async function createUser(name, email, password) {
  await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    },
  });
}

async function getUserByName(name) {
  return await prisma.user.findUnique({
    where: { name },
  });
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function getUserProfile(username) {
  return await prisma.user.findUnique({
    where: { name: username },
    select: {
      name: true,
      posts: {
        select: {
          uuid: true,
          title: true,
          content: true,
          createdAt: true,
          isPublished: true,
        },
      },
      comments: {
        select: {
          uuid: true,
          content: true,
          post: {
            select: {
              uuid: true,
              title: true,
            },
          },
        },
      },
    },
  });
}

async function deleteUser(username) {
  await prisma.user.delete({
    where: { name: username },
  });
}

module.exports = {
  createUser,
  getUserByName,
  getUserByEmail,
  getUserProfile,
  deleteUser,
};
