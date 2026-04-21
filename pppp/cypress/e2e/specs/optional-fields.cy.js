describe("Specialty Code", () => {
  //we have unit tests to check for Specialty Code data consistency
  //but those tests don't check for breaking errors on blur/defocus
  //This test covers those gaps
  //In the long term, it could be replaced by a comprehensive e2e test for all optional fields
  it("displays the proper error messages when specialtyCode is filled (pay patient)", () => {
    cy.visit("/pay-patient");
    //Claim Count
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

    //Main Form
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pppp/pay-patient/main-form");
    });
    cy.get("[data-cy=specialtyCode]").type("9").blur();
    cy.contains("Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").type("99").blur();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").clear().blur();
    cy.get("[data-cy=continueBar]").click();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
  });
  it("displays the proper error messages when specialtyCode is filled (pay practitioner)", () => {
    //we have unit tests to check for Specialty Code data consistency
    //but those tests don't check for breaking errors on blur/defocus
    //This test covers those gaps
    //In the long term, it could be replaced by a comprehensive e2e test for all optional fields

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
    cy.get("[data-cy=specialtyCode]").type("9").blur();
    cy.contains("Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").type("99").blur();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").clear().blur();
    cy.get("[data-cy=continueBar]").click();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
  });
  it("displays the proper error messages when specialtyCode is filled (pay patient CSR)", () => {
    //we have unit tests to check for Specialty Code data consistency
    //but those tests don't check for breaking errors on blur/defocus
    //This test covers those gaps
    //In the long term, it could be replaced by a comprehensive e2e test for all optional fields

    cy.visit("/pay-patient-csr");
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
    cy.get("[data-cy=specialtyCode]").type("9").blur();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").type("99").blur();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").clear().blur();
    cy.get("[data-cy=continueBar]").click();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
  });
  it("displays the proper error messages when specialtyCode is filled (pay practitioner CSR)", () => {
    //we have unit tests to check for Specialty Code data consistency
    //but those tests don't check for breaking errors on blur/defocus
    //This test covers those gaps
    //In the long term, it could be replaced by a comprehensive e2e test for all optional fields

    cy.visit("/pay-practitioner-csr");
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
    cy.get("[data-cy=specialtyCode]").type("9").blur();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").type("99").blur();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
    cy.get("[data-cy=specialtyCode]").clear().blur();
    cy.get("[data-cy=continueBar]").click();
    cy.root().should("not.contain.html", "Specialty Code cannot be less than 2 characters.");
  });
});
