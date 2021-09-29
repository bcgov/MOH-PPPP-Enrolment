import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Page from "@/App.vue";

import * as module1 from "@/store/modules/app";
import * as module2 from "@/store/modules/pay-patient-form";
import * as module3 from "@/store/modules/pay-practitioner-form";
import * as dummyDataValid from "@/store/states/pay-patient-form-dummy-data";
import { cloneDeep } from "lodash";
import {
  payPatientStepRoutes,
  payPractitionerStepRoutes,
  payPatientCSRStepRoutes,
  payPractitionerCSRStepRoutes,
} from "@/router/step-routes";

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

let store;
store = new Vuex.Store(storeTemplate);

const payPatientTemplate = shallowMount(Page, {
  localVue,
  stubs: ["router-link", "router-view"],
  store,
  mocks: {
    $route: {
      path: "/",
    },
    $router: {
      push: jest.fn(),
      currentRoute: {
        path: "/pay-patient",
      },
    },
  },
});
const payPatientCSRTemplate = shallowMount(Page, {
  localVue,
  stubs: ["router-link", "router-view"],
  store,
  mocks: {
    $route: {
      path: "/",
    },
    $router: {
      push: jest.fn(),
      currentRoute: {
        path: "/pay-patient-csr",
      },
    },
  },
});
const payPractitionerTemplate = shallowMount(Page, {
  localVue,
  stubs: ["router-link", "router-view"],
  store,
  mocks: {
    $route: {
      path: "/",
    },
    $router: {
      push: jest.fn(),
      currentRoute: {
        path: "/pay-practitioner",
      },
    },
  },
});
const payPractitionerCSRTemplate = shallowMount(Page, {
  localVue,
  stubs: ["router-link", "router-view"],
  store,
  mocks: {
    $route: {
      path: "/",
    },
    $router: {
      push: jest.fn(),
      currentRoute: {
        path: "/pay-practitioner-csr",
      },
    },
  },
});

describe("App.vue render test", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    const wrapper = payPatientTemplate;
    expect(wrapper.element).toBeDefined();
  });
});

describe("App.vue stepRoutes()", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns an array", () => {
    const wrapper = payPatientTemplate;
    const wrapper2 = payPatientCSRTemplate;
    const wrapper3 = payPractitionerTemplate;
    const wrapper4 = payPractitionerCSRTemplate;
    expect(wrapper.vm.stepRoutes).toBeInstanceOf(Array);
    expect(wrapper2.vm.stepRoutes).toBeInstanceOf(Array);
    expect(wrapper3.vm.stepRoutes).toBeInstanceOf(Array);
    expect(wrapper4.vm.stepRoutes).toBeInstanceOf(Array);
  });

  it("returns payPatientStepRoutes when url is payPatient", () => {
    const wrapper = payPatientTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPatientStepRoutes);
  });

  it("returns payPatientCSRStepRoutes when url is payPatientCSR", () => {
    const wrapper = payPatientCSRTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPatientCSRStepRoutes);
  });

  it("returns payPractitionerStepRoutes when url is payPractitioner", () => {
    const wrapper = payPractitionerTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPractitionerStepRoutes);
  });

  it("returns payPractitionerCSRStepRoutes when url is payPractitionerCSR", () => {
    const wrapper = payPractitionerCSRTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPractitionerCSRStepRoutes);
  });
});
