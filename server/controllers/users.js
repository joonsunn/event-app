const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");
const config = require("../utils/config");
const middleware = require("../utils/middleware");

usersRouter.get(
  "/",
  [
    middleware.tokenExtractor,
    middleware.userExtractor,
    middleware.adminGatekeeper,
  ],
  async (request, response) => {
    const users = await User.find({});
    return response.json(users);
  }
);

usersRouter.get(
  "/:id",
  [
    middleware.tokenExtractor,
    middleware.userExtractor,
    middleware.adminGatekeeper,
  ],
  async (request, response) => {
    const user = await User.findById(request.params.id);
    if (request.user.role !== "admin") {
      return response.status(401).json({ error: "unauthorized" }).end();
    }
    if (user) {
      response.json(user);
    } else {
      return response.status(404).end();
    }
  }
);

usersRouter.post("/", async (request, response) => {
  const { username, password, adminCode } = request.body;

  if (password.length < 3) {
    return response.status(401).json({
      error:
        "supplied password length less than minimum length of 3 characters",
    });
  }

  const canCreateAdmin = adminCode === config.ADMIN_SIGNUP_CODE;

  if (!canCreateAdmin || !adminCode) {
    return response.status(401).json({ error: "invalid admin code" }).end();
  }

  const role = "admin";

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    role,
  });

  const savedUser = await user.save();
  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
