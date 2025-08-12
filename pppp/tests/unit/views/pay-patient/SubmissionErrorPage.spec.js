import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Page from "@/views/pay-patient/SubmissionErrorPage.vue";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import { payPatientRoutes, payPatientRouteStepOrder } from "@/router/routes";
import * as scrollHelper from "@/helpers/scroll"; 
import {
  defaultStoreTemplate,
  router
} from "../../test-helper.js";

const next = vi.fn();
const storeTemplate = defaultStoreTemplate;

const spyOnScrollTo = vi.spyOn(scrollHelper, "scrollTo").mockImplementation(() => Promise.resolve("scrolled"));;

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

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
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

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
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

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
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
