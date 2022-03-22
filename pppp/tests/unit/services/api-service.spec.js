import APIService from "@/services/api-service";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve();
  }),
}));

jest.mock("uuid");
uuidv4.mockImplementation(() => {
  return "uuid-123";
});

const testDate = new Date("2000-01-01T03:24:00").toDateString();

const spyOnSendPostRequest = jest.spyOn(APIService, "_sendPostRequest");

const mockResponse = {};

axios.post.mockImplementation(() => Promise.resolve(mockResponse));
const spyOnAxiosPost = jest.spyOn(axios, "post");

describe("APIService", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("validateApplication() calls axios with correct arguments", () => {
    const fakeArgument = {
      requestUuid: jest.fn,
      applicationUuid: 1111111,
    };
    APIService.validateApplication("1", fakeArgument);
    expect(
      spyOnSendPostRequest
    ).toHaveBeenCalledWith(
      "/pppp/api/payformsIntegration/validateClaim/1111111",
      "1",
      { applicationUuid: 1111111, requestUuid: "uuid-123" }
    );
  });

  it("submitPayPatientApplication() calls axios with correct arguments, including special character filter", () => {
    const fakeArgumentPatient = {
      applicationUuid: "fakeApplicationUuid",
      claimCount: "1",

      planReferenceNumber: "1234567890",

      phn: "9999 999 998",
      dependentNumber: "66",
      firstName: "Bob",
      middleInitial: "H",
      lastName: "Smith",
      birthDate: testDate,

      addressOwner: "PATIENT",
      unitNumber: "123",
      streetNumber: "321",
      streetName: "Fake St.",
      city: "Victoria",
      postalCode: "V8V 8V8",

      isVehicleAccident: "Y",
      vehicleAccidentClaimNumber: "A0000001",

      planReferenceNumberOfOriginalClaim: "321",

      medicalServiceClaims: [
        {
          serviceDate: testDate,
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          calledStartTime: {
            hour: "08",
            minute: "01",
          },
          renderedFinishTime: {
            hour: "16",
            minute: "05",
          },
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: `Notes here.""\\`,
        },
      ],

      practitionerLastName: "GOTTNER",
      practitionerFirstName: "MICHAEL",
      practitionerPaymentNumber: "00001",
      practitionerPractitionerNumber: "00001",
      practitionerFacilityNumber: "12345",
      practitionerSpecialtyCode: "99",

      referredByFirstNameInitial: "R",
      referredByLastName: "McDonald",
      referredByPractitionerNumber: "22271",

      referredToFirstNameInitial: "C",
      referredToLastName: "Lee",
      referredToPractitionerNumber: "22272",
    };

    APIService.submitPayPatientApplication("fakeToken", fakeArgumentPatient);
    expect(spyOnSendPostRequest).toHaveBeenCalledWith(
      "/pppp/api/payformsIntegration/patient/fakeApplicationUuid",
      "fakeToken",
      {
        applicationUuid: "fakeApplicationUuid",
        isCSR: "N",
        payPatient: {
          addressOwner: "PATIENT",
          birthDate: "Sat Jan 01 2000",
          city: "Victoria",
          claimCount: "1",
          dependentNumber: "66",
          firstName: "Bob",
          isVehicleAccident: "Y",
          lastName: "Smith",
          medicalServiceClaims: [
            {
              amountBilled: "0.00",
              calledStartTime: "",
              correspondenceAttached: "",
              diagnosticCode: "001",
              feeItem: "00010",
              locationOfService: "A",
              notes: "Notes here.",
              numberOfServices: "1",
              renderedFinishTime: "",
              serviceClarificationCode: "A1",
              serviceDate: testDate,
              submissionCode: "I",
            },
          ],
          middleInitial: "H",
          phn: "9999999998",
          planReferenceNumber: "1234567890",
          planReferenceNumberOfOriginalClaim: "321",
          postalCode: "V8V8V8",
          practitionerFacilityNumber: "12345",
          practitionerFirstName: "MICHAEL",
          practitionerLastName: "GOTTNER",
          practitionerPaymentNumber: "00001",
          practitionerPractitionerNumber: "00001",
          practitionerSpecialtyCode: "99",
          referredByFirstNameInitial: "R",
          referredByLastName: "McDonald",
          referredByPractitionerNumber: "22271",
          referredToFirstNameInitial: "C",
          referredToLastName: "Lee",
          referredToPractitionerNumber: "22272",
          streetName: "Fake St.",
          streetNumber: "321",
          unitNumber: "123",
          vehicleAccidentClaimNumber: "A0000001",
        },
        requestUuid: "uuid-123",
        submissionDate: "",
      }
    );
  });

  it("submitPayPractitionerApplication() calls axios with correct arguments, including special character filter", () => {
    const fakeArgumentPrac = {
      applicationUuid: "fakeApplicationUuid",
      medicalServiceClaimsCount: "1",
      hospitalVisitClaimsCount: "1",

      planReferenceNumber: "1234567890",

      phn: "9999 999 998",
      dependentNumber: "66",
      firstName: "Bob",
      middleInitial: "H",
      lastName: "Smith",
      birthDate: testDate,

      isVehicleAccident: "Y",
      vehicleAccidentClaimNumber: "A0000001",

      planReferenceNumberOfOriginalClaim: "321",

      medicalServiceClaims: [
        {
          serviceDate: testDate,
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "03333",
          amountBilled: "0.00",
          calledStartTime: {
            hour: "08",
            minute: "08",
          },
          renderedFinishTime: {
            hour: "16",
            minute: "06",
          },
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: `Notes here.""\\`,
        },
      ],

      hospitalVisitClaims: [
        {
          month: "12",
          dayFrom: "24",
          dayTo: "26",
          year: "2020",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "03333",
          amountBilled: "0.00",
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: `Notes here.""\\`,
        },
      ],

      practitionerLastName: "GOTTNER",
      practitionerFirstName: "MICHAEL",
      practitionerPaymentNumber: "A1234",
      practitionerPractitionerNumber: "00001",
      practitionerFacilityNumber: "12345",
      practitionerSpecialtyCode: "99",
      coveragePreAuthNumber: "2222",

      referredByFirstNameInitial: "R",
      referredByLastName: "McDonald",
      referredByPractitionerNumber: "22271",

      referredToFirstNameInitial: "C",
      referredToLastName: "Lee",
      referredToPractitionerNumber: "22272",
    };
    APIService.submitPayPractitionerApplication("fakeToken", fakeArgumentPrac);
    expect(spyOnSendPostRequest).toHaveBeenCalledWith(
      "/pppp/api/payformsIntegration/practitioner/fakeApplicationUuid",
      "fakeToken",
      {
        applicationUuid: "fakeApplicationUuid",
        isCSR: "N",
        payPractitioner: {
          birthDate: testDate,
          coveragePreAuthNumber: "2222",
          dependentNumber: "66",
          firstName: "Bob",
          hospitalVisitClaims: [
            {
              amountBilled: "0.00",
              correspondenceAttached: "",
              dayFrom: "24",
              dayTo: "26",
              diagnosticCode: "001",
              feeItem: "03333",
              locationOfService: "A",
              month: "12",
              notes: "Notes here.",
              numberOfServices: "1",
              serviceClarificationCode: "A1",
              submissionCode: "I",
              year: "2020",
            },
          ],
          hospitalVisitClaimsCount: "1",
          isVehicleAccident: "Y",
          lastName: "Smith",
          medicalServiceClaims: [
            {
              amountBilled: "0.00",
              calledStartTime: "",
              correspondenceAttached: "",
              diagnosticCode: "001",
              feeItem: "03333",
              locationOfService: "A",
              notes: "Notes here.",
              numberOfServices: "1",
              renderedFinishTime: "",
              serviceClarificationCode: "A1",
              serviceDate: testDate,
              submissionCode: "I",
            },
          ],
          medicalServiceClaimsCount: "1",
          middleInitial: "H",
          phn: "9999999998",
          planReferenceNumber: "1234567890",
          planReferenceNumberOfOriginalClaim: "321",
          practitionerFacilityNumber: "12345",
          practitionerFirstName: "MICHAEL",
          practitionerLastName: "GOTTNER",
          practitionerPaymentNumber: "A1234",
          practitionerPractitionerNumber: "00001",
          practitionerSpecialtyCode: "99",
          referredByFirstNameInitial: "R",
          referredByLastName: "McDonald",
          referredByPractitionerNumber: "22271",
          referredToFirstNameInitial: "C",
          referredToLastName: "Lee",
          referredToPractitionerNumber: "22272",
          vehicleAccidentClaimNumber: "A0000001",
        },
        requestUuid: "uuid-123",
        submissionDate: "",
      }
    );
  });
});

describe("APIService filterSpecialChar()", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns alphanumeric strings + approved special characters unchanged", () => {
    const testText =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!@#$%&*()-_+={}[]|:;'<>,.?/~` ";
    const result = APIService.filterSpecialChar(testText);
    expect(result).toEqual(testText);
  });

  it("returns empty strings without breaking", () => {
    const testText = "";
    const result = APIService.filterSpecialChar(testText);
    expect(result).toEqual(testText);
  });

  it("returns undefined value without breaking", () => {
    let testText;
    const result = APIService.filterSpecialChar(testText);
    expect(result).toEqual(testText);
  });

  it("filters out slashes and quotes", () => {
    const testText = `test text. should have: // should not have:\ ""`;
    const result = APIService.filterSpecialChar(testText);
    expect(result).toBe(`test text. should have: // should not have: `);
  });

  it("filters out slashes and quotes (2) (the way it appears in the e2e testing)", () => {
    const testText = `aabb""//\\ `;
    const result = APIService.filterSpecialChar(testText);
    expect(result).toBe(`aabb// `);
  });
});

describe("APIService _sendPostRequest", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls axios with correct arguments", () => {
    APIService._sendPostRequest("argument1", "argument2", "argument3");
    expect(spyOnAxiosPost).toHaveBeenCalledWith("argument1", "argument3", {
      headers: {
        "Content-Type": "application/json",
        "Response-Type": "application/json",
        "X-Authorization": "Bearer argument2",
      },
    });
  });
});
