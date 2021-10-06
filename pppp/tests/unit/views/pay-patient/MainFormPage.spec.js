//hold off on tests until Harry gives the all clear
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/ReviewPage.vue";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-patient-form-dummy-data";

const localVue = createLocalVue();
localVue.use(Vuex);

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientState = cloneDeep(dummyDataValid.default);
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

describe("MainFormPage.vue pay patient", () => {
  let state;
  let store;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };

    store = new Vuex.Store(storeTemplate);
  });

  it("renders", () => {
    const wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});