/// <reference types="cypress" />

import BlogsPage from "../pageObjects/Blogs.page";
import BaseApi from "./Base.api";

class BlogsApi extends BaseApi {
  static get url() {
    return BaseApi.url + "/blogs";
  }

  static create(body) {
    this.post(this.url, body).then(({ body }) => {
      BlogsPage.visit();
    });
  }
}

export default BlogsApi;
