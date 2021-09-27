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
import { payPractitionerRoutes, payPractitionerRouteStepOrder } from "@/router/routes";

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


const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
// const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

const spyOnGetTopScrollPosition = jest
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnVisitPage = jest.spyOn(pageStateService, "visitPage");
// .mockImplementation(() => Promise.resolve("visited"));

const spyOnSetPageComplete = jest.spyOn(pageStateService, "setPageComplete");
// .mockImplementation(() => Promise.resolve("set"));

const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

jest.spyOn(window, "scrollTo").mockImplementation(jest.fn);

console.log("****************************************************************");

describe("HomePage.vue pay practitioner", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

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

describe("HomePage.vue pay patient created()", () => {
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

  it("calls dispatch with correct parameters", () => {
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_APPLICATION_UUID}`,
      wrapper.vm.applicationUuid
    );
  });

  it("calls spaEnvs", () => {
    expect(spyOnSpaEnvs).toHaveBeenCalled();
  });

  it("calls logService", async () => {
    expect(spyOnLogService).toHaveBeenCalled();
  });
});

describe("HomePage.vue pay patient nextPage()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnRouter;

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

    spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    wrapper.vm.$options.created.forEach((hook) => {
      hook.call(wrapper.vm);
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("pushes to router", () => {
    wrapper.vm.nextPage();

    expect(spyOnRouter).toHaveBeenCalledWith(
      getConvertedPath(
        $router.currentRoute.path,
        payPractitionerRoutes.CLAIM_COUNT_PAGE.path
      )
    );
  });

  it("calls scrollTo with the parameter 0", () => {
    wrapper.vm.nextPage();

    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls pageStateService", () => {
    wrapper.vm.nextPage();

    expect(spyOnSetPageComplete).toHaveBeenCalled();
    expect(spyOnVisitPage).toHaveBeenCalled();
  });
});