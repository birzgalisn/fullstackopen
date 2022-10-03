const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const [blog, ...rest] = blogs;

  if (!blog) {
    return 0;
  } else if (!rest.length) {
    return blog.likes;
  }

  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  const [blog, ...rest] = blogs;

  if (!blog) {
    return {};
  } else if (!rest.length) {
    return blog;
  }

  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b), blog);
};

const mostBlogs = (blogs) => {
  const byAuthor = _.countBy(blogs, "author");

  const result = _.map(byAuthor, (value, key) => ({
    author: key,
    blogs: value,
  }));

  return _.maxBy(result, "blogs");
};

const mostLikes = (blogs) => {
  const byAuthor = _.groupBy(blogs, "author");

  const result = _.map(byAuthor, (value, key) => {
    const likes = _.sumBy(value, "likes");
    return { author: key, likes };
  });

  return _.maxBy(result, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
