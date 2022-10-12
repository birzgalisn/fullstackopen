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
    required: [true, "Url missing"],
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

blogSchema.pre("find", function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "user",
    select: "-blogs -comments",
    options: { _recursed: true },
  });
  this.populate({
    path: "comments",
    select: "-blog",
    options: { _recursed: false },
  });
  next();
});

blogSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc.populated("user")) {
    await doc.populate({ path: "user", select: "-blogs -comments" });
  }
});

blogSchema.post("save", async function () {
  await Promise.all([
    await new Promise((resolve) => {
      if (!this.populated("user")) {
        return resolve(
          this.populate({ path: "user", select: "-blogs -comments" })
        );
      }
      resolve();
    }),
    await this.model("User").findOneAndUpdate(
      { _id: this.user },
      { $push: { blogs: this._id } },
      { timestamps: false }
    ),
  ]);
});

blogSchema.post("remove", async function () {
  await Promise.all([
    await this.model("User").findOneAndUpdate(
      { _id: this.user },
      { $pull: { blogs: this._id } },
      { timestamps: false }
    ),
    await this.model("Comment").deleteMany({ blog: this._id }),
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
