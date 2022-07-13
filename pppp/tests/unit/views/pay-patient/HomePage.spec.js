import { shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/HomePage.vue";
import store from "../../../../src/store/index";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import spaEnvService from "@/services/spa-env-service";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import { payPatientRoutes, payPatientRouteStepOrder } from "@/router/routes";

const next = jest.fn();

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
  it("renders", () => {
    const $route = {
      value: {
        path: "/potato-csr",
      },
    };
    const $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    const wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $route,
          $router,
        }
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("HomePage.vue pay patient created()", () => {
  let wrapper;
  let $route;
  let $router;
  let spyOnDispatch;
  let spyOnSpaEnvs;
  let spyOnLogService;

  beforeEach(() => {
    $route = {
      value: {
        path: "/potato-csr",
      },
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    spyOnDispatch = jest.spyOn(store, "dispatch");

    spyOnSpaEnvs = jest
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    spyOnLogService = jest
      .spyOn(logService, "logNavigation")
      .mockImplementation(() => Promise.resolve("logged"));

    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $route,
          $router,
        }
      },
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
  let wrapper;
  let $route;
  let $router;
  let spyOnRouter;

  beforeEach(() => {
    $route = {
      value: {
        path: "/potato-csr",
      },
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };

    spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
    
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $route,
          $router,
        }
      },
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
        $router.currentRoute.value.path,
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
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    $route = {
      value: {
        path: "/potato",
      },
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $route,
          $router,
        }
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
      wrapper.vm.$router.currentRoute.value.path,
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
