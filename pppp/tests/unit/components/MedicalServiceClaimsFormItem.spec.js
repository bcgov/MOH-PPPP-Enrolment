import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import * as dummyDataPatient from "../../../src/store/states/pay-patient-form-dummy-data";
//in the long term, I want to move this into the components folder
//but for now I'll import it from its current location in /views
import Component from "@/views/pay-patient/MedicalServiceClaimsFormItem";
// import Component from "@/components/MedicalServiceClaimsFormItem.vue";

const testDateFutureYear = new Date();
testDateFutureYear.setFullYear(testDateFutureYear.getFullYear() + 1);

const testDateFutureMonth = new Date();
testDateFutureMonth.setMonth(testDateFutureMonth.getMonth() + 1);

const mockRouter = {
  $route: {
    path: "/",
  },
  $router: {
    push: jest.fn(),
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
    push: jest.fn(),
    currentRoute: {
      value: {
        path: "/pay-patient-csr/main-form",
      },
    },
  },
};

const passingClaim = cloneDeep(
  dummyDataPatient.default.medicalServiceClaims[0]
);

const passingProps = {
  index: 0,
  serviceDateData: passingClaim.serviceDateData,
  numberOfServices: passingClaim.numberOfServices,
  serviceDate: passingClaim.serviceDate,
  feeItem: passingClaim.feeItem,
  amountBilled: passingClaim.amountBilled,
  calledStartTime: passingClaim.calledStartTime,
  renderedFinishTime: passingClaim.renderedFinishTime,
  diagnosticCode: passingClaim.diagnosticCode,
  locationOfService: passingClaim.locationOfService,
  serviceClarificationCode: passingClaim.serviceClarificationCode,
  correspondenceAttached: passingClaim.correspondenceAttached,
  submissionCode: passingClaim.submissionCode,
  notes: passingClaim.notes,
  medicalServiceClaimsFeeItemValidationError: false,
};

describe("MedicalServiceClaimsFormItem.vue", () => {
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

describe("MedicalServiceClaimsFormItem handleInputServiceFeeItem()", () => {
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
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("emits update:feeItem and update:medicalServiceClaimsFeeItemValidationError", async () => {
    expect(wrapper.emitted()).not.toHaveProperty("update:feeItem");
    expect(wrapper.emitted()).not.toHaveProperty(
      "update:medicalServiceClaimsFeeItemValidationError"
    );
    wrapper.vm.handleInputServiceFeeItem(0);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()).toHaveProperty("update:feeItem");
    expect(wrapper.emitted()).toHaveProperty(
      "update:medicalServiceClaimsFeeItemValidationError"
    );
  });
});

describe("MedicalServiceClaimsFormItem getServiceDateFutureErrorMessage()", () => {
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
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns correct message when 1 claim", () => {
    const result = wrapper.vm.getServiceDateFutureErrorMessage();
    expect(result).not.toContain("90"); //eg. "90 days in the future"
  });

  it("returns correct message when more than 1 claim", async () => {
    const result = wrapper.vm.getServiceDateFutureErrorMessage("03333");
    expect(result).toContain("90"); //eg. "90 days in the future"
  });
});

describe("MedicalServiceClaimsFormItem isSubmissionCodeRequired()", () => {
  const testDatePast89Days = new Date();
  testDatePast89Days.setDate(testDatePast89Days.getDate() - 89);

  const testDatePast91Days = new Date();
  testDatePast91Days.setDate(testDatePast91Days.getDate() - 91);
  
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
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false when service date is null", async () => {
    await wrapper.setProps({ serviceDate: null })
    expect(wrapper.vm.serviceDate).toBeNull();
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });

  it("returns false when service date is less than 90 days ago", async () => {
    await wrapper.setProps({ serviceDate: testDatePast89Days })
    expect(wrapper.vm.serviceDate).toStrictEqual(testDatePast89Days);
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });

  it("returns true when service date is more than 90 days ago", async () => {
    await wrapper.setProps({ serviceDate: testDatePast91Days })
    expect(wrapper.vm.serviceDate).toStrictEqual(testDatePast91Days);
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toBe(true);
  });

  it("returns false when route is CSR", async () => {
    wrapper = mount(Component, {
      global: {
        mocks: mockRouterCSR,
      },
    });
    await wrapper.setProps({ serviceDate: testDatePast91Days })
    expect(wrapper.vm.serviceDate).toStrictEqual(testDatePast91Days);
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });
});

describe("MedicalServiceClaimsFormItem validations (CSR)", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      props: passingProps,
      global: {
        mocks: mockRouterCSR,
      },
    });
  });

  it("(serviceDate) flags valid when passed valid data", async () => {
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
  });

  it("(serviceDate) flags valid if not present", async () => {
    await wrapper.setProps({ serviceDate: null })
    expect(wrapper.vm.serviceDate).toBeNull();
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
  });

  it("(serviceDate) flags valid if given date is far in the past", async () => {
    const testData = new Date(1595, 11, 17);
    await wrapper.setProps({ serviceDate: testData })
    expect(wrapper.vm.serviceDate).toStrictEqual(testData);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
  });

  it("(serviceDate) flags valid if given date is more than 90 days in future", async () => {
    //see related tests at the end of this section for <90 day tests
    //please note that a fee item of 03333 can affect whether future dates pass or not
    await wrapper.setProps({ serviceDate: testDateFutureYear })
    expect(wrapper.vm.serviceDate).toStrictEqual(testDateFutureYear);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
  });

  it("(serviceDate) flags invalid if given invalid date", async () => {
    const invalidDate = {
      month: 0,
      day: "32",
      year: "2020",
    };

    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
    await wrapper.setProps({ serviceDateData: invalidDate })
    expect(wrapper.vm.serviceDateData).toStrictEqual(invalidDate);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(true);
  });

  it("(serviceDate) flags valid if given date is after Oct 1 2021 and location is A", async () => {
    const testServiceDate = new Date(2021, 10, 3);
    const testLocation = "A"
    await wrapper.setProps({ serviceDate: testServiceDate });
    await wrapper.setProps({ locationOfService: testLocation });
    expect(wrapper.vm.serviceDate).toStrictEqual(testServiceDate);
    expect(wrapper.vm.locationOfService).toStrictEqual(testLocation);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
  });

  it("(serviceDate) flags valid if given date is before Oct 1 2021 and location is A", async () => {
    const testServiceDate = new Date(2021, 8, 28);
    const testLocation = "A"
    await wrapper.setProps({ serviceDate: testServiceDate });
    await wrapper.setProps({ locationOfService: testLocation });
    expect(wrapper.vm.serviceDate).toStrictEqual(testServiceDate);
    expect(wrapper.vm.locationOfService).toStrictEqual(testLocation);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
  });

  it("(serviceDate) flags valid if date is within 90 days of the future and fee item is 03333", async () => {
    const testFeeItem = "03333";
    await wrapper.setProps({ serviceDate: testDateFutureMonth })
    await wrapper.setProps({ feeItem: testFeeItem })
    expect(wrapper.vm.serviceDate).toStrictEqual(testDateFutureMonth);
    expect(wrapper.vm.feeItem).toStrictEqual(testFeeItem);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
  });

  it("(serviceDate) flags valid if date is within 90 days of the future and fee item is not 03333", async () => {
    const testFeeItem = "11111";
    await wrapper.setProps({ serviceDate: testDateFutureMonth })
    await wrapper.setProps({ feeItem: testFeeItem })
    expect(wrapper.vm.serviceDate).toStrictEqual(testDateFutureMonth);
    expect(wrapper.vm.feeItem).toStrictEqual(testFeeItem);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
  });

  it("(numberOfServices) flags invalid if not integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData })
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });

  it("(numberOfServices) flags valid if not present", async () => {
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: null })
    expect(wrapper.vm.numberOfServices).toBeNull();
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
  });

  it("(numberOfServices) flags invalid if not integer", async () => {
    const testData = "a"; 
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData })
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });

  it("(numberOfServices) flags invalid if negative integer", async () => {
    const testData = "-2"; 
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData })
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });

  it("(numberOfServices) flags valid if zero", async () => {
    const testData = "0"; 
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData })
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
  });

  it("(feeItem) flags valid if not present", async () => { 
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
    await wrapper.setProps({ feeItem: null })
    expect(wrapper.vm.feeItem).toBeNull();
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
  });

  it("(feeItem) flags invalid if not integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
    await wrapper.setProps({ feeItem: testData })
    expect(wrapper.vm.feeItem).toStrictEqual(testData);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(true);
  });

  it("(feeItem) flags invalid if negative integer", async () => {
    const testData = "-2";
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
    await wrapper.setProps({ feeItem: testData })
    expect(wrapper.vm.feeItem).toStrictEqual(testData);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(true);
  });

  it("(amountBilled) flags valid if not present", async () => {
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: null })
    expect(wrapper.vm.amountBilled).toBeNull();
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
  });

  it("(amountBilled) flags invalid if negative integer", async () => {
    const testData = "-2.00";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testData })
    expect(wrapper.vm.amountBilled).toStrictEqual(testData);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(amountBilled) flags invalid if it doesn't end in .00", async () => {
    const testData = "2";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testData })
    expect(wrapper.vm.amountBilled).toStrictEqual(testData);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(amountBilled) flags valid if it does end in .00", async () => {
    const testData = "2.00";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testData })
    expect(wrapper.vm.amountBilled).toStrictEqual(testData);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
  });

  it("(amountBilled) flags invalid if value is correct but fee item is 03333", async () => {
    const testAmountBilled = "2.00";
    const testFeeItem = "03333";
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(false);
    expect(wrapper.vm.v$.feeItem.$invalid).toBe(false);
    await wrapper.setProps({ amountBilled: testAmountBilled })
    await wrapper.setProps({ feeItem: testFeeItem })
    expect(wrapper.vm.amountBilled).toStrictEqual(testAmountBilled);
    expect(wrapper.vm.feeItem).toStrictEqual(testFeeItem);
    expect(wrapper.vm.v$.amountBilled.$invalid).toBe(true);
  });

  it("(calledStartTime) flags invalid if hour not present but minute is", async () => {
    const testData = {hour: null, minute: "25"};
    expect(wrapper.vm.v$.calledStartTime.$invalid).toBe(false);
    await wrapper.setProps({ calledStartTime: testData })
    expect(wrapper.vm.calledStartTime).toStrictEqual(testData);
    expect(wrapper.vm.v$.calledStartTime.$invalid).toBe(true);
  });

  it("(calledStartTime) flags invalid if hour present but minute is not", async () => {
    const testData = {hour: "12", minute: null};
    expect(wrapper.vm.v$.calledStartTime.$invalid).toBe(false);
    await wrapper.setProps({ calledStartTime: testData })
    expect(wrapper.vm.calledStartTime).toStrictEqual(testData);
    expect(wrapper.vm.v$.calledStartTime.$invalid).toBe(true);
  });

  it("(renderedFinishTime) flags invalid if hour not present but minute is", async () => {
    const testData = {hour: null, minute: "25"};
    expect(wrapper.vm.v$.renderedFinishTime.$invalid).toBe(false);
    await wrapper.setProps({ renderedFinishTime: testData })
    expect(wrapper.vm.renderedFinishTime).toStrictEqual(testData);
    expect(wrapper.vm.v$.renderedFinishTime.$invalid).toBe(true);
  });

  it("(renderedFinishTime) flags invalid if hour present but minute is not", async () => {
    const testData = {hour: "12", minute: null};
    expect(wrapper.vm.v$.renderedFinishTime.$invalid).toBe(false);
    await wrapper.setProps({ renderedFinishTime: testData })
    expect(wrapper.vm.renderedFinishTime).toStrictEqual(testData);
    expect(wrapper.vm.v$.renderedFinishTime.$invalid).toBe(true);
  });

  it("(diagnosticCode) flags valid if not present", async () => {
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
    await wrapper.setProps({ diagnosticCode: null })
    expect(wrapper.vm.diagnosticCode).toBeNull();
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
  });

  it("(diagnosticCode) flags invalid if not alphanumeric", async () => {
    const testData = "a^^^";
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
    await wrapper.setProps({ diagnosticCode: testData })
    expect(wrapper.vm.diagnosticCode).toStrictEqual(testData);
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(true);
  });

  it("(diagnosticCode) flags valid if not on diagnostic list", async () => {
    const testData = "A111";
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
    await wrapper.setProps({ diagnosticCode: testData })
    expect(wrapper.vm.diagnosticCode).toStrictEqual(testData);
    expect(wrapper.vm.v$.diagnosticCode.$invalid).toBe(false);
  });

  it("(locationOfService) flags valid if not present", async () => {
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: null })
    expect(wrapper.vm.locationOfService).toBeNull();
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
  });

  it("(locationOfService) flags valid if A and after Oct 1st 2021", async () => {
    const testlocationOfService = "A";
    const testserviceDate = new Date(2021, 10, 3);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: testlocationOfService })
    await wrapper.setProps({ serviceDate: testserviceDate })
    expect(wrapper.vm.locationOfService).toStrictEqual(testlocationOfService);
    expect(wrapper.vm.serviceDate).toStrictEqual(testserviceDate);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
  });

  it("(locationOfService) flags valid if A and before Oct 1st 2021", async () => {
    const testlocationOfService = "A";
    const testserviceDate = new Date(2021, 8, 28);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
    expect(wrapper.vm.v$.serviceDate.$invalid).toBe(false);
    await wrapper.setProps({ locationOfService: testlocationOfService })
    await wrapper.setProps({ serviceDate: testserviceDate })
    expect(wrapper.vm.locationOfService).toStrictEqual(testlocationOfService);
    expect(wrapper.vm.serviceDate).toStrictEqual(testserviceDate);
    expect(wrapper.vm.v$.locationOfService.$invalid).toBe(false);
  });
});
