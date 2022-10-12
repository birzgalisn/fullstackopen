const blogs = require("./data/blogs");
const User = require("../models/user");
const Blog = require("../models/blog");

const initialBlogs = blogs.map((blog) => ({
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes,
}));

const nonExistingId = async () => {
  const [firstBlog] = initialBlogs;
  const blog = new Blog({ ...firstBlog, user: "6339ea2464bcd971094ab062" });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
