const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment missing"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User missing"],
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: [true, "Blog missing"],
  },
});

commentSchema.pre("find", function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "user",
    select: "-blogs -comments",
    options: { _recursed: false },
  });
  next();
});

commentSchema.post("save", async function () {
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
      { $push: { comments: this._id } },
      { timestamps: false }
    ),
    await this.model("Blog").findOneAndUpdate(
      { _id: this.blog },
      { $push: { comments: this._id } },
      { timestamps: false }
    ),
  ]);
});

commentSchema.post("remove", async function () {
  await this.model("User").findOneAndUpdate(
    { _id: this.user },
    { $pull: { comments: this._id } },
    { timestamps: false }
  );
});

commentSchema.set("toJSON", {
  transform: function (doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
