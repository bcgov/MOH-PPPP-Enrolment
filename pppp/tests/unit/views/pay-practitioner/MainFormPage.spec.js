import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-practitioner/MainFormPage.vue";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-practitioner-form-dummy-data";
import { getConvertedPath } from "@/helpers/url";
import {
  payPractitionerRoutes,
  payPractitionerRouteStepOrder,
} from "@/router/routes";

const testDate = new Date();
const adjustedTestDateMonth = testDate.getMonth() + 1;
//testDate.getMonth() returns 0 for January
//but the hospital visit selector indexes January as 1, since it's the first item on the list
//this constant adjusts for this difference

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

const next = vi.fn();

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

const passingData = {
  medicalServiceClaimsCount: "1",
  hospitalVisitClaimsCount: "1",

  planReferenceNumber: "1234567890",

  phn: "9999 999 998",
  dependentNumber: "66",
  firstName: "Bob",
  middleInitial: "H",
  lastName: "Smith",
  birthDate: new Date(),

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
        minute: "08",
      },
      renderedFinishTime: {
        hour: "16",
        minute: "06",
      },
      diagnosticCode: "001",
      locationOfService: "B",
      correspondenceAttached: null,
      submissionCode: "I",
      notes: "Notes here.",
    },
  ],

  hospitalVisitClaims: [
    {
      month: adjustedTestDateMonth.toString(),
      dayFrom: testDate.getDate().toString(),
      dayTo: testDate.getDate().toString(),
      year: testDate.getFullYear().toString(),
      numberOfServices: "1",
      serviceClarificationCode: "A1",
      feeItem: "00010",
      amountBilled: "0.00",
      diagnosticCode: "001",
      locationOfService: "B",
      correspondenceAttached: null,
      submissionCode: "I",
      notes: "Notes here.",
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

vi.mock("axios", () => ({
  get: vi.fn(),
  post: vi.fn(() => {
    return Promise.resolve(mockBackendValidationResponse);
  }),
}));

const scrollHelper = require("@/helpers/scroll");

vi.mock("@/helpers/scroll", () => ({
  scrollTo: vi.fn(),
  scrollToError: vi.fn(),
  getTopScrollPosition: vi.fn(),
}));

vi.spyOn(window, "scrollTo").mockImplementation(vi.fn);

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

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const practitionerState = cloneDeep(dummyDataValid.default);
storeTemplate.modules.payPractitionerForm.state = cloneDeep(practitionerState);

const mockRouter = {
  push: vi.fn(),
  currentRoute: {
    value: {
      path: "/pay-practitioner/main-form",
    },
  },
};

const mockRouterCSR = {
  push: vi.fn(),
  currentRoute: {
    value: {
      path: "/pay-practitioner-csr/main-form",
    },
  },
};

describe("MainFormPage.vue pay practitioner", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("MainFormPage.vue pay practitioner created()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  vi.useFakeTimers();

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("assigns data the values in the store", () => {
    //I'm not gonna do all of them, but if these five are here, we're probably good
    expect(wrapper.vm.planReferenceNumber).toEqual(
      storeTemplate.modules.payPractitionerForm.state.planReferenceNumber
    );
    expect(wrapper.vm.phn).toEqual(
      storeTemplate.modules.payPractitionerForm.state.phn
    );
    expect(wrapper.vm.vehicleAccidentClaimNumber).toEqual(
      storeTemplate.modules.payPractitionerForm.state.vehicleAccidentClaimNumber
    );
    expect(wrapper.vm.practitionerPractitionerNumber).toEqual(
      storeTemplate.modules.payPractitionerForm.state
        .practitionerPractitionerNumber
    );
    expect(wrapper.vm.referredToLastName).toEqual(
      storeTemplate.modules.payPractitionerForm.state.referredToLastName
    );
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError).toHaveLength(
      4
    );
  });

  it("calls logNavigation", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });

  it("sets page loaded to true", async () => {
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(wrapper.vm.isPageLoaded).toBe(true);
  });
});

describe("MainFormPage.vue handleBlurField()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  const fakeTrueValidation = {
    $touch: vi.fn,
  };
  const spyOnTrueTouch = vi.spyOn(fakeTrueValidation, "$touch");

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls $touch when passed a validation", () => {
    wrapper.vm.handleBlurField(fakeTrueValidation);
    expect(spyOnTrueTouch).toHaveBeenCalled();
  });

  it("doesn't break when not passed a validation", () => {
    wrapper.vm.handleBlurField();
    expect(wrapper.element).toBeDefined();
  });
});

describe("MainFormPage.vue handleInputPractitioner()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("sets isPractitionerErrorShown to false", () => {
    wrapper.vm.isPractitionerErrorShown = true;
    expect(wrapper.vm.isPractitionerErrorShown).toBe(true);
    wrapper.vm.handleInputPractitioner();
    expect(wrapper.vm.isPractitionerErrorShown).toBe(false);
  });
});

describe("MainFormPage.vue handleProcessBirthDate()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("sets data to equal value passed", () => {
    wrapper.vm.birthDateData = "notPotato";
    expect(wrapper.vm.birthDateData).toBe("notPotato");
    wrapper.vm.handleProcessBirthDate("potato");
    expect(wrapper.vm.birthDateData).toBe("potato");
  });
});

describe("MainFormPage.vue validationModal handlers", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  let spyOnNavigateToNextPage;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
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

  it("calls navigateToNextPage() on Yes", () => {
    wrapper.vm.validationModalYesHandler();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("sets display to false on No", async () => {
    await wrapper.setData({ isValidationModalShown: true });
    expect(wrapper.vm.isValidationModalShown).toBe(true);
    wrapper.vm.validationModalNoHandler();
    expect(wrapper.vm.isValidationModalShown).toBe(false);
  });
});

describe("MainFormPage.vue navigateToNextPage()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls pageStateService.setPageComplete", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(spyOnSetPageComplete).toHaveBeenCalled();
  });

  it("calls pageStateService.visitPage", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(spyOnVisitPage).toHaveBeenCalled();
  });

  it("calls router.push", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.push).toHaveBeenCalled();
  });

  it("calls scrollTo", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("MainFormPage.vue saveData()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  let spyOnDispatch;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });

    spyOnDispatch = vi.spyOn(store, "dispatch");
    Object.assign(wrapper.vm, cloneDeep(passingData));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("dispatches correctly", async () => {
    wrapper.vm.saveData();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it("saves example value to store", async () => {
    const testValue = "SaveDataTestValue";
    expect(
      wrapper.vm.$store.state.payPractitionerForm.referredByLastName
    ).not.toEqual(testValue);
    await wrapper.setData({ referredByLastName: testValue });
    wrapper.vm.saveData();
    expect(
      wrapper.vm.$store.state.payPractitionerForm.referredByLastName
    ).toEqual(testValue);
  });
});

describe("MainFormPage.vue getMedicalServiceClaimTitle()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns correct title when 1 claim", () => {
    //should return "Service" or something like it, without saying 1 out of 1
    //so I check to see if 1 is in the result, which it shouldn't be
    const arrayLength = wrapper.vm.medicalServiceClaims.length;
    const result = wrapper.vm.getMedicalServiceClaimTitle(0);
    expect(result).not.toContain(`${arrayLength}`);
  });

  it("returns correct title when more than 1 claim", async () => {
    //should return "Service 1 out of 3" or something like it
    //so I check to see if 3 is in the result, which it should be
    await wrapper.setData({
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
          locationOfService: "B",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
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
          locationOfService: "B",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
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
          locationOfService: "B",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
      ],
    });
    const arrayLength = wrapper.vm.medicalServiceClaims.length;
    const result = wrapper.vm.getMedicalServiceClaimTitle(0);
    expect(result).toContain(`${arrayLength}`);
  });
});

describe("MainFormPage.vue getHospitalVisitClaimTitle()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns correct title when 1 claim", () => {
    //should return "Service" or something like it, without saying 1 out of 1
    //so I check to see if 1 is in the result, which it shouldn't be
    const arrayLength = wrapper.vm.hospitalVisitClaims.length;
    const result = wrapper.vm.getHospitalVisitClaimTitle(0);
    expect(result).not.toContain(`${arrayLength}`);
  });

  it("returns correct title when more than 1 claim", async () => {
    //should return "Service 1 out of 3" or something like it
    //so I check to see if 3 is in the result, which it should be
    await wrapper.setData({
      hospitalVisitClaims: [
        {
          month: "12",
          dayFrom: "24",
          dayTo: "26",
          year: "2020",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
        {
          month: "12",
          dayFrom: "24",
          dayTo: "26",
          year: "2020",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
        {
          month: "12",
          dayFrom: "24",
          dayTo: "26",
          year: "2020",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
      ],
    });
    const arrayLength = wrapper.vm.hospitalVisitClaims.length;
    const result = wrapper.vm.getHospitalVisitClaimTitle(0);
    expect(result).toContain(`${arrayLength}`);
  });
});

//-----computed value tests-----
describe("MainFormPage.vue isReferredByRequired()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns false if all three conditions are null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(false);
  });

  it("returns true if the first is not null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: "A" });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the second is not null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: "A" });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the third is not null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: "A" });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(true);
  });
});

describe("MainFormPage.vue isReferredToRequired()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = "11111";
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns true if the first is not null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: "A" });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the second is not null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: "A" });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the third is not null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: "A" });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns false if all three conditions are null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(false);
  });

  it("returns true if fee item is 03333", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns false if route is CSR and the three conditions are null (fee item 11111)", async () => {
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouterCSR,
        },
      },
    });

    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    wrapper.vm.medicalServiceClaims[0].feeItem = "11111";
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(false);
  });

  it("returns false if route is CSR and the three conditions are null (fee item 03333)", async () => {
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouterCSR,
        },
      },
    });

    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(false);
  });
});

describe("MainFormPage.vue isContainingNoChargeFeeItem()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.vm.medicalServiceClaims = [
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
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
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
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
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
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
    ];

    wrapper.vm.hospitalVisitClaims = [
      {
        month: testDate.getMonth().toString(),
        dayFrom: testDate.getDate().toString(),
        dayTo: testDate.getDate().toString(),
        year: testDate.getFullYear().toString(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
      {
        month: testDate.getMonth().toString(),
        dayFrom: testDate.getDate().toString(),
        dayTo: testDate.getDate().toString(),
        year: testDate.getFullYear().toString(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
      {
        month: testDate.getMonth().toString(),
        dayFrom: testDate.getDate().toString(),
        dayTo: testDate.getDate().toString(),
        year: testDate.getFullYear().toString(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
    ];
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns true if one of the (medical) feeItems is 03333", () => {
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns true if one of the (medical) feeItems is 03333 (2)", () => {
    wrapper.vm.medicalServiceClaims[1].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns false if none of the (medical) feeItems are 03333", () => {
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      false
    );
  });

  it("returns true if one of the (hospital) feeItems is 03333", () => {
    wrapper.vm.hospitalVisitClaims[0].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns true if one of the (hospital) feeItems is 03333 (2)", () => {
    wrapper.vm.hospitalVisitClaims[1].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns false if none of the (hospital) feeItems are 03333", () => {
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      false
    );
  });
});

describe("MainFormPage.vue isCSR()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns false if not CSR route", () => {
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    expect(Page.computed.isCSR.call(wrapper.vm)).toBe(false);
  });

  it("returns true if CSR route", () => {
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouterCSR,
        },
      },
    });
    expect(Page.computed.isCSR.call(wrapper.vm)).toBe(true);
  });
});

//I'm not testing validationWarningList() since it relies on a variable, containsWarnings
//which never has data put into it. If this feature is implemented in the future, tests can go here

describe("MainFormPage.vue beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplate);
    $route = {
      path: "/potato",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: vi.fn(),
    };
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
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
      payPractitionerRouteStepOrder[3],
      payPractitionerRouteStepOrder[0],
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
      payPractitionerRouteStepOrder[3],
      payPractitionerRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.MAIN_FORM_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
      replace: true,
    });
  });

  it("calls next() when passed a route that has been completed in pageStateService", async () => {
    //to, from, next
    vi.useFakeTimers();
    await pageStateService.importPageRoutes(payPractitionerRouteStepOrder);
    await wrapper.vm.$nextTick;
    await pageStateService.setPageComplete(
      payPractitionerRouteStepOrder[0].path
    );
    await wrapper.vm.$nextTick;
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPractitionerRouteStepOrder[0],
      payPractitionerRouteStepOrder[1],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(next).toHaveBeenCalled();
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
    expect(spyOnGetTopScrollPosition).not.toHaveBeenCalled();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
  });

  it("calls spyOnSetPageIncomplete (valid route)", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPractitionerRouteStepOrder[0],
      payPractitionerRouteStepOrder[1],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
