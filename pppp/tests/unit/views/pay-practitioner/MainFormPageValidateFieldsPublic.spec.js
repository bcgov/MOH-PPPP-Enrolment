import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-practitioner/MainFormPage.vue";
import * as dummyDataValid from "../../../../src/store/states/pay-practitioner-form-dummy-data";
import apiService from "@/services/api-service";
import * as scrollHelper from "@/helpers/scroll";
import { defaultStoreTemplate, mockRouter, failingData } from "../../test-helper.js";

const testDateFutureDay = new Date();
testDateFutureDay.setDate(testDateFutureDay.getDate() + 1);

const testDateFutureYear = new Date();
testDateFutureYear.setFullYear(testDateFutureYear.getFullYear() + 1);

const testDatePastYear = new Date();
testDatePastYear.setFullYear(testDatePastYear.getFullYear() - 1);

const testDateFutureMonth = new Date();
testDateFutureMonth.setMonth(testDateFutureMonth.getMonth() + 1);

const testDatePast89Days = new Date();
testDatePast89Days.setDate(testDatePast89Days.getDate() - 89);

const testDatePast91Days = new Date();
testDatePast91Days.setDate(testDatePast91Days.getDate() - 91);

const mockBackendValidationResponse = {
  data: {
    applicationUuid: "9f6b649b-c483-4327-b5a9-f5aa8d3bec13",
    requestUuid: "1dc94b87-86f9-4d92-a749-fb8b2fc1edaf",
    returnCode: "0",
    returnMessage: "Valid",
    practitionerFirstName: "Y",
    practitionerLastName: "Y",
    practitionerNumber: "Y",
    serviceFeeItem1: "Y",
    serviceFeeItem2: "",
    serviceFeeItem3: "",
    serviceFeeItem4: "",
    serviceLocationCode1: "",
    serviceLocationCode2: "",
    serviceLocationCode3: "",
    serviceLocationCode4: "",
    hospitalFeeItem1: "",
    hospitalFeeItem2: "",
    hospitalLocationCode1: "",
    hospitalLocationCode2: "",
  },
  status: 200,
  statusText: "OK",
};

const mockBackendValidationResponseFail = {
  data: {
    applicationUuid: "c440ae62-d591-40f8-b1fb-0f31bcb2def2",
    requestUuid: "cb0984f6-6811-45bb-974e-e02689097557",
    returnCode: "1",
    returnMessage: "Not valid",
    practitionerFirstName: "N",
    practitionerLastName: "N",
    practitionerNumber: "N",
    serviceFeeItem1: "Y",
    serviceFeeItem2: "",
    serviceFeeItem3: "",
    serviceFeeItem4: "",
    serviceLocationCode1: "",
    serviceLocationCode2: "",
    serviceLocationCode3: "",
    serviceLocationCode4: "",
    hospitalFeeItem1: "",
    hospitalFeeItem2: "",
    hospitalLocationCode1: "",
    hospitalLocationCode2: "",
  },
  status: 200,
  statusText: "OK",
};

const mockBackendValidationResponseDefault = {
  data: {},
  status: 200,
  statusText: "OK",
};

const passingData = cloneDeep(dummyDataValid.default);
passingData.medicalServiceClaims[0].feeItem = "00010";
passingData.hospitalVisitClaims[0].feeItem = "00010";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(() => {
      return Promise.resolve();
    }),
  },
}));

const spyOnAPIService = vi
  .spyOn(apiService, "validateApplication")
  .mockImplementation(() => Promise.resolve(mockBackendValidationResponse));

//to prevent console errors
vi.spyOn(scrollHelper, "scrollTo").mockImplementation(() => Promise.resolve("scrolled"));

const spyOnScrollToError = vi
  .spyOn(scrollHelper, "scrollToError")
  .mockImplementation(() => Promise.resolve("scrolled to error"));

const storeTemplate = cloneDeep(defaultStoreTemplate);

const practitionerState = cloneDeep(dummyDataValid.default);
storeTemplate.modules.payPractitionerForm.state = cloneDeep(practitionerState);

describe("MainFormPage.vue validateFields(), public", () => {
  let store;
  let wrapper;
  let spyOnNavigateToNextPage;

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });

    spyOnNavigateToNextPage = vi.spyOn(wrapper.vm, "navigateToNextPage");
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("navigates successfully when data is good", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("does not navigate successfully when data is bad", async () => {
    Object.assign(wrapper.vm, failingData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("does not navigate successfully when it gets an invalid backend validation response", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() =>
      Promise.resolve(mockBackendValidationResponseFail)
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("does not navigate successfully when it gets an unsuccessful backend validation", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() =>
      Promise.resolve(mockBackendValidationResponseDefault)
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("does not navigate successfully when it catches an error", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() => Promise.resolve("potato"));
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(PHN) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ phn: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(PHN) flags invalid if invalid entry", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ phn: "9999 999 999" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(PHN) flags invalid if PHN doesn't start with 9", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ phn: "7999 999 998" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if non number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if negative number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if not 00 or 66 with a PHN", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "55" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `1` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character (2)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `^` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags valid if contains alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `a` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(lastName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(lastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(lastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if not present and dependentNumber is not 66", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: null });
    await wrapper.setData({ dependentNumber: "00" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags valid if not present and dependentNumber is 66", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: null });
    await wrapper.setData({ dependentNumber: "66" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given date is too far in the past", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: new Date(1595, 11, 17) });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given date is in future", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: testDateFutureYear });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given invalid date", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({
      birthDateData: {
        month: 0,
        day: "32",
        year: "2020",
      },
    });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(isVehicleAccident) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ isVehicleAccident: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags invalid if not correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "^^^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags invalid if not correct format (2)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "88888888" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags valid if correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "AA111111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not positive", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPaymentNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPaymentNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPractitionerNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPractitionerNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFacilityNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFacilityNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if alphanumeric but not on list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "a^^^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not the minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "0" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not on the list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "98" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not numeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not positive number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags valid if minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "2222" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredByFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: "1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredByPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByPractitionerNumber: `1111` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: "1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredToPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToPractitionerNumber: `1111` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //miscellaneous conditions
  it("flags invalid if dependentNumber not 66 and birthdate not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: `00` });
    await wrapper.setData({ birthDate: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: `Q` });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: "Surname" });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: "11111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags valid if all three are null (referred By)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags invalid if referredTo first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: `Q` });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: "Surname" });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: "11111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags valid if all three are null and no fee item (referredTo)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags valid if planReferenceNumber is null", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });
});
