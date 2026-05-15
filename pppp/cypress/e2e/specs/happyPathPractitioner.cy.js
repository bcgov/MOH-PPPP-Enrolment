import envData from "../../fixtures/env-data.js";

const testYear = new Date().getFullYear() - 1;
const backendLastName = envData.backendLastName;
const backendFirstName = envData.backendFirstName;
const backendPractitionerNumber = envData.backendPractitionerNumber;
const testUrl = "/pay-practitioner";

describe("Pay Practitioner-Public", () => {
  it("follows the happy path", () => {
    cy.visit(testUrl);
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
    cy.get("[data-cy=dependent-number]").type("00");
    cy.get("[data-cy=patientFirstName]").type("Firstname");
    cy.get("[data-cy=middle-initial]").type("A");
    cy.get("[data-cy=patientLastName]").type("Lastname");

    cy.get("select")
      .find("option[data-cy=patientBirthDateMonth0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=patientBirthDateDay]").type("11");
    cy.get("[data-cy=patientBirthDateYear]").type(testYear);

    cy.get("[data-cy=motorVehicleAccidentis-vehicle-accident-y]").click({
      force: true,
    });
    cy.get("[data-cy=vehicle-accident-claim-number]").type("AA111111");

    cy.get("[data-cy=plan-reference-number-of-original-claim]").type("111111");

    cy.get("select")
      .find("option[data-cy=serviceDate0Month0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=serviceDate0Day]").type("11");
    cy.get("[data-cy=serviceDate0Year]").type(testYear);
    cy.get("[data-cy=numberOfServices0]").type("1");
    cy.get("[data-cy=msc-service-clarification-code-0]").type("A1");
    cy.get("[data-cy=feeItem0]").type("00010");
    cy.get("[data-cy=amountBilled0]").type("1.00");
    cy.get("select")
      .find("option[data-cy=msc-called-start-time-0Hour0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("select")
      .find("option[data-cy=msc-called-start-time-0Minute0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("select")
      .find("option[data-cy=msc-rendered-finish-time-0Hour0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("select")
      .find("option[data-cy=msc-rendered-finish-time-0Minute0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=diagnosticCode0]").type("001");

    cy.get("select")
      .find("option[data-cy=serviceLocationCode01]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("select")
      .find("option[data-cy=msc-correspondence-attached-01]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("select")
      .find("option[data-cy=submissionCode00]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=medNotesAttach0]").type("aaa");

    //hospital claim section
    cy.get("select")
      .find("option[data-cy=hospitalClaimMonth010]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=hospitalClaimDayFrom0]").type("1");
    cy.get("[data-cy=hvc-day-to-0]").type("2");
    cy.get("[data-cy=hospitalClaimYear0]").type(testYear);
    cy.get("[data-cy=hospitalClaimNumberOfServices0]").type("1");
    cy.get("[data-cy=hvc-service-clarification-code-0]").type("A1");
    cy.get("[data-cy=hospitalClaimFeeItem0]").type("00010");
    cy.get("[data-cy=hospitalClaimAmountBilled0]").type("1.00");
    cy.get("[data-cy=hospitalClaimDiagnosticCode0]").type("001");

    cy.get("select")
      .find("option[data-cy=hospitalClaimServiceLocation01]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("select")
      .find("option[data-cy=hvc-correspondence-attached-01]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");

    cy.get("select")
      .find("option[data-cy=hospitalClaimSubmissionCode00]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=hospitalNotesAttach0]").type("aaa");

    cy.get("[data-cy=practitionerLastName]").type(backendLastName);
    cy.get("[data-cy=practitionerFirstName]").type(backendFirstName);
    cy.get("[data-cy=paymentNumber]").type(backendPractitionerNumber);
    cy.get("[data-cy=practitionerNumber]").type(backendPractitionerNumber);

    cy.get("[data-cy=specialtyCode]").type("11");
    cy.get("[data-cy=facility-number]").type("11111");
    cy.get("[data-cy=coverage-pre-authorization-number]").type("1111");

    cy.get("[data-cy=referred-by-practitioner-number]").type("11111");
    cy.get("[data-cy=referred-by-last-name]").type("bbbbb");
    cy.get("[data-cy=referred-by-first-name-initial]").type("a");

    cy.get("[data-cy=referred-to-practitioner-number]").type("22222");
    cy.get("[data-cy=referred-to-last-name]").type("ddddd");
    cy.get("[data-cy=referred-to-first-name-initial]").type("c");

    if (envData.enableIntercepts) {
      console.log("intercepted validateClaim + patient calls for happyPathPractitioner");
      cy.intercept("POST", "/pppp/api/payformsIntegration/validateClaim/*", {
        statusCode: 200,
        body: {
          returnCode: "0",
          testfield: "This is a stubbed test response from Cypress",
        },
      });

      cy.intercept("POST", "/pppp/api/payformsIntegration/practitioner/*", {
        statusCode: 200,
        body: {
          returnCode: "0",
          testfield: "This is a stubbed test response from Cypress",
        },
      });
    }

    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location({ timeout: 40000 }).should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner/review");
    });

    cy.get("[data-cy=continueBar]").click();

    cy.location({ timeout: 40000 }).should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner/submission");
    });

    cy.get("[data-cy=newForm]").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-practitioner");
    });
  });
});
