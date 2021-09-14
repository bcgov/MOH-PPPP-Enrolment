import { mount, createLocalVue } from "@vue/test-utils";
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
  medicalServiceClaims: ["1", "2", "3"],
  planReferenceNumber: "11111",
};
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

describe.skip("ReviewTableList -- patient", () => {
  it("renders", () => {
    const store = new Vuex.Store(storeTemplate);
    const wrapper = mount(Page, {
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

describe("ReviewTableList -- patient planReferenceNumberData() CSR", () => {
  let store;
  let wrapper;

  it("returns plan reference number in store when path isCSR", () => {
    //please note the route change between this and the next test
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
    const result = wrapper.vm.$store.state.payPatientForm.planReferenceNumber;
    expect(result).toBe("11111");
    expect(wrapper.text()).toEqual(expect.stringContaining("11111"));
  });

  it("does not render plan reference number when path is NOT CSR", () => {
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
            path: "/potato",
          },
        },
      },
    });
    const result = wrapper.vm.$store.state.payPatientForm.planReferenceNumber;
    expect(result).toBe("11111");
    expect(wrapper.text()).not.toEqual(expect.stringContaining("11111"));
  });
});
