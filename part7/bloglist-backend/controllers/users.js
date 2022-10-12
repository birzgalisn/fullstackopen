const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const [user] = await User.find({ _id: req.params.id }).limit(1);

  if (user) {
    return res.json(user);
  }

  res.status(404).end();
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  await user.save();

  res.status(201).json(user);
});

module.exports = usersRouter;
