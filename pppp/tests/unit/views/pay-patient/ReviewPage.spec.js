import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/ReviewPage.vue";
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

const next = jest.fn();
const testDate = new Date();

const storeTemplateC = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const storeTemplateN = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientStateC = cloneDeep(dummyDataValid.default);
const patientStateN = cloneDeep(dummyDataValid.default);
patientStateC.medicalServiceClaims[0].correspondenceAttached = "C";
patientStateN.medicalServiceClaims[0].correspondenceAttached = "N";

storeTemplateC.modules.payPatientForm.state = cloneDeep(patientStateC);
storeTemplateN.modules.payPatientForm.state = cloneDeep(patientStateN);

//later versions of Jest use a function called "jest.setSystemTime"
//but since this project is using Jest 24.x
//I've instead mocked the function below
jest.spyOn(global, "Date").mockImplementation(() => testDate);

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

const spyOnGetTopScrollPosition = jest
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnVisitPage = jest.spyOn(pageStateService, "visitPage");

const spyOnSetPageComplete = jest.spyOn(pageStateService, "setPageComplete");

const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnLogService = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnPrint = jest.spyOn(window, "print").mockImplementation(jest.fn);

jest.spyOn(window, "scrollTo").mockImplementation(jest.fn);

console.log(
  "************************************************************************"
);

describe("ReviewPage.vue pay patient", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnDispatch;
  let spyOnSpaEnvs;
  let spyOnLogService;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplateC);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
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

describe("ReviewPage.vue pay patient created()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnDispatch;
  let spyOnSpaEnvs;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplateC);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
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

    wrapper.vm.$options.created.forEach((hook) => {
      hook.call(wrapper.vm);
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls logService", () => {
    expect(spyOnLogService).toBeDefined();
  });
});

describe("ReviewPage.vue pay patient isFormAbleToSubmit()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnDispatch;
  let spyOnSpaEnvs;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplateC);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
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
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls submitForm if the store has correspondenceAttached = N", () => {
    store = new Vuex.Store(storeTemplateN);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      localVue,
      store,
      mocks: {
        $route,
        $router,
      },
    });
    const spyOnSubmitForm = jest.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls window.print if the store has correspondenceAttached = C", () => {
    store = new Vuex.Store(storeTemplateC);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      localVue,
      store,
      mocks: {
        $route,
        $router,
      },
    });
    wrapper.vm.continueHandler();
    expect(spyOnPrint).toHaveBeenCalled();
  });
});

describe("ReviewPage.vue pay patient submitForm()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnDispatch;
  let spyOnSpaEnvs;

  beforeEach(() => {
    // jest.useFakeTimers("modern");
    // jest.setSystemTime(testDate);
    store = new Vuex.Store(storeTemplateN);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
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

    wrapper.vm.submitForm();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls logService", () => {
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_SUBMISSION_DATE}`,
      testDate
    );
  });
});
