//hold off on tests until Harry gives the all clear
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/MainFormPage.vue";
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