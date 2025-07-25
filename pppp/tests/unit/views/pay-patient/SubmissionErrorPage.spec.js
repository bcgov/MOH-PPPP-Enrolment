import { shallowMount, mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/SubmissionErrorPage.vue";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import spaEnvService from "@/services/spa-env-service";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import { payPatientRoutes, payPatientRouteStepOrder } from "@/router/routes";
import { routeCollection } from "@/router/index";

const next = vi.fn();

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = vi.spyOn(scrollHelper, "scrollTo");

const spyOnLogNavigation = vi
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnSetPageIncomplete = vi
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

vi.spyOn(window, "scrollTo").mockImplementation(vi.fn);

describe("SubmissionErrorPage pay patient", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplate);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: vi.fn(),
    };
    wrapper = mount(Page, {
      global: {
        plugins: [store],
      },
      mocks: {
        $route,
        $router,
      },
    });
    vi.spyOn(wrapper.vm.$store, "dispatch");

    vi
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("SubmissionErrorPage pay patient created()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplate);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: vi.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
      },
      mocks: {
        $route,
        $router,
      },
    });
    vi.spyOn(wrapper.vm.$store, "dispatch");

    vi
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls logNavigation", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });
});

describe("SubmissionErrorPage.vue beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplate);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: vi.fn(),
    };
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
      mocks: {
        $route,
        $router,
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls scrollTo()", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("calls next() with proper arguments when passed route other than Home", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRoutes.REVIEW_PAGE,
      payPatientRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPatientRoutes.HOME_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
    });
  });

  it("calls next() with proper arguments when given to route of Home", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRoutes.HOME_PAGE,
      payPatientRouteStepOrder[1],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(next).toHaveBeenCalled();
  });

  it("calls spyOnSetPageIncomplete (valid route)", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });

  it("calls spyOnSetPageIncomplete (invalid route)", async () => {
    //to, from, next
    vi.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
