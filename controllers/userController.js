const users = require("../models/users");
const jwt = require("jsonwebtoken");

async function getUser(req, res) {
  const { username } = req.params;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      const user = await users.getUserProfile(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user });
    }
  });
}

async function deleteUser(req, res) {
  const { username } = req.params;

  jwt.verify(req.token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      if (data.user.role != "admin") {
        return res.status(403).json({ error: "Forbiddden" });
      }

      const user = await users.getUserProfile(username);
      if (!user) {
        return res.status(404).json({ error: "User not found", data });
      }

      users.deleteUser(username);

      res.json({ message: "user deleted successfully" });
    }
  });
}

module.exports = {
  getUser,
  deleteUser,
};
