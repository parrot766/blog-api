const users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function getIndex(req, res) {
  res.json({ message: "hello" });
}

async function postSignup(req, res) {
  const { name, email, password } = req.body;

  const userExists =
    (await users.getUserByName(name)) || (await users.getUserByEmail(email));
  if (userExists) {
    return res.status(409).json({ error: "user already exists" });
  }

  await users.createUser(name, email, password);

  res.json({ message: "user created successfully" });
}

async function postLogin(req, res) {
  const { name, password } = req.body;

  const user = await users.getUserByName(name);
  if (!user) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
    res.json({ token });
  });
}

module.exports = {
  getIndex,
  postSignup,
  postLogin,
};
