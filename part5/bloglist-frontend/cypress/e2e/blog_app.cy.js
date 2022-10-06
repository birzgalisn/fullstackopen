/// <reference types="cypress" />

import BlogsApi from "../apiObjects/Blogs.api";
import LoginApi from "../apiObjects/Login.api";
import ResetApi from "../apiObjects/Reset.api";
import UsersApi from "../apiObjects/Users.api";
import blog from "../fixtures/blog";
import blogs from "../fixtures/blogs";
import newBlog from "../fixtures/newBlog";
import user from "../fixtures/user";
import BlogsPage from "../pageObjects/Blogs.page";
import LoginPage from "../pageObjects/Login.page";

describe("blog app", () => {
  beforeEach(() => {
    ResetApi.reset();
    UsersApi.initialize();
    BlogsPage.visit();
  });

  it("login form is shown", () => {
    LoginPage.visit();
    LoginPage.loginButton.should("be.visible").click();
    LoginPage.usernameField.should("be.visible");
    LoginPage.passwordField.should("be.visible");
    LoginPage.submitButton.should("be.visible");
  });

  describe("login", () => {
    beforeEach(() => {
      LoginPage.visit();
    });

    it("succeeds with correct credentials", () => {
      LoginPage.loginButton.click();
      LoginPage.usernameField.type(user.username);
      LoginPage.passwordField.type(user.password);
      LoginPage.submitButton.click();
      BlogsPage.greeting.contains(user.name);
    });

    it("fails with wrong credentials", () => {
      LoginPage.loginButton.click();
      LoginPage.usernameField.type(user.username);
      LoginPage.passwordField.type([...user.password].reverse().join(""));
      LoginPage.submitButton.click();
      BlogsPage.notification
        .contains("Invalid username or password")
        .and("have.css", "color")
        .and("eq", "rgb(255, 0, 0)");
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      LoginApi.login(user);
    });

    describe("a blog can be created with", () => {
      it("api call", () => {
        BlogsApi.create(blog);
        BlogsPage.blog(blog.title).should("be.visible");
      });

      it("ui", () => {
        BlogsPage.newBlogButton.click();
        BlogsPage.titleField.type(newBlog.title);
        BlogsPage.authorField.type(newBlog.author);
        BlogsPage.urlField.type(newBlog.url);
        BlogsPage.submitButton.click();
        BlogsPage.blog(newBlog.title).should("be.visible");
        BlogsPage.notification
          .should("contain", newBlog.title)
          .and("have.css", "color")
          .and("eq", "rgb(0, 128, 0)");
      });
    });

    describe("and a blog exists", () => {
      beforeEach(() => {
        BlogsApi.create(blog);
      });

      it("it can be liked", () => {
        BlogsPage.viewButton(blog.title).click();
        BlogsPage.likeButton(blog.title).click();
        BlogsPage.likes(blog.title).should("have.text", blog.likes + 1);
        BlogsPage.notification
          .should("contain", `${blog.likes + 1} likes`)
          .and("have.css", "color")
          .and("eq", "rgb(0, 128, 0)");
      });

      it("it can be removed", () => {
        BlogsPage.viewButton(blog.title).click();
        BlogsPage.removeButton(blog.title).click();
        BlogsPage.blogs.should("have.length", 0);
        BlogsPage.notification
          .should("contain", blog.title)
          .and("have.css", "color")
          .and("eq", "rgb(0, 128, 0)");
      });
    });

    describe("and many more blogs exists", () => {
      beforeEach(() => {
        blogs.forEach((blog) => {
          BlogsApi.create(blog);
        });
        BlogsPage.blogs.should("have.length", blogs.length);
      });

      it("blogs can be viewed", () => {
        blogs.forEach((blog) => {
          BlogsPage.viewButton(blog.title).click();
          BlogsPage.link(blog.title).should("have.text", blog.url);
          BlogsPage.likes(blog.title).should("have.text", blog.likes);
          BlogsPage.userName(blog.title).should("be.visible");
          BlogsPage.likeButton(blog.title).should("be.visible");
          BlogsPage.removeButton(blog.title).should("be.visible");
        });
      });

      it("blogs are ordered by likes", () => {
        const [last, oneBefore] = blogs.reverse();

        BlogsPage.blogs.last().should("contain", last.title);
        BlogsPage.viewButton(last.title).click();
        BlogsPage.likeButton(last.title).click();
        cy.wait(150);
        BlogsPage.blogs.first().should("contain", last.title);

        BlogsPage.viewButton(oneBefore.title).click();
        [1, 2].forEach(() => {
          BlogsPage.likeButton(oneBefore.title).click();
          cy.wait(150);
        });
        BlogsPage.blogs.first().should("contain", oneBefore.title);
      });
    });
  });
});
