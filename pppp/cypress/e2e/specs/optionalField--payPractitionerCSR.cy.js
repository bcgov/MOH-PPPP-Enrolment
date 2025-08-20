// https://docs.cypress.io/api/introduction/api.html
import envData from "../../fixtures/env-data.js";
const testUrl = "/pay-practitioner-csr";

describe("Pay Practitioner-CSR", () => {
  it("submits with optional fields not filled", () => {
    cy.visit(testUrl);
    //Claim Count
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner-csr");
    });

    cy.get("[data-cy=captchaInput]").type("irobot");
    cy.get("[data-cy=consentCheckbox]").click();
    cy.get("[data-cy=consentContinue]").click();

    cy.get("select")
      .find("option[data-cy=MedicalClaim1]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("select")
      .find("option[data-cy=HospitalClaim1]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("[data-cy=continueBar]").click();

    //Main Form
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner-csr/main-form");
    });

    cy.get("[data-cy=PRN]").type("1111111111");
    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner-csr/review");
    });

    if (envData.enableIntercepts) {
      console.log("intercepted submission call for optionalField--payPractitionerCSR");

      cy.intercept("POST", "/pppp/api/payformsIntegration/practitioner/*", {
        statusCode: 200,
        body: {
          returnCode: "0",
          testfield: "This is a stubbed test response from Cypress",
        },
      });
    }

    cy.get("[data-cy=continueBar]").click();

    cy.location({ timeout: 40000 }).should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner-csr/submission");
    });
  });
});
