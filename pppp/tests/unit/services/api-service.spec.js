import APIService from "@/services/api-service";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import * as dummyDataPatient from "@/store/states/pay-patient-form-dummy-data";
import * as dummyDataPractitioner from "@/store/states/pay-practitioner-form-dummy-data";
import { cloneDeep } from "lodash";

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

  it("submitPayPatientApplication() calls axios with correct arguments", () => {
    const fakeArgument = cloneDeep(dummyDataPatient.default);
    fakeArgument.applicationUuid = "fakeApplicationUuid";
    APIService.submitPayPatientApplication("fakeToken", fakeArgument);
    expect(spyOnSendPostRequest).toHaveBeenCalledWith(
      "/pppp/api/payformsIntegration/patient/fakeApplicationUuid",
      "fakeToken",
      {
        applicationUuid: "fakeApplicationUuid",
        isCSR: "N",
        payPatient: {
          addressOwner: "PATIENT",
          birthDate: "1999-12-31",
          city: "Victoria",
          claimCount: "1",
          dependentNumber: "66",
          firstName: "Bob",
          isVehicleAccident: "Y",
          lastName: "Smith",
          medicalServiceClaims: [
            {
              amountBilled: "1.00",
              calledStartTime: "",
              correspondenceAttached: "",
              diagnosticCode: "001",
              feeItem: "12345",
              locationOfService: "A",
              notes: "Notes here.",
              numberOfServices: "1",
              renderedFinishTime: "",
              serviceClarificationCode: "A1",
              serviceDate: "2021-10-04",
              submissionCode: "I",
            },
          ],
          middleInitial: "H",
          phn: "9999999998",
          planReferenceNumber: "1234567890",
          planReferenceNumberOfOriginalClaim: "321",
          postalCode: "V8V8V8",
          practitionerFacilityNumber: "12345",
          practitionerFirstName: "J",
          practitionerLastName: "Doe",
          practitionerPaymentNumber: "A0001",
          practitionerPractitionerNumber: "22274",
          practitionerSpecialtyCode: "A1",
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

  it("submitPayPractitionerApplication() calls axios with correct arguments", () => {
    const fakeArgument = cloneDeep(dummyDataPractitioner.default);
    fakeArgument.applicationUuid = "fakeApplicationUuid";
    APIService.submitPayPatientApplication("fakeToken", fakeArgument);
    expect(spyOnSendPostRequest).toHaveBeenCalledWith(
      "/pppp/api/payformsIntegration/patient/fakeApplicationUuid",
      "fakeToken",
      {
        applicationUuid: "fakeApplicationUuid",
        isCSR: "N",
        payPatient: {
          addressOwner: "",
          birthDate: "2021-10-04",
          city: "",
          claimCount: undefined,
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
              feeItem: "03333",
              locationOfService: "A",
              notes: "Notes here.",
              numberOfServices: "1",
              renderedFinishTime: "",
              serviceClarificationCode: "A1",
              serviceDate: "2021-10-04",
              submissionCode: "I",
            },
          ],
          middleInitial: "H",
          phn: "9999999998",
          planReferenceNumber: "1234567890",
          planReferenceNumberOfOriginalClaim: "321",
          postalCode: "",
          practitionerFacilityNumber: "12345",
          practitionerFirstName: "J",
          practitionerLastName: "Doe",
          practitionerPaymentNumber: "A1234",
          practitionerPractitionerNumber: "22274",
          practitionerSpecialtyCode: "A1",
          referredByFirstNameInitial: "R",
          referredByLastName: "McDonald",
          referredByPractitionerNumber: "22271",
          referredToFirstNameInitial: "C",
          referredToLastName: "Lee",
          referredToPractitionerNumber: "22272",
          streetName: "",
          streetNumber: "",
          unitNumber: "",
          vehicleAccidentClaimNumber: "A0000001",
        },
        requestUuid: "uuid-123",
        submissionDate: "",
      }
    );
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
