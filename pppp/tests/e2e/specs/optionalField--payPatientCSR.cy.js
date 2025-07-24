// https://docs.cypress.io/api/introduction/api.html
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
import dummyData from '../../../src/store/states/pay-patient-form-dummy-data';

const testYear = new Date().getFullYear() - 1;
const backendLastName = dummyData.practitionerLastName;
const backendFirstName = dummyData.practitionerFirstName;
const backendPractitionerNumber = dummyData.practitionerPractitionerNumber;
//you can replace the testUrl with https://dev.my.gov.bc.ca/pppp/pay-patient-csr if needed
//you can also replace the "dev" with "test" to check the TEST environment
const testUrl = "/pay-patient-csr";

describe("Pay Patient-CSR", () => {
  it("submits with optional fields not filled", () => {
    cy.visit(testUrl);
    //Claim Count
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-patient-csr");
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

    //Main Form
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-patient-csr/main-form");
    });

    cy.get("[data-cy=PRN]").type("1111111111");
    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-patient-csr/review");
    });

    cy.get("[data-cy=continueBar]").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-patient-csr/submission");
    });
  });
});
