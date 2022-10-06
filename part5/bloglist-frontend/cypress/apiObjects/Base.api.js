/// <reference types="cypress" />

class BaseApi {
  static get url() {
    return "/api";
  }

  static post(url, body) {
    const user = localStorage.getItem("loggedBlogAppUser");

    const headers = {
      Authorization: user ? `Bearer ${JSON.parse(user).token}` : null,
    };

    return cy.request({
      url,
      method: "POST",
      body,
      headers,
    });
  }

  static get(url) {
    return cy.request({
      url,
      method: "GET",
    });
  }
}

export default BaseApi;
