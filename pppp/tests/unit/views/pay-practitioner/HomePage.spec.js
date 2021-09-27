import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-practitioner/HomePage.vue";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-patient-form-dummy-data";
import spaEnvService from "@/services/spa-env-service";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import { payPatientRoutes, payPatientRouteStepOrder } from "@/router/routes";

const localVue = createLocalVue();
localVue.use(Vuex);
// localVue.use(Vuelidate);

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

// const patientState = cloneDeep(dummyDataValid.default);
// storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

console.log("****************************************************************");

describe("HomePage.vue pay practitioner", () => {
    let store;
    let wrapper;
    let $route;
    let $router;
    let spyOnDispatch;
    let spyOnSpaEnvs;
    let spyOnLogService;
  
    beforeEach(() => {
      store = new Vuex.Store(storeTemplate);
      $route = {
        path: "/potato-csr",
      };
      $router = {
        $route,
        currentRoute: $route,
        push: jest.fn(),
      };
      wrapper = mount(Page, {
        localVue,
        store,
        mocks: {
          $route,
          $router,
        },
      });
      spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
  
      spyOnSpaEnvs = jest
        .spyOn(spaEnvService, "loadEnvs")
        .mockImplementation(() => Promise.resolve("loaded"));
  
      spyOnLogService = jest
        .spyOn(logService, "logNavigation")
        .mockImplementation(() => Promise.resolve("logged"));
  
      wrapper.vm.$options.created.forEach((hook) => {
        hook.call(wrapper.vm);
      });
    });
  
    afterEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });
  
    it("renders", () => {
      expect(wrapper.element).toBeDefined();
    });
  });
