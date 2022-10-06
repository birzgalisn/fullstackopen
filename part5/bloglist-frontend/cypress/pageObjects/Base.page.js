/// <reference types="cypress" />

class BasePage {
  static url = "";

  static visit() {
    cy.visit(this.url, { failOnStatusCode: false });
  }

  static get notification() {
    return cy.get("[aria-label='Notification']");
  }

  static get submitButton() {
    return cy.get("[type='submit']");
  }
}

export default BasePage;
