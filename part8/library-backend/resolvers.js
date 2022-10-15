const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

const SECRET = process.env.SECRET;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;

      const findBookAuthor = (name, callback) =>
        Author.findOne({ name }, { _id: 1 }, callback);

      const books =
        author && genre
          ? findBookAuthor(new RegExp(author, "i"), (err, author) =>
              Book.find({ author, genres: { $in: genre } })
            )
          : author
          ? findBookAuthor(new RegExp(author, "i"), (err, author) =>
              Book.find({ author })
            )
          : genre
          ? Book.find({ genres: { $in: genre } })
          : Book.find({});

      return await books.populate({ path: "author" });
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { author: name } = args;

      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      let author = await Author.findOne({ name: name });
      if (!author) {
        author = new Author({ name: name });
        await author.save().catch((err) => {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        });
      }

      const book = new Book({ ...args, author: author._id });
      await book.save().catch((err) => {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      });
      await book.populate({ path: "author" });
      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args;

      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      let author = await Author.findOne({ name });
      if (!author) {
        return null;
      }

      author.born = setBornTo;
      return await author.save().catch((err) => {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      });
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return await user.save().catch((err) => {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
