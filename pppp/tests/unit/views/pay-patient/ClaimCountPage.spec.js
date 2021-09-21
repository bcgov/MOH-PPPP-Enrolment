import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Page from "@/views/pay-patient/ClaimCountPage.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientState = {
  isInfoCollectionNoticeOpen: true,
};

storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

console.log(
  "******************************************************************************************************************************************"
);

describe("ClaimCountPage.vue", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
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
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});
