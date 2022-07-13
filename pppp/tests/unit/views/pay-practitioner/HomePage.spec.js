import { mount } from "@vue/test-utils";
import Page from "@/views/pay-practitioner/HomePage.vue";
import store from "../../../../src/store/index";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import spaEnvService from "@/services/spa-env-service";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import {
  payPractitionerRoutes,
  payPractitionerRouteStepOrder,
} from "@/router/routes";

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

describe("HomePage.vue pay practitioner", () => {
  let wrapper;
  let $route;
  let $router;

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

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("HomePage.vue pay practitioner created()", () => {
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

describe("HomePage.vue pay practitioner nextPage()", () => {
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

describe("HomePage.vue pay practitioner beforeRouteLeave(to, from, next)", () => {
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
      payPractitionerRouteStepOrder[1],
      payPractitionerRouteStepOrder[0],
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
      payPractitionerRouteStepOrder[1],
      payPractitionerRouteStepOrder[0],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.HOME_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
      replace: true,
    });
  });

  it("calls next() when passed a route that has been completed in pageStateService", async () => {
    //to, from, next
    jest.useFakeTimers();
    await pageStateService.importPageRoutes(payPractitionerRouteStepOrder);
    await wrapper.vm.$nextTick;
    await pageStateService.setPageComplete(
      payPractitionerRouteStepOrder[0].path
    );
    await wrapper.vm.$nextTick;
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPractitionerRouteStepOrder[0],
      payPractitionerRouteStepOrder[1],
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
      payPractitionerRouteStepOrder[0],
      payPractitionerRouteStepOrder[1],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
