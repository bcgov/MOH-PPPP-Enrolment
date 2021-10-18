// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/pay-patient')
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-patient");
    });

    cy.get("[data-cy=captchaInput]").type("irobot");
    cy.get("[data-cy=consentCheckbox]").click();
    cy.get("[data-cy=consentContinue]").click();

    cy.get("select")
    .find("option[data-cy=MedicalClaim1]")
    .then(($el) => $el.get(0).setAttribute("selected", "selected"))
    .parent()
    .trigger("change");


    cy.get("[data-cy=continueBar]").click();


    //Captcha
    // cy.get("[data-cy=captchaInput]").type("irobot");
    // cy.get("[data-cy=consentCheckbox]").click();
    // cy.get("[data-cy=consentContinue]").click();
    // cy.get("[data-cy=continueBar]").click();
    // cy.get("[aria-label=Country]").select("Canada");
    // cy.get("[data-cy=ReviewTableElement]").contains("Alberta");
    // cy.get("select")
    // .find("option[data-cy=arriveDestinationDateMonth0]")
    // .then(($el) => $el.get(0).setAttribute("selected", "selected"))
    // .parent()
    // .trigger("change");
  })
})
