describe("Sign Up Page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should return error, if form items are empty", () => {
    cy.get("button")
      .contains(/signup/i)
      .click();

    cy.contains(/Please fill in all fields/i).should("be.visible");
  });

  it("should return error, if there is a user with same email", () => {
    cy.get("[type=text]").type("Mevlüt Can Tuna");
    cy.get("[type=email]").type("mttuna90@gmail.com");
    cy.get("[type=password]").type("123123");

    cy.get("button")
      .contains(/signup/i)
      .click();

    cy.contains(/User Exists.../i);
  });

  it("should signup correctly", () => {
    const random = Math.random();

    cy.get("[type=text]").type("New User");
    cy.get("[type=email]").type(`${random}@gmail.com`);
    cy.get("[type=password]").type("123123");

    cy.get("button")
      .contains(/signup/i)
      .click();

    cy.contains(/Register is successed.../i);
  });
});
