import { shallowMount, createLocalVue } from "@vue/test-utils";
import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import { createRouter, createWebHistory } from "vue-router";
import Page from "@/views/pay-practitioner/SubmissionPage.vue";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import spaEnvService from "@/services/spa-env-service";
import logService from "@/services/log-service";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import {
  payPractitionerRoutes,
  payPractitionerRouteStepOrder,
} from "@/router/routes";
import { routeCollection } from "@/router/index";

// const localVue = createLocalVue();
// localVue.use(Vuex);
// localVue.component("font-awesome-icon", FontAwesomeIcon);

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

const next = vi.fn();
const spyOnPrint = vi.spyOn(window, "print").mockImplementation(vi.fn);

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = vi.spyOn(scrollHelper, "scrollTo");

const spyOnLogNavigation = vi
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnSetPageIncomplete = vi
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

vi.spyOn(window, "scrollTo").mockImplementation(vi.fn);

describe("SubmissionPage.vue pay practitioner", () => {
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
        plugins: [store, router],
      },
    });
    vi.spyOn(wrapper.vm.$store, "dispatch");

    vi
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    // wrapper.vm.$options.created.forEach((hook) => {
    //   hook.call(wrapper.vm);
    // });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("SubmissionPage.vue pay practitioner created()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store, router],
      },
    });
    vi.spyOn(wrapper.vm.$store, "dispatch");

    vi
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    // wrapper.vm.$options.created.forEach((hook) => {
    //   hook.call(wrapper.vm);
    // });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls logNavigation", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });
});

describe("SubmissionPage.vue pay practitioner printPage()", () => {
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
        plugins: [store, router],
      },
    });
    vi.spyOn(wrapper.vm.$store, "dispatch");

    vi
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    // wrapper.vm.$options.created.forEach((hook) => {
    //   hook.call(wrapper.vm);
    // });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls window.print()", () => {
    wrapper.vm.printPage();
    expect(spyOnPrint).toHaveBeenCalled();
  });
});

describe("SubmissionPage.vue beforeRouteLeave(to, from, next)", () => {
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
        plugins: [store, router],
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
      payPractitionerRouteStepOrder[1],
      payPractitionerRouteStepOrder[0],
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
      payPractitionerRoutes.REVIEW_PAGE,
      payPractitionerRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.HOME_PAGE.path
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
      payPractitionerRoutes.HOME_PAGE,
      payPractitionerRouteStepOrder[1],
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
      payPractitionerRouteStepOrder[0],
      payPractitionerRouteStepOrder[1],
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
      payPractitionerRouteStepOrder[1],
      payPractitionerRouteStepOrder[0],
      next
    );
    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
