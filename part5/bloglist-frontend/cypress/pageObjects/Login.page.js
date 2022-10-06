/// <reference types="cypress" />

import BasePage from "./Base.page";

class LoginPage extends BasePage {
  static url = "/";

  static get loginButton() {
    return cy.get("button").contains("Login");
  }

  static get usernameField() {
    return cy.get("[name='username']");
  }

  static get passwordField() {
    return cy.get("[name='password']");
  }
}

export default LoginPage;
