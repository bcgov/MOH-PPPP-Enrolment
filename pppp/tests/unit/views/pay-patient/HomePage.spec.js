import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/HomePage.vue";
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

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientState = cloneDeep(dummyDataValid.default);
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

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

jest.spyOn(window, "scrollTo").mockImplementation(jest.fn);

describe("HomePage.vue pay patient", () => {
  let state;
  let store;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };

    store = new Vuex.Store({
      modules: {
        payPatientForm: {
          state,
          namespaced: true,
          actions: {
            setApplicationUuid() {},
          },
        },
      },
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(Page, {
      store,
      localVue,
    });
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
      `${module2.MODULE_NAME}/${module2.SET_APPLICATION_UUID}`,
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
        payPatientRoutes.CLAIM_COUNT_PAGE.path
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

describe("HomePage.vue pay patient beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    $route = {
      path: "/potato",
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
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls scrollTo() and getTopScrollPosition() when given invalid route", async () => {
    //to, from, next
    jest.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnGetTopScrollPosition).toHaveBeenCalled();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("calls next() with proper arguments when given invalid route", async () => {
    //to, from, next
    jest.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.path,
      payPatientRoutes.HOME_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
      replace: true,
    });
  });

  it("calls next() when passed a route that has been completed in pageStateService", async () => {
    //to, from, next
    jest.useFakeTimers();
    await pageStateService.importPageRoutes(payPatientRouteStepOrder);
    await wrapper.vm.$nextTick;
    await pageStateService.setPageComplete(payPatientRouteStepOrder[0].path);
    await wrapper.vm.$nextTick;
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(next).toHaveBeenCalled();
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
    expect(spyOnGetTopScrollPosition).not.toHaveBeenCalled();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
  });

  it("calls spyOnSetPageIncomplete (valid route)", async () => {
    //to, from, next
    jest.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
