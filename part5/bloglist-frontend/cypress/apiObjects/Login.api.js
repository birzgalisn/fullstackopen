/// <reference types="cypress" />

import BlogsPage from "../pageObjects/Blogs.page";
import BaseApi from "./Base.api";

class LoginApi extends BaseApi {
  static get url() {
    return BaseApi.url + "/login";
  }

  static login(body) {
    this.post(this.url, body).then(({ body }) => {
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
      BlogsPage.visit();
    });
  }

  static get me() {
    const user = localStorage.getItem("loggedBlogAppUser");
    return user ? JSON.parse(user) : null;
  }
}

export default LoginApi;
