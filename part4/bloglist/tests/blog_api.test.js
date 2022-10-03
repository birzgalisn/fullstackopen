const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");
const { defaultConfiguration } = require("../app");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const userHash = await bcrypt.hash("secret", 10);
  const user = new User({ username: "user", passwordHash: userHash });
  await user.save();

  const rootHash = await bcrypt.hash("secret", 10);
  const root = new User({ username: "root", passwordHash: rootHash });
  await root.save();

  await Promise.all(
    helper.initialBlogs.map(async (blog) => {
      const newBlog = new Blog({ ...blog, user: root._id });
      await newBlog.save();
    })
  );
});

describe("when there is initially some blogs saved", () => {
  describe("blogs are", () => {
    test("returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("not returned with _id field", async () => {
      const { body: blogs } = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      blogs.forEach((blog) => {
        expect(blog._id).not.toBeDefined();
      });
    });

    test("returned with id field", async () => {
      const { body: blogs } = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      blogs.forEach((blog) => {
        expect(blog.id).toBeDefined();
      });
    });

    test("all returned", async () => {
      const { body: blogs } = await api.get("/api/blogs");

      expect(blogs).toHaveLength(helper.initialBlogs.length);
    });
  });

  test("a specific blog is within the returned blogs", async () => {
    const { body: blogs } = await api.get("/api/blogs");
    const [blog] = helper.initialBlogs;

    const titles = blogs.map((b) => b.title);

    expect(titles).toContain(blog.title);
  });
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const { body: blogsAtStart } = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const [blogToView] = blogsAtStart;

    const { body: resultBlog } = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(blogToView).toEqual(resultBlog);
  });

  describe("fails with statuscode", () => {
    test("404 if blog does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test("400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });
});

describe("addition of a new blog", () => {
  describe("succeeds with", () => {
    test("valid data", async () => {
      const blogsAtStart = await helper.blogsInDb();

      const { body: user } = await api
        .post("/api/login")
        .send({ username: "root", password: "secret" })
        .expect(200)
        .expect("Content-Type", /application\/json/);
      expect(user.token).toBeDefined();

      const data = {
        title: "Go To Statement Considered Harmful #2",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      };

      const { body: blog } = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${user.token}`)
        .send(data)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

      const titles = blogsAtEnd.map((b) => b.title);
      expect(titles).toContain(blog.title);
    });

    test("missing likes field", async () => {
      const blogsAtStart = await helper.blogsInDb();

      const { body: user } = await api
        .post("/api/login")
        .send({ username: "root", password: "secret" })
        .expect(200)
        .expect("Content-Type", /application\/json/);
      expect(user.token).toBeDefined();

      const data = {
        title: "Go To Statement Considered Harmful #3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      };

      const { body: blog } = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${user.token}`)
        .send(data)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

      const titles = blogsAtEnd.map((b) => b.title);
      expect(titles).toContain(blog.title);
    });
  });

  describe("fails with status code", () => {
    test("400 if data invalid", async () => {
      const blogsAtStart = await helper.blogsInDb();

      const { body: user } = await api
        .post("/api/login")
        .send({ username: "root", password: "secret" })
        .expect(200)
        .expect("Content-Type", /application\/json/);
      expect(user.token).toBeDefined();

      const data = {
        author: "Edsger W. Dijkstra #2",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${user.token}`)
        .send(data)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      const authors = blogsAtEnd.map((b) => b.author);
      expect(authors).not.toContain(data.author);

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });

    describe("401", () => {
      test("if token missing", async () => {
        const blogsAtStart = await helper.blogsInDb();

        const data = {
          title: "Go To Statement Considered Harmful #4",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        };

        const { body } = await api
          .post("/api/blogs")
          .send(data)
          .expect(401)
          .expect("Content-Type", /application\/json/);
        expect(body.error.toLowerCase()).toContain("token missing or invalid");

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

        const titles = blogsAtEnd.map((b) => b.title);
        expect(titles).not.toContain(data.title);
      });

      test("if token expired", async () => {
        const blogsAtStart = await helper.blogsInDb();

        const expiredToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlcnNvbjAiLCJpZCI6IjYzMzljNjRlMmE2OTdmZWViM2IxOTVkYiIsImlhdCI6MTY2NDc0NjYxMywiZXhwIjoxNjY0NzUwMjEzfQ.8qgVybGxII43RXyJHC_2176cpfiDR6WzfcB7PCyZaU8";

        const data = {
          title: "Go To Statement Considered Harmful #5",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        };

        const { body } = await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${expiredToken}`)
          .send(data)
          .expect(401)
          .expect("Content-Type", /application\/json/);
        expect(body.error.toLowerCase()).toContain("token expired");

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

        const titles = blogsAtEnd.map((b) => b.title);
        expect(titles).not.toContain(data.title);
      });

      test("if token invalid", async () => {
        const blogsAtStart = await helper.blogsInDb();

        const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

        const data = {
          title: "Go To Statement Considered Harmful #6",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        };

        const { body } = await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${invalidToken}`)
          .send(data)
          .expect(401)
          .expect("Content-Type", /application\/json/);
        expect(body.error.toLowerCase()).toContain("invalid token");

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

        const titles = blogsAtEnd.map((b) => b.title);
        expect(titles).not.toContain(data.title);
      });
    });
  });
});

describe("update of a existing blog", () => {
  test("only likes can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const [blogToUpdate] = blogsAtStart;

    const { body: user } = await api
      .post("/api/login")
      .send({ username: "root", password: "secret" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(user.token).toBeDefined();

    const { body: blog } = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(blog.likes).toBe(blogToUpdate.likes + 1);

    const titlesAtStart = blogsAtStart.map((b) => b.title);
    const titlesAtEnd = blogsAtEnd.map((b) => b.title);

    expect(titlesAtStart).toEqual(titlesAtEnd);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const { body: user } = await api
      .post("/api/login")
      .send({ username: "root", password: "secret" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(user.token).toBeDefined();
    expect(user.username).toBeDefined();

    const { body: blogsAtStart } = await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogToDelete = blogsAtStart.find(
      (b) => b.user.username === user.username
    );

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with status code 401 if not the owner", async () => {
    const { body: user } = await api
      .post("/api/login")
      .send({ username: "user", password: "secret" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(user.token).toBeDefined();
    expect(user.username).toBeDefined();

    const { body: blogsAtStart } = await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogToDelete = blogsAtStart.find(
      (b) => b.user.username !== user.username
    );

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain(blogToDelete.title);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("login fails if password or username not correct", async () => {
    const { body } = await api
      .post("/api/login")
      .send({ username: "root", password: "123" })
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(body.error.toLowerCase()).toContain("invalid username or password");
  });

  describe("creation fails with proper statuscode and message if", () => {
    test("username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };

      const { body } = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(body.error).toContain("Username must be unique");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("username less than 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "12",
        password: "password",
      };

      const { body } = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(body.error).toContain("at least 3 characters long");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("password less than 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "username",
        password: "12",
      };

      const { body } = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(body.error).toContain("at least 3 characters long");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });
  });
});

afterAll(() => {
  mongoose.disconnect();
});
