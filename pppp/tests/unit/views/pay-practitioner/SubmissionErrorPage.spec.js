import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-practitioner/SubmissionErrorPage.vue";
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

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("font-awesome-icon", FontAwesomeIcon);

const next = jest.fn();

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

jest.spyOn(window, "scrollTo").mockImplementation(jest.fn);

describe("SubmissionPage.vue pay practitioner", () => {
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
    wrapper = shallowMount(Page, {
      localVue,
      store,
      mocks: {
        $route,
        $router,
      },
    });
    jest.spyOn(wrapper.vm.$store, "dispatch");

    jest
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

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("SubmissionPage.vue pay practitioner created()", () => {
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
    wrapper = shallowMount(Page, {
      localVue,
      store,
      mocks: {
        $route,
        $router,
      },
    });
    jest.spyOn(wrapper.vm.$store, "dispatch");

    jest
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

  it("calls logNavigation", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });
});

describe("SubmissionPage.vue beforeRouteLeave(to, from, next)", () => {
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
    wrapper = shallowMount(Page, {
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

  it("calls scrollTo()", async () => {
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
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("calls next() with proper arguments when passed route other than Home", async () => {
    //to, from, next
    jest.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPractitionerRoutes.REVIEW_PAGE,
      payPractitionerRouteStepOrder[0],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.path,
      payPractitionerRoutes.HOME_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
    });
  });

  it("calls next() with proper arguments when given to route of Home", async () => {
    //to, from, next
    jest.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPractitionerRoutes.HOME_PAGE,
      payPractitionerRouteStepOrder[1],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(next).toHaveBeenCalled();
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

  it("calls spyOnSetPageIncomplete (invalid route)", async () => {
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
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
