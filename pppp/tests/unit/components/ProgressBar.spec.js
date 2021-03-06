import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/components/ProgressBar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pageStateService from "@/services/page-state-service";
import { cloneDeep } from "lodash";
import { payPatientStepRoutes as stepRoutes } from "@/router/step-routes";
import { payPatientRouteStepOrder as routeStepOrder } from "@/router/routes";
import * as module1 from "../../../src/store/modules/app";
import * as module2 from "../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../src/store/modules/pay-practitioner-form";

const storeTemplate = {
  modules: {
    app: cloneDeep(module1),
    payPatientForm: cloneDeep(module2),
    payPractitionerForm: cloneDeep(module3),
  },
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
const router = new VueRouter();

const scrollHelper = require("@/helpers/scroll");
// const addressHelper = require("@/helpers/address");
// const stringHelper = require("@/helpers/string");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const spyOnRouter = jest
  .spyOn(router, "push")
  .mockImplementation(() => Promise.resolve("pushed"));

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

// const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

describe("ProgressBar.vue", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = shallowMount(Component, {
      localVue,
      store,
      propsData: {
        currentPath: routeStepOrder[1].path,
        routes: stepRoutes,
      },
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", async () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("ProgressBar.vue onClickLink()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = shallowMount(Component, {
      localVue,
      store,
      propsData: {
        currentPath: routeStepOrder[1].path,
        routes: stepRoutes,
      },
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls pageStateService.setPageComplete when passed valid path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageComplete).toHaveBeenCalledWith(
      routeStepOrder[0].path
    );
  });

  it("calls pageStateService.setPagesetPageIncomplete when passed valid path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageIncomplete).toHaveBeenCalledWith(
      routeStepOrder[1].path
    );
  });

  it("calls scrollTo when passed valid path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls router when passed valid path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(spyOnRouter).toHaveBeenCalledWith(routeStepOrder[0].path);
  });

  it("does not call pageStateService.setPageComplete when passed invalid path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageComplete).not.toHaveBeenCalled();
  });

  it("does not call pageStateService.setPageIncomplete when passed invalid path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageIncomplete).not.toHaveBeenCalled();
  });

  it("does not call scrollTo() when passed invalid path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
  });

  it("does not call router when passed invalid path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(spyOnRouter).not.toHaveBeenCalled();
  });

  it("does not change pages when passed future path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[2].path);
    await wrapper.vm.$nextTick();
    expect(spyOnRouter).not.toHaveBeenCalled();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
    expect(pageStateService.setPageIncomplete).not.toHaveBeenCalled();
    expect(pageStateService.setPageComplete).not.toHaveBeenCalled();
  });
});

describe("ProgressBar.vue openDropdown() and closeDropdown()", () => {
  const stringCall = `${module1.MODULE_NAME}/${module1.SET_SHOW_MOBILE_STEPPER_DETAILS}`;
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = shallowMount(Component, {
      localVue,
      store,
      propsData: {
        currentPath: routeStepOrder[1].path,
        routes: stepRoutes,
      },
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("dispatches with true when openDropdown() is called", async () => {
    const spyOnDispatch = jest
      .spyOn(wrapper.vm.$store, "dispatch")
      .mockImplementation(jest.fn());
    await wrapper.vm.openDropdown();
    await wrapper.vm.$nextTick();
    expect(spyOnDispatch).toHaveBeenCalledWith(stringCall, true);
  });

  it("dispatches with false when closeDropdown() is called", async () => {
    const spyOnDispatch = jest
      .spyOn(wrapper.vm.$store, "dispatch")
      .mockImplementation(jest.fn());
    await wrapper.vm.closeDropdown();
    await wrapper.vm.$nextTick();
    expect(spyOnDispatch).toHaveBeenCalledWith(stringCall, false);
  });
});

describe("ProgressBar.vue getLinkStyles()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = shallowMount(Component, {
      localVue,
      store,
      propsData: {
        currentPath: routeStepOrder[1].path,
        routes: stepRoutes,
      },
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns an object", async () => {
    const result = wrapper.vm.getLinkStyles(routeStepOrder[0].path);
    expect(typeof result).toBe("object");
  });

  it("returns an object containing pointer when passed a valid path in the past", async () => {
    const result = wrapper.vm.getLinkStyles(routeStepOrder[0].path);
    expect(result).toHaveProperty("cursor", "pointer");
  });

  it("returns an object containing default when passed an invalid path", async () => {
    const result = wrapper.vm.getLinkStyles("asdf");
    expect(result).toHaveProperty("cursor", "default");
  });

  it("returns an object containing default when passed a valid path in the future", async () => {
    const result = wrapper.vm.getLinkStyles(routeStepOrder[2].path);
    expect(result).toHaveProperty("cursor", "default");
  });
});
