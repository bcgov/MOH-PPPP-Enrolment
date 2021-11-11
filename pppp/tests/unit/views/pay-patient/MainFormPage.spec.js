import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/MainFormPage.vue";
import logService from "@/services/log-service";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-patient-form-dummy-data";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve();
  }),
}));

const scrollHelper = require("@/helpers/scroll");

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientState = cloneDeep(dummyDataValid.default);
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

const mockRouter = {
  $route: {
    path: "/",
  },
  $router: {
    push: jest.fn(),
    currentRoute: {
      path: "/potato-csr",
    },
  },
};

describe("MainFormPage.vue pay patient", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("MainFormPage.vue pay patient created()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  jest.useFakeTimers();

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("assigns data the values in the store", () => {
    //I'm not gonna do all of them, but if these five are here, we're probably good
    expect(wrapper.vm.planReferenceNumber).toEqual(
      storeTemplate.modules.payPatientForm.state.planReferenceNumber
    );
    expect(wrapper.vm.phn).toEqual(
      storeTemplate.modules.payPatientForm.state.phn
    );
    expect(wrapper.vm.vehicleAccidentClaimNumber).toEqual(
      storeTemplate.modules.payPatientForm.state.vehicleAccidentClaimNumber
    );
    expect(wrapper.vm.practitionerPractitionerNumber).toEqual(
      storeTemplate.modules.payPatientForm.state.practitionerPractitionerNumber
    );
    expect(wrapper.vm.referredToLastName).toEqual(
      storeTemplate.modules.payPatientForm.state.referredToLastName
    );
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError).toHaveLength(
      4
    );
  });

  it("calls logNavigation", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });

  it("sets page loaded to true", async () => {
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(wrapper.vm.isPageLoaded).toEqual(true);
  });
});

describe("MainFormPage.vue handleBlurField()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  const fakeTrueValidation = {
    $touch: jest.fn,
  };
  const spyOnTrueTouch = jest.spyOn(fakeTrueValidation, "$touch");

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
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
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets isPractitionerErrorShown to false", () => {
    wrapper.vm.isPractitionerErrorShown = true;
    expect(wrapper.vm.isPractitionerErrorShown).toEqual(true);
    wrapper.vm.handleInputPractitioner();
    expect(wrapper.vm.isPractitionerErrorShown).toEqual(false);
  });
});

describe("MainFormPage.vue handleInputServiceFeeItem()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets fee item validation to false", () => {
    wrapper.vm.medicalServiceClaimsFeeItemValidationError[0] = true;
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError[0]).toEqual(
      true
    );
    wrapper.vm.handleInputServiceFeeItem(0);
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError[0]).toEqual(
      false
    );
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
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets data to equal value passed", () => {
    wrapper.vm.birthDateData = "notPotato";
    expect(wrapper.vm.birthDateData).toEqual("notPotato");
    wrapper.vm.handleProcessBirthDate("potato");
    expect(wrapper.vm.birthDateData).toEqual("potato");
  });
});

describe("MainFormPage.vue handleProcessServiceDate()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets serviceDateData to value passed", () => {
    const claimIndex = 0;

    wrapper.vm.medicalServiceClaims[claimIndex].serviceDateData = "notPotato";
    wrapper.vm.handleProcessServiceDate("potato", claimIndex);
    expect(wrapper.vm.medicalServiceClaims[claimIndex].serviceDateData).toEqual(
      "potato"
    );
  });
});

describe("MainFormPage.vue validateFields()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  const passingData = {
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
  };

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("title", () => {
    Object.assign(wrapper.vm, passingData);
    wrapper.vm.validateFields();
    console.log("avocado", JSON.stringify(wrapper.vm.$v, null, 4));
    expect(spyOnScrollToError).not.toHaveBeenCalled();

    /* 
    service date and location of service currently invalid. wrapper.vm.$v shows the whole model if needed
    */
  });
});

// describe("MainFormPage.vue [[INSERT TITLE HERE]]", () => {
//   // eslint-disable-next-line
//   let state;
//   let store;
//   let wrapper;

//   beforeEach(() => {
//     state = {
//       applicationUuid: null,
//     };
//     store = new Vuex.Store(storeTemplate);

//     wrapper = shallowMount(Page, {
//       store,
//       localVue,
//       mocks: mockRouter,
//     });
//   });

//   afterEach(() => {
//     jest.resetModules();
//     jest.clearAllMocks();
//   });

//   it("title", () => {
//     expect().toEqual();
//   });
// });
