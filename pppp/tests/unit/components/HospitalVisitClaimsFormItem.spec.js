import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import * as dummyDataPractitioner from "../../../src/store/states/pay-practitioner-form-dummy-data";
//in the long term, I want to move this into the components folder
//but for now I'll import it from its current location in /views
import Component from "@/components/HospitalVisitClaimsFormItem.vue";
// import Component from "@/components/MedicalServiceClaimsFormItem.vue";

const testDateFutureYear = new Date();
testDateFutureYear.setFullYear(testDateFutureYear.getFullYear() + 1);

const testDateFutureMonth = new Date();
testDateFutureMonth.setMonth(testDateFutureMonth.getMonth() + 1);

const testDatePast91Days = new Date();
testDatePast91Days.setDate(testDatePast91Days.getDate() - 91);

const testDatePast89Days = new Date();
testDatePast89Days.setDate(testDatePast89Days.getDate() - 89);

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
  dummyDataPractitioner.default.hospitalVisitClaims[0]
);

const passingProps = {
  ...passingClaim,
  index: 0,  
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

describe("MainFormPage.vue handleInputHospitalVisitFeeItem()", () => {
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
    jest.resetModules();
    jest.clearAllMocks();
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

describe("MainFormPage.vue isHospitalVisitSubmissionCodeRequired()", () => {
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
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false when serviceDate is null", async () => {
    await wrapper.setProps({ year: null });
    await wrapper.setProps({ month: null });
    await wrapper.setProps({ dayFrom: null });
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });

  it("returns false when service date is less than 90 days ago", async () => {
    await wrapper.setProps({ year: testDatePast89Days
      .getFullYear()
      .toString() });
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast89Days.getMonth() + 1;
    await wrapper.setProps({ month: correctedMonth.toString() });
    await wrapper.setProps({ dayFrom: testDatePast89Days
      .getDate()
      .toString() });
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });

  it("returns true when service date is more than 90 days ago", async () => {
    await wrapper.setProps({ year: testDatePast91Days
      .getFullYear()
      .toString() });
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast91Days.getMonth() + 1;
    await wrapper.setProps({ month: correctedMonth.toString() });
    await wrapper.setProps({ dayFrom: testDatePast91Days
      .getDate()
      .toString() });
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
    await wrapper.setProps({ year: testDatePast91Days
      .getFullYear()
      .toString() });
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast91Days.getMonth() + 1;
    await wrapper.setProps({ month: correctedMonth.toString() });
    await wrapper.setProps({ dayFrom: testDatePast91Days
      .getDate()
      .toString() });
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toBe(false);
  });
});