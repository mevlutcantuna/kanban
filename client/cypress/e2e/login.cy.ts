/// <reference types="cypress" />

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should return error, if form items are empty", () => {
    cy.visit("/");
    cy.get("button").contains(/login/i).click();
    cy.contains(/Please provide all inputs.../i).should("be.visible");
  });

  it("should return error,if user doesnt found", () => {
    cy.get("[type=email]").type("notfounduser@gmail.com");
    cy.get("[type=password]").type("123123");
    cy.get("button").contains(/Login/i).click();

    cy.contains(/User does not found.../i).should("be.visible");
  });

  it("should return error,if password is wrong", () => {
    cy.get("[type=email]").type("mttuna90@gmail.com");
    cy.get("[type=password]").type("wrongpassword");
    cy.get("button").contains(/Login/i).click();

    cy.contains(/password is wrong/i);
  });

  it("should login correctly", () => {
    cy.get("[type=email]").type("mttuna90@gmail.com");
    cy.get("[type=password]").type("123123");
    cy.get("button").contains(/Login/i).click();

    cy.contains(/Login Success/i).should("be.visible");
    cy.contains(/first column/i).should("be.visible");
    cy.contains(/Task 1/i).should("be.visible");
  });
});
