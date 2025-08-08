import { mount } from "@vue/test-utils";
import Page from "@/views/pay-patient/ClaimCountPage.vue";
import store from "../../../../src/store/index";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { payPatientRoutes, payPatientRouteStepOrder } from "@/router/routes";
import { getConvertedPath } from "@/helpers/url";
import { cloneDeep } from "common-lib-vue";
import * as scrollHelper from "@/helpers/scroll";

//required to prevent ECONNREFUSED errors
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(() => {
      return Promise.resolve();
    }),
  },
}));

const mockRouterCSR = {
  $router: {
    push: vi.fn(),
    currentRoute: {
      value: {
        path: "/pay-patient",
      },
    },
  },
};

const testDate = new Date();
testDate.setFullYear(testDate.getFullYear() - 1);
const next = vi.fn();

const dummyDataValid = {
  default: {
    claimCount: "1",

    planReferenceNumber: "1234567890",

    phn: "9999 999 998",
    dependentNumber: "66",
    firstName: "Bob",
    middleInitial: "H",
    lastName: "Smith",
    birthDate: new Date("2000-01-01"),

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
        serviceDate: new Date(),
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
        notes: "Notes here.",
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
  },
};
dummyDataValid.default.medicalServiceClaims[0].serviceDate = testDate;

const spyOnLogService = vi
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnScrollTo = vi
  .spyOn(scrollHelper, "scrollTo")
  .mockImplementation(() => Promise.resolve("scrolled"));
const spyOnScrollToError = vi
  .spyOn(scrollHelper, "scrollToError")
  .mockImplementation(() => Promise.resolve("scrolled to error"));

const spyOnGetTopScrollPosition = vi
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnVisitPage = vi
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

const spyOnSetPageComplete = vi
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnSetPageIncomplete = vi
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

describe("ClaimCountPage.vue pay patient render test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("ClaimCountPage.vue pay patient created()", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls logService", () => {
    expect(wrapper.element).toBeDefined();
    expect(spyOnLogService).toHaveBeenCalled();
  });
});

describe("ClaimCountPage.vue pay patient validateFields() part 1 (invalid)", () => {
  let wrapper;
  let $router;
  let spyOnRouter;
  let spyOnDispatch;

  beforeEach(() => {
    //using a local mock router to make spying easier
    $router = {
      currentRoute: {
        value: {
          path: "/potato-csr",
        },
      },
      push: vi.fn(),
    };
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router,
        },
      },
    });
    spyOnDispatch = vi.spyOn(wrapper.vm.$store, "dispatch");

    spyOnRouter = vi
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls scrollToError", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("does not call dispatch()", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).not.toHaveBeenCalled();
  });

  it("does not call pageStateService.spyOnVisitPage()", () => {
    wrapper.vm.validateFields();
    expect(spyOnVisitPage).not.toHaveBeenCalled();
  });

  it("does not call pageStateService.spyOnSetPageComplete()", () => {
    wrapper.vm.validateFields();
    expect(spyOnSetPageComplete).not.toHaveBeenCalled();
  });

  it("does call scrollTo", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
  });

  it("does not call router.push", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).not.toHaveBeenCalled();
  });
});

describe("ClaimCountPage.vue pay patient validateFields() part 2 (valid)", () => {
  let wrapper;
  let $router;
  let $store;
  let spyOnRouter;
  let spyOnDispatch;

  beforeEach(() => {
    //using local mocks to make spying easier
    $router = {
      currentRoute: {
        value: {
          path: "/potato-csr",
        },
      },
      push: vi.fn(),
    };
    $store = {
      state: {
        payPatientForm: cloneDeep(dummyDataValid.default),
      },
      dispatch: vi.fn(),
    };

    spyOnDispatch = vi.spyOn($store, "dispatch");
    spyOnRouter = vi
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
    wrapper = mount(Page, {
      global: {
        mocks: {
          $router,
          $store,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("does not call scrollToError()", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollToError).not.toHaveBeenCalled();
  });

  it("does call spyOnDispatch()", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it("does call spyOnDispatch() with claim count", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_CLAIM_COUNT}`,
      wrapper.vm.claimCount
    );
  });

  it("does call spyOnDispatch() with medical service claims", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_MEDICAL_SERVICE_CLAIMS}`,
      expect.any(Array)
    );
  });

  it("does call pageStateService.spyOnVisitPage()", () => {
    wrapper.vm.validateFields();
    expect(spyOnVisitPage).toHaveBeenCalled();
  });

  it("does call pageStateService.spyOnSetPageComplete()", () => {
    wrapper.vm.validateFields();
    expect(spyOnSetPageComplete).toHaveBeenCalled();
  });

  it("does call scrollTo", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("does call router.push", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls router.push with correct argumentt", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).toHaveBeenCalledWith(
      getConvertedPath(
        wrapper.vm.$router.currentRoute.value.path,
        payPatientRoutes.MAIN_FORM_PAGE.path
      )
    );
  });
});

describe("ClaimCountPage.vue pay patient beforeRouteLeave(to, from, next)", () => {
  let wrapper;
  let $router;

  beforeEach(() => {
    $router = {
      currentRoute: {
        value: {
          path: "/potato-csr",
        },
      },
      push: vi.fn(),
    };
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls scrollTo() and getTopScrollPosition() when given invalid route", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnGetTopScrollPosition).toHaveBeenCalled();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("calls next() with proper arguments when given invalid route", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPatientRoutes.CLAIM_COUNT_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
      replace: true,
    });
  });

  it("calls next() with proper arguments when given valid route", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(next).toHaveBeenCalled();
    expect(spyOnGetTopScrollPosition).not.toHaveBeenCalled();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
  });

  it("calls spyOnSetPageIncomplete (valid route)", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });

  it("calls spyOnSetPageIncomplete (invalid route)", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
