import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Page from "@/components/pay-patient/ReviewTableList.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../src/store/modules/app";
import * as module2 from "../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../src/store/modules/pay-practitioner-form";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

const storeTemplate = {
    modules: {
      app: cloneDeep(module1),
      payPatientForm: cloneDeep(module2),
      payPractitionerForm: cloneDeep(module3),
    },
  };

const patientState = {
    medicalServiceClaims: ["1", "2", "3"]
}
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState)

describe("ReviewTableList --- patient.vue", () => {
  it("renders", () => {
    const store = new Vuex.Store(storeTemplate);
    const wrapper = shallowMount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/",
          },
        },
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
