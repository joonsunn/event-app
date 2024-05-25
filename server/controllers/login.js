const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/users");
const config = require("../utils/config");
// const middleware = require("../utils/middleware");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(userForToken, config.SECRET, {
    expiresIn: 60 * 60 * 24, // 1 day
  });

  return response.status(200).send({ token, username: user.username });
});

module.exports = loginRouter;
