import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import * as dummyDataPatient from "../../../src/store/states/pay-patient-form-dummy-data";
//in the long term, I want to move this into the components folder
//but for now I'll import it from its current location in /views
import Component from "@/views/pay-patient/MedicalServiceClaimsFormItem";
// import Component from "@/components/MedicalServiceClaimsFormItem.vue";

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

describe("MedicalServiceClaimsFormItem validations", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      props: passingProps,
      global: {
        mocks: mockRouter,
      },
    });
  });

  it("(numberOfServices) flags invalid if not integer", async () => {
    const testData = "a";
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(false);
    await wrapper.setProps({ numberOfServices: testData })
    expect(wrapper.vm.numberOfServices).toStrictEqual(testData);
    expect(wrapper.vm.v$.numberOfServices.$invalid).toBe(true);
  });
});
