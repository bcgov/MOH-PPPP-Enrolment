// https://docs.cypress.io/api/introduction/api.html
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */

const testYear = new Date().getFullYear() - 1;
//Dev
// const backendLastName = "GOTTNER";
// const backendFirstName = "MICHAEL";
// const backendPractitionerNumber = "00001";
//Test
const backendLastName = "Green";
const backendFirstName = "Rachel";
const backendPractitionerNumber = "22274";

describe("Pay Practitioner-Public", () => {
  it("follows the happy path", () => {
    cy.visit("/pay-practitioner");
    //Claim Count
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner");
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
      expect(loc.pathname).to.eq("/pppp/pay-practitioner/main-form");
    });

    cy.get("[data-cy=PHN]").type("9353 166 544");
    cy.get("[data-cy=patientFirstName]").type("Firstname");
    cy.get("[data-cy=patientLastName]").type("Lastname");

    cy.get("select")
      .find("option[data-cy=patientBirthDateMonth0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=patientBirthDateDay]").type("11");
    cy.get("[data-cy=patientBirthDateYear]").type(testYear);

    cy.get("[data-cy=motorVehicleAccidentis-vehicle-accident-n]").click({
      force: true,
    });

    cy.get("select")
      .find("option[data-cy=serviceDate0Month0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=serviceDate0Day]").type("11");
    cy.get("[data-cy=serviceDate0Year]").type(testYear);
    cy.get("[data-cy=numberOfServices0]").type("1");
    cy.get("[data-cy=feeItem0]").type("00010");
    cy.get("[data-cy=amountBilled0]").type("1.00");
    cy.get("[data-cy=diagnosticCode0]").type("001");

    cy.get("select")
      .find("option[data-cy=serviceLocationCode01]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("select")
      .find("option[data-cy=submissionCode0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    //hospital claim section
    cy.get("select")
      .find("option[data-cy=hospitalClaimMonth010]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("[data-cy=hospitalClaimDayFrom0]").type("11");
    cy.get("[data-cy=hospitalClaimYear0]").type(testYear);
    cy.get("[data-cy=hospitalClaimNumberOfServices0]").type("1");
    cy.get("[data-cy=hospitalClaimFeeItem0]").type("00010");
    cy.get("[data-cy=hospitalClaimAmountBilled0]").type("1.00");
    cy.get("[data-cy=hospitalClaimDiagnosticCode0]").type("001");

    cy.get("select")
      .find("option[data-cy=hospitalClaimServiceLocation01]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("select")
      .find("option[data-cy=hospitalClaimSubmissionCode0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("[data-cy=practitionerLastName]").type(backendLastName);
    cy.get("[data-cy=practitionerFirstName]").type(backendFirstName);
    cy.get("[data-cy=paymentNumber]").type(backendPractitionerNumber);
    cy.get("[data-cy=practitionerNumber]").type(backendPractitionerNumber);

    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner/review");
    });

    cy.get("[data-cy=continueBar]").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner/submission");
    });
    
    cy.get("[data-cy=newForm]").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner");
    });
  });
});
