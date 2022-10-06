/// <reference types="cypress" />

import BasePage from "./Base.page";

class BlogsPage extends BasePage {
  static url = "/";

  static get greeting() {
    return cy.get("[aria-label='Greeting']");
  }

  static get blogs() {
    return cy.get("[aria-label='Blog']");
  }

  static blog(title) {
    return this.blogs.contains(title).parentsUntil("div");
  }

  static author(title) {
    return this.blog(title).find("[aria-label]='Author'");
  }

  static viewButton(title) {
    return this.blog(title).find("[aria-label='View button']");
  }

  static link(title) {
    return this.blog(title).find("[aria-label='Url']");
  }

  static likes(title) {
    return this.blog(title).find("[aria-label='Likes']");
  }

  static userName(title) {
    return this.blog(title).find("[aria-label='User name']");
  }

  static likeButton(title) {
    return this.blog(title).find("[aria-label='Like button']");
  }

  static removeButton(title) {
    return this.blog(title).find("[aria-label='Remove button']");
  }

  static get newBlogButton() {
    return cy.get("[aria-label='New blog']");
  }

  static get titleField() {
    return cy.get("[aria-label='Title field']");
  }

  static get authorField() {
    return cy.get("[aria-label='Author field']");
  }

  static get urlField() {
    return cy.get("[aria-label='Url field']");
  }
}

export default BlogsPage;
