//hold off on tests until Harry gives the all clear
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
}

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
      mocks: mockRouter
    })
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
      mocks: mockRouter
    })
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("assigns data the values in the store", () => {    
    //I'm not gonna do all of them, but if these five are here, we're probably good
    expect(wrapper.vm.planReferenceNumber).toEqual(storeTemplate.modules.payPatientForm.state.planReferenceNumber);
    expect(wrapper.vm.phn).toEqual(storeTemplate.modules.payPatientForm.state.phn);
    expect(wrapper.vm.vehicleAccidentClaimNumber).toEqual(storeTemplate.modules.payPatientForm.state.vehicleAccidentClaimNumber);
    expect(wrapper.vm.practitionerPractitionerNumber).toEqual(storeTemplate.modules.payPatientForm.state.practitionerPractitionerNumber);
    expect(wrapper.vm.referredToLastName).toEqual(storeTemplate.modules.payPatientForm.state.referredToLastName);
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError).toHaveLength(4);
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

// it("title", () => {
//   expect().toEqual();
// });