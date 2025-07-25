import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import * as dummyDataPractitioner from "../../../src/store/states/pay-practitioner-form-dummy-data";
import Component from "@/components/HospitalVisitClaimsFormItem.vue";
import apiService from "@/services/api-service";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";

const testDateFutureYear = new Date();
testDateFutureYear.setFullYear(testDateFutureYear.getFullYear() + 1);

const testDateFutureMonth = new Date();
testDateFutureMonth.setMonth(testDateFutureMonth.getMonth() + 1);

const testDatePast91Days = new Date();
testDatePast91Days.setDate(testDatePast91Days.getDate() - 91);

const testDatePast89Days = new Date();
testDatePast89Days.setDate(testDatePast89Days.getDate() - 89);

const testDatePastYear = new Date();
testDatePastYear.setFullYear(testDatePastYear.getFullYear() - 1);

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

const mockRouter = {
  $route: {
    path: "/",
  },
  $router: {
    push: vi.fn(),
    currentRoute: {
      value: {
        path: "/pay-patient/main-form",
      },
    },
  },
};

const mockRouterCSR = {
  $route: {
    path: "/",
  },
  $router: {
    push: vi.fn(),
    currentRoute: {
      value: {
        path: "/pay-patient-csr/main-form",
      },
    },
  },
};

const passingClaim = cloneDeep(
  dummyDataPractitioner.default.hospitalVisitClaims[0]
);

const passingProps = {
  ...passingClaim,
  index: 0,
};

vi.mock("axios", () => ({
  get: vi.fn(),
  post: vi.fn(() => {
    return Promise.resolve(mockBackendValidationResponse);
  }),
}));

const spyOnAPIService = vi
  .spyOn(apiService, "validateApplication")
  .mockImplementation(() => Promise.resolve(mockBackendValidationResponse));

const scrollHelper = require("@/helpers/scroll");

vi.mock("@/helpers/scroll", () => ({
  scrollTo: vi.fn(),
  scrollToError: vi.fn(),
  getTopScrollPosition: vi.fn(),
}));

vi.spyOn(window, "scrollTo").mockImplementation(vi.fn);

const spyOnScrollToError = vi.spyOn(scrollHelper, "scrollToError");
const spyOnScrollTo = vi.spyOn(scrollHelper, "scrollTo");

const spyOnGetTopScrollPosition = vi
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnSetPageComplete = vi
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
const spyOnSetPageIncomplete = vi
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));
const spyOnVisitPage = vi
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

const spyOnLogNavigation = vi
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));



describe("HospitalVisitClaimsFormItem.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      props: passingProps,
      global: {
        mocks: mockRouter,
      },
    });
  });

  it("renders", () => {
    //example check that sample data is being passed down, mounted, and validated correctly
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    expect(wrapper.element).toBeDefined();
  });
});

describe("HospitalVisitClaimsFormItem.vue handleInputHospitalVisitFeeItem()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    wrapper = mount(Component, {
      props: passingProps,
      global: {
        mocks: mockRouter,
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("emits update vue model events", async () => {
    expect(wrapper.emitted()).not.toHaveProperty("update:feeItem");
    expect(wrapper.emitted()).not.toHaveProperty(
      "update:hospitalVisitClaimsFeeItemValidationError"
    );
    wrapper.vm.handleInputHospitalVisitFeeItem(0);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()).toHaveProperty("update:feeItem");
    expect(wrapper.emitted()).toHaveProperty(
      "update:hospitalVisitClaimsFeeItemValidationError"
    );
  });
});

describe("HospitalVisitClaimsFormItem.vue isHospitalVisitSubmissionCodeRequired()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    wrapper = mount(Component, {
      props: passingProps,
      global: {
        mocks: mockRouter,
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns false when serviceDate is null", async () => {
    await wrapper.setProps({ year: null });
    await wrapper.setProps({ month: null });
    await wrapper.setProps({ dayFrom: null });
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });

  it("returns false when service date is less than 90 days ago", async () => {
    await wrapper.setProps({
      year: testDatePast89Days.getFullYear().toString(),
    });
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast89Days.getMonth() + 1;
    await wrapper.setProps({ month: correctedMonth.toString() });
    await wrapper.setProps({
      dayFrom: testDatePast89Days.getDate().toString(),
    });
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });

  it("returns true when service date is more than 90 days ago", async () => {
    await wrapper.setProps({
      year: testDatePast91Days.getFullYear().toString(),
    });
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast91Days.getMonth() + 1;
    await wrapper.setProps({ month: correctedMonth.toString() });
    await wrapper.setProps({
      dayFrom: testDatePast91Days.getDate().toString(),
    });
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toBe(true);
  });

  it("returns false when route is CSR", async () => {
    wrapper = mount(Component, {
      props: passingProps,
      global: {
        mocks: mockRouterCSR,
      },
    });
    await wrapper.setProps({
      year: testDatePast91Days.getFullYear().toString(),
    });
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast91Days.getMonth() + 1;
    await wrapper.setProps({ month: correctedMonth.toString() });
    await wrapper.setProps({
      dayFrom: testDatePast91Days.getDate().toString(),
    });
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });
});

describe("HospitalVisitClaimsFormItem.vue validations (public)", () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = mount(Component, {
      props: passingProps,
      global: {
        mocks: mockRouter,
      },
    });
  });

  afterEach(() => {    
    vi.clearAllMocks();
  });

  it("(month) flags valid when passed valid data", async () => {
    expect(wrapper.vm.v$.month.$invalid).toBe(false);
  });

  it("(month, hospitalVisitClaims) flags invalid if not present", async () => {
    await wrapper.setProps({ month: null });
    expect(wrapper.vm.month).toBeNull();
    expect(wrapper.vm.v$.month.$invalid).toBe(true);
  });

  it("(month, hospitalVisitClaims) flags invalid if not an integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.month.$invalid).toBe(false);
    await wrapper.setProps({ month: testData });
    expect(wrapper.vm.month).toStrictEqual(testData);
    expect(wrapper.vm.v$.month.$invalid).toBe(true);
  });

  it("(month, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.month.$invalid).toBe(false);
    await wrapper.setProps({ month: testData });
    expect(wrapper.vm.month).toStrictEqual(testData);
    expect(wrapper.vm.v$.month.$invalid).toBe(true);
  });

  it("(dayFrom, hospitalVisitClaims) flags invalid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.dayFrom.$invalid).toBe(false);
    await wrapper.setProps({ dayFrom: testData });
    expect(wrapper.vm.dayFrom).toStrictEqual(testData);
    expect(wrapper.vm.v$.dayFrom.$invalid).toBe(true);
  });

  it("(dayFrom, hospitalVisitClaims) flags invalid if not an integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.dayFrom.$invalid).toBe(false);
    await wrapper.setProps({ dayFrom: testData });
    expect(wrapper.vm.dayFrom).toStrictEqual(testData);
    expect(wrapper.vm.v$.dayFrom.$invalid).toBe(true);
  });

  it("(dayFrom, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.dayFrom.$invalid).toBe(false);
    await wrapper.setProps({ dayFrom: testData });
    expect(wrapper.vm.dayFrom).toStrictEqual(testData);
    expect(wrapper.vm.v$.dayFrom.$invalid).toBe(true);
  });

  it("(dayTo, hospitalVisitClaims) flags valid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testData });
    expect(wrapper.vm.dayTo).toStrictEqual(testData);
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(false);
  });

  it("(dayTo, hospitalVisitClaims) flags valid if not present (string)", async () => {
    const testData = "";
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testData });
    expect(wrapper.vm.dayTo).toStrictEqual(testData);
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(false);
  });

  it("(dayTo, hospitalVisitClaims) flags invalid if not an integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testData });
    expect(wrapper.vm.dayTo).toStrictEqual(testData);
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(true);
  });

  it("(dayTo, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testData });
    expect(wrapper.vm.dayTo).toStrictEqual(testData);
    expect(wrapper.vm.v$.dayTo.$invalid).toBe(true);
  });

  it("(year, hospitalVisitClaims) flags invalid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.year.$invalid).toBe(false);
    await wrapper.setProps({ year: testData });
    expect(wrapper.vm.year).toStrictEqual(testData);
    expect(wrapper.vm.v$.year.$invalid).toBe(true);
  });

  it("(year, hospitalVisitClaims) flags invalid if not an integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.year.$invalid).toBe(false);
    await wrapper.setProps({ year: testData });
    expect(wrapper.vm.year).toStrictEqual(testData);
    expect(wrapper.vm.v$.year.$invalid).toBe(true);
  });

  it("(year, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.year.$invalid).toBe(false);
    await wrapper.setProps({ year: testData });
    expect(wrapper.vm.year).toStrictEqual(testData);
    expect(wrapper.vm.v$.year.$invalid).toBe(true);
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData });
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if not an integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData });
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData });
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if zero", async () => {
    const testData = "0";
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData });
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });

  it("(feeItem, hospitalVisitClaims) flags invalid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
    await wrapper.setProps({ feeItem: testData });
    expect(wrapper.vm.feeItem).toStrictEqual(testData);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(true);
  });

  it("(feeItem, hospitalVisitClaims) flags invalid if not an integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
    await wrapper.setProps({ feeItem: testData });
    expect(wrapper.vm.feeItem).toStrictEqual(testData);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(true);
  });

  it("(feeItem, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
    await wrapper.setProps({ feeItem: testData });
    expect(wrapper.vm.feeItem).toStrictEqual(testData);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(true);
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testData });
    expect(wrapper.vm.amountBilled).toStrictEqual(testData);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not an integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testData });
    expect(wrapper.vm.amountBilled).toStrictEqual(testData);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testData });
    expect(wrapper.vm.amountBilled).toStrictEqual(testData);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not a positive integer ending in .00", async () => {
    const testData = "2";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testData });
    expect(wrapper.vm.amountBilled).toStrictEqual(testData);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(amountBilled, hospitalVisitClaims) flags valid if it does end in .00", async () => {
    const testAmount = "2.00";
    const testFeeItem = "00010";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testAmount });
    await wrapper.setProps({ feeItem: testFeeItem });
    expect(wrapper.vm.amountBilled).toStrictEqual(testAmount);
    expect(wrapper.vm.feeItem).toStrictEqual(testFeeItem);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if value is correct but fee item is 03333", async () => {
    const testAmount = "2.00";
    const testFeeItem = "03333";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testAmount });
    await wrapper.setProps({ feeItem: testFeeItem });
    expect(wrapper.vm.amountBilled).toStrictEqual(testAmount);
    expect(wrapper.vm.feeItem).toStrictEqual(testFeeItem);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(diagnosticCode, hospitalVisitClaims) flags invalid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
    await wrapper.setProps({ diagnosticCode: testData });
    expect(wrapper.vm.diagnosticCode).toStrictEqual(testData);
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(true);
  });

  it("(diagnosticCode, hospitalVisitClaims) flags invalid if not alphanumeric", async () => {
    const testData = "a^^^";
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
    await wrapper.setProps({ diagnosticCode: testData });
    expect(wrapper.vm.diagnosticCode).toStrictEqual(testData);
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(true);
  });

  it("(diagnosticCode, hospitalVisitClaims) flags invalid if not on diagnostic list", async () => {
    const testData = "A111";
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
    await wrapper.setProps({ diagnosticCode: testData });
    expect(wrapper.vm.diagnosticCode).toStrictEqual(testData);
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(true);
  });

  it("(locationOfService, hospitalVisitClaims) flags invalid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: testData });
    expect(wrapper.vm.locationOfService).toStrictEqual(testData);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(true);
  });

  it("(locationOfService, hospitalVisitClaims) flags invalid if A and after Oct 1st 2021", async () => {
    const testData = "A";
    const testDayTo = null;
    const testDayFrom = "3";
    const testMonth = "11";
    const testYear = "2021";
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: testData });
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.locationOfService).toStrictEqual(testData);
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(true);
  });

  it("(locationOfService, hospitalVisitClaims) flags valid if A and before Oct 1st 2021", async () => {
    const testData = "A";
    const testDayTo = null;
    const testDayFrom = "3";
    const testMonth = "8";
    const testYear = "2021";
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: testData });
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.locationOfService).toStrictEqual(testData);
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
  });

  it("(serviceClarificationCode, hospitalVisitClaims) flags valid if not present", async () => {
    const testData = null;
    expect(wrapper.vm.v$.serviceClarificationCode.$invalid).toBe(false);
    await wrapper.setProps({ serviceClarificationCode: testData });
    expect(wrapper.vm.serviceClarificationCode).toStrictEqual(testData);
    expect(wrapper.vm.v$.serviceClarificationCode.$invalid).toBe(false);
  });

  it("(serviceClarificationCode, hospitalVisitClaims) flags invalid if value is not in list", async () => {
    const testData = "AA";
    expect(wrapper.vm.v$.serviceClarificationCode.$invalid).toBe(false);
    await wrapper.setProps({ serviceClarificationCode: testData });
    expect(wrapper.vm.serviceClarificationCode).toStrictEqual(testData);
    expect(wrapper.vm.v$.serviceClarificationCode.$invalid).toBe(true);
  });

  it("(submissionCode, hospitalVisitClaims) flags invalid if not present and more than 90 days ago", async () => {
    const testSubmissionCode = null;
    const testDayTo = null;
    const testDayFrom = testDatePast91Days
      .getDate()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const testMonth = (testDatePast91Days.getMonth() + 1).toString();
    const testYear = testDatePast91Days
      .getFullYear()
      .toString();
    expect(wrapper.vm.v$.submissionCode.$invalid).toBe(false);
    await wrapper.setProps({ submissionCode: testSubmissionCode });
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.submissionCode).toStrictEqual(testSubmissionCode);
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.submissionCode.$invalid).toBe(true);
  });

  it("(submissionCode, hospitalVisitClaims) flags valid if not present and less than 90 days ago", async () => {
    const testSubmissionCode = null;
    const testDayTo = null;
    const testDayFrom = testDatePast89Days
      .getDate()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const testMonth = (testDatePast89Days.getMonth() + 1).toString();
    const testYear = testDatePast89Days
      .getFullYear()
      .toString();
    expect(wrapper.vm.v$.submissionCode.$invalid).toBe(false);
    await wrapper.setProps({ submissionCode: testSubmissionCode });
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.submissionCode).toStrictEqual(testSubmissionCode);
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.submissionCode.$invalid).toBe(false);
  });

  it("(notes, hospitalVisitClaims) flags invalid if more than 400 characters", async () => {
    const testData =
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    expect(wrapper.vm.v$.notes.$invalid).toBe(false);
    await wrapper.setProps({ notes: testData });
    expect(wrapper.vm.notes).toStrictEqual(testData);
    expect(wrapper.vm.v$.notes.$invalid).toBe(true);
  });

  it("(each, hospitalVisitDateValidator, hospitalVisitClaims) flags invalid if date is invalid", async () => {
    const testDayTo = null;
    const testDayFrom = "32"
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const testMonth = (testDatePast91Days.getMonth() + 1).toString();
    const testYear = testDatePast91Days
      .getFullYear()
      .toString();
    expect(wrapper.vm.v$.hospitalVisitDateValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateValidator.$invalid).toBe(true);
  });

  it("(each, hospitalVisitDatePastValidator, hospitalVisitClaims) flags valid if date is in past 18 months", async () => {
    const testDayTo = null;
    const testDayFrom = testDatePast91Days
      .getDate()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const testMonth = (testDatePast91Days.getMonth() + 1).toString();
    const testYear = testDatePast91Days
      .getFullYear()
      .toString();
    expect(wrapper.vm.v$.hospitalVisitDatePastValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDatePastValidator.$invalid).toBe(false);
  });

  it("(each, hospitalVisitDatePastValidator, hospitalVisitClaims) flags invalid if date more than 18 months old", async () => {
    const testDayTo = null;
    const testDayFrom = testDatePast91Days
      .getDate()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const testMonth = (testDatePast91Days.getMonth() + 1).toString();
    const testYear = "2001";
    expect(wrapper.vm.v$.hospitalVisitDatePastValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDatePastValidator.$invalid).toBe(true);
  });

  it("(each, hospitalVisitDateFutureValidator, hospitalVisitClaims) flags invalid if date is in future", async () => {
    const testDayTo = null;
    const testDayFrom = testDatePast91Days
      .getDate()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const testMonth = (testDatePast91Days.getMonth() + 1).toString();
    const testYear = testDateFutureYear.toString();
    expect(wrapper.vm.v$.hospitalVisitDateFutureValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateFutureValidator.$invalid).toBe(true);
  });

  it("(each, hospitalVisitDateToFutureValidator, hospitalVisitClaims) flags invalid if date is in future", async () => {
    //date to isn't really possible to test independent of day from, due to date storage constraints
    //for example, if dayFrom is the last day of the month, there's no way to store a dayTo after that
    //since they both pull from the same month/year
    //so this test will have to suffice
    const testDayTo = "19";
    const testDayFrom = "18"
    const testMonth = "1"
    const testYear = testDateFutureYear.toString();
    expect(wrapper.vm.v$.hospitalVisitDateFutureValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateFutureValidator.$invalid).toBe(true);
  });

  it("(each, hospitalVisitDateRangeValidator, hospitalVisitClaims) flags valid if date is correct and there is no dayTo", async () => {
    const testDayTo = null;
    const testDayFrom = "18";
    const testMonth = "1";
    const testYear = testDatePastYear
    .getFullYear()
    .toString();
    expect(wrapper.vm.v$.hospitalVisitDateRangeValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateRangeValidator.$invalid).toBe(false);
  });

  it("(each, hospitalVisitDateRangeValidator, hospitalVisitClaims) flags valid if date is correct and dayTo is after dayFrom", async () => {
    const testDayTo = "19";
    const testDayFrom = "18";
    const testMonth = "1";
    const testYear = testDatePastYear
    .getFullYear()
    .toString();
    expect(wrapper.vm.v$.hospitalVisitDateRangeValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateRangeValidator.$invalid).toBe(false);
  });

  it("(each, hospitalVisitDateRangeValidator, hospitalVisitClaims) flags invalid if date is correct and dayTo is before dayFrom", async () => {
    const testDayTo = "17";
    const testDayFrom = "18";
    const testMonth = "1";
    const testYear = testDatePastYear
    .getFullYear()
    .toString();
    expect(wrapper.vm.v$.hospitalVisitDateRangeValidator.$invalid).toBe(false);
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateRangeValidator.$invalid).toBe(true);
  });

  it("(each, hospitalVisitDateCutOffValidator, hospitalVisitClaims) flags invalid if date is correct + after Oct 1 2021, and locationOfService is A", async () => {
    const testData = "A";
    const testDayTo = null;
    const testDayFrom = "3";
    const testMonth = "10";
    const testYear = "2021";
    expect(wrapper.vm.v$.hospitalVisitDateCutOffValidator.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: testData });
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.locationOfService).toStrictEqual(testData);
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateCutOffValidator.$invalid).toBe(true);
  });

  it("(each, hospitalVisitDateCutOffValidator, hospitalVisitClaims) flags valid if date is correct + before Oct 1 2021, and locationOfService is A", async () => {
    const testData = "A";
    const testDayTo = null;
    const testDayFrom = "3";
    const testMonth = "5";
    const testYear = "2021";
    expect(wrapper.vm.v$.hospitalVisitDateCutOffValidator.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: testData });
    await wrapper.setProps({ dayTo: testDayTo });
    await wrapper.setProps({ dayFrom: testDayFrom });
    await wrapper.setProps({ month: testMonth });
    await wrapper.setProps({ year: testYear });
    expect(wrapper.vm.locationOfService).toStrictEqual(testData);
    expect(wrapper.vm.dayTo).toStrictEqual(testDayTo);
    expect(wrapper.vm.dayFrom).toStrictEqual(testDayFrom);
    expect(wrapper.vm.month).toStrictEqual(testMonth);
    expect(wrapper.vm.year).toStrictEqual(testYear);
    expect(wrapper.vm.v$.hospitalVisitDateCutOffValidator.$invalid).toBe(false);
  });
});
