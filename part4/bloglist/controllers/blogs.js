const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const [blog] = await Blog.find({ _id: req.params.id }).limit(1);

  if (blog) {
    return res.json(blog);
  }

  res.status(404).end();
});

blogsRouter.post("/", async (req, res) => {
  const { body, user } = req;

  const blog = new Blog({ ...body, user });
  await blog.save();

  res.status(201).json(blog);
});

blogsRouter.put("/:id", async (req, res) => {
  const { body, user } = req;

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...body, user },
    { new: true }
  );

  res.json(blog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).end();
  } else if (blog.user.toString() !== req.user.toString()) {
    return res.status(401).json({ error: "Not the owner" });
  }

  await blog.remove();

  res.status(204).end();
});

module.exports = blogsRouter;
