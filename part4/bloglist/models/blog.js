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
});

blogSchema.pre("find", function (next) {
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

blogSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc.populated("user")) {
    await doc.populate({ path: "user", select: "-blogs" });
  }
});

blogSchema.post("save", async function () {
  await Promise.all([
    await new Promise((resolve) => {
      if (!this.populated("user")) {
        return resolve(this.populate({ path: "user", select: "-blogs" }));
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
  await this.model("User").findOneAndUpdate(
    { _id: this.user },
    { $pull: { blogs: this._id } },
    { timestamps: false }
  );
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
