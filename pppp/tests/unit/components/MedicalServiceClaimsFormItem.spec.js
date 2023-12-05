import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import * as module1 from "../../../src/store/modules/app";
import * as module2 from "../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../src/store/modules/pay-practitioner-form";
import * as dummyDataPatient from "../../../src/store/states/pay-patient-form-dummy-data";
import * as dummyDataPractitioner from "../../../src/store/states/pay-practitioner-form-dummy-data";
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

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientState = cloneDeep(dummyDataPatient.default);
const practitionerState = cloneDeep(dummyDataPractitioner.default);
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);
storeTemplate.modules.payPractitionerForm.state = cloneDeep(practitionerState);

describe("MedicalServiceClaimsFormItem.vue", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = createStore(storeTemplate);
    wrapper = mount(Component, {
      global: {
        plugins: [store],
        mocks: mockRouter,
      },
    });
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});
