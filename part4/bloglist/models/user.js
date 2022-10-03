const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username missing"],
    unique: true,
    minLength: [3, "Name must be at least 3 characters long"],
  },
  name: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: [true, "Password hash missing"],
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.pre(/^find$/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "blogs",
    select: "_id title author url",
    options: { _recursed: true },
  });
  next();
});

userSchema.post("save", (err, doc, next) => {
  const { name, code } = err;
  if (name === "MongoServerError" && code === 11000) {
    const validationError = new mongoose.Error.ValidationError(null);
    validationError.addError(
      "username",
      new mongoose.Error.ValidatorError({
        message: "Username must be unique",
      })
    );
    return next(validationError);
  }
  next(err);
});

userSchema.set("toJSON", {
  transform: function (doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
