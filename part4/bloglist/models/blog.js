const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title missing"],
  },
  author: {
    type: String,
    required: [true, "Author missing"],
  },
  url: {
    type: String,
    requried: [true, "Url missing"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User missing"],
  },
});

blogSchema.pre(/^find$/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "user",
    select: "_id username name",
    options: { _recursed: true },
  });
  next();
});

blogSchema.post("save", function (blog) {
  Promise.all([
    this.model("User").findOneAndUpdate(
      { _id: blog.user },
      { $push: { blogs: blog._id } },
      { timestamps: false }
    ),
  ]);
});

blogSchema.post("remove", function (blog) {
  Promise.all([
    this.model("User").findOneAndUpdate(
      { _id: blog.user },
      { $pull: { blogs: blog._id } },
      { timestamps: false }
    ),
  ]);
});

blogSchema.set("toJSON", {
  transform: function (doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
