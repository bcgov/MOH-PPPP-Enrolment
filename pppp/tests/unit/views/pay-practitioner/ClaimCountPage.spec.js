import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Page from "@/views/pay-practitioner/ClaimCountPage.vue";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { payPractitionerRoutes, payPractitionerRouteStepOrder } from "@/router/routes";
import { getConvertedPath } from "@/helpers/url";
import { cloneDeep } from "common-lib-vue";
import * as scrollHelper from "@/helpers/scroll";
import { defaultStoreTemplate, mockRouterCSR, router } from "../../test-helper.js";
import * as dummyDataPractitionerValid from "@/store/states/pay-practitioner-form-dummy-data";

//required to prevent ECONNREFUSED errors
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(() => {
      return Promise.resolve();
    }),
  },
}));

const testDate = new Date();
testDate.setFullYear(testDate.getFullYear() - 1);
const next = vi.fn();

const dummyDataValid = cloneDeep(dummyDataPractitionerValid.default);
dummyDataValid.medicalServiceClaims[0].serviceDate = testDate;

//create null store template
const storeTemplate = cloneDeep(defaultStoreTemplate);

//create passing store template, then assign passing data
const passingStoreTemplate = cloneDeep(defaultStoreTemplate);
passingStoreTemplate.modules.payPractitionerForm.state = cloneDeep(dummyDataValid);

const spyOnLogService = vi
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnScrollTo = vi
  .spyOn(scrollHelper, "scrollTo")
  .mockImplementation(() => Promise.resolve("scrolled"));
const spyOnScrollToError = vi
  .spyOn(scrollHelper, "scrollToError")
  .mockImplementation(() => Promise.resolve("scrolled to error"));

const spyOnGetTopScrollPosition = vi
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnVisitPage = vi
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

const spyOnSetPageComplete = vi
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnSetPageIncomplete = vi
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

describe("ClaimCountPage.vue render test", () => {
  let wrapper;
  let store;

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

describe("ClaimCountPage.vue pay practitioner created()", () => {
  let store;

  beforeEach(() => {
    store = createStore(storeTemplate);
    mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls logService", () => {
    expect(spyOnLogService).toHaveBeenCalled();
  });
});

describe("ClaimCountPage.vue pay practitioner validateFields() part 1 (invalid)", () => {
  let store;
  let wrapper;
  let spyOnRouter;
  let spyOnDispatch;

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouterCSR,
        },
      },
    });

    spyOnDispatch = vi.spyOn(wrapper.vm.$store, "dispatch");
    spyOnRouter = vi
      .spyOn(mockRouterCSR, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls scrollToError", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("does not call dispatch()", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).not.toHaveBeenCalled();
  });

  it("does not call pageStateService.spyOnVisitPage()", () => {
    wrapper.vm.validateFields();
    expect(spyOnVisitPage).not.toHaveBeenCalled();
  });

  it("does not call pageStateService.spyOnSetPageComplete()", () => {
    wrapper.vm.validateFields();
    expect(spyOnSetPageComplete).not.toHaveBeenCalled();
  });

  it("does call scrollTo", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
  });

  it("does call router.push", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).not.toHaveBeenCalled();
  });
});

describe("ClaimCountPage.vue pay practitioner validateFields() part 2 (valid)", () => {
  //this test uses mocks to make spying on store/router functions easier
  let store;
  let wrapper;
  let spyOnRouter;
  let spyOnDispatch;

  beforeEach(() => {
    store = createStore(passingStoreTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouterCSR,
        },
      },
    });
    spyOnDispatch = vi.spyOn(wrapper.vm.$store, "dispatch");

    spyOnRouter = vi
      .spyOn(mockRouterCSR, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("does not call scrollToError()", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollToError).not.toHaveBeenCalled();
  });

  it("does call spyOnDispatch()", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it("does call spyOnDispatch() with medical services claim count", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_MEDICAL_SERVICE_CLAIMS_COUNT}`,
      wrapper.vm.medicalServiceClaimsCount
    );
  });

  it("does call spyOnDispatch() with hospital services claim count", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_HOSPITAL_VISIT_CLAIMS_COUNT}`,
      wrapper.vm.hospitalVisitClaimsCount
    );
  });

  it("does call spyOnDispatch() with medical service claims", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_MEDICAL_SERVICE_CLAIMS}`,
      [
        {
          amountBilled: dummyDataValid.medicalServiceClaims[0].amountBilled,
          calledStartTime: dummyDataValid.medicalServiceClaims[0].calledStartTime,
          correspondenceAttached: dummyDataValid.medicalServiceClaims[0].correspondenceAttached,
          diagnosticCode: dummyDataValid.medicalServiceClaims[0].diagnosticCode,
          feeItem: dummyDataValid.medicalServiceClaims[0].feeItem,
          locationOfService: dummyDataValid.medicalServiceClaims[0].locationOfService,
          notes: dummyDataValid.medicalServiceClaims[0].notes,
          numberOfServices: dummyDataValid.medicalServiceClaims[0].numberOfServices,
          renderedFinishTime: dummyDataValid.medicalServiceClaims[0].renderedFinishTime,
          serviceClarificationCode: dummyDataValid.medicalServiceClaims[0].serviceClarificationCode,
          serviceDate: cloneDeep(testDate),
          serviceDateData: null,
          submissionCode: dummyDataValid.medicalServiceClaims[0].submissionCode,
        },
      ]
    );
  });

  it("does call spyOnDispatch() with hospital service claims", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_HOSPITAL_VISIT_CLAIMS}`,
      [
        {
          amountBilled: dummyDataValid.hospitalVisitClaims[0].amountBilled,
          correspondenceAttached: dummyDataValid.hospitalVisitClaims[0].correspondenceAttached,
          dayFrom: dummyDataValid.hospitalVisitClaims[0].dayFrom,
          dayTo: dummyDataValid.hospitalVisitClaims[0].dayTo,
          diagnosticCode: dummyDataValid.hospitalVisitClaims[0].diagnosticCode,
          feeItem: dummyDataValid.hospitalVisitClaims[0].feeItem,
          locationOfService: dummyDataValid.hospitalVisitClaims[0].locationOfService,
          month: dummyDataValid.hospitalVisitClaims[0].month,
          notes: dummyDataValid.hospitalVisitClaims[0].notes,
          numberOfServices: dummyDataValid.hospitalVisitClaims[0].numberOfServices,
          serviceClarificationCode: dummyDataValid.hospitalVisitClaims[0].serviceClarificationCode,
          submissionCode: dummyDataValid.hospitalVisitClaims[0].submissionCode,
          year: dummyDataValid.hospitalVisitClaims[0].year,
        },
      ]
    );
  });

  it("does call pageStateService.spyOnVisitPage()", () => {
    wrapper.vm.validateFields();
    expect(spyOnVisitPage).toHaveBeenCalled();
  });

  it("does call pageStateService.spyOnSetPageComplete()", () => {
    wrapper.vm.validateFields();
    expect(spyOnSetPageComplete).toHaveBeenCalled();
  });

  it("does call scrollTo", () => {
    wrapper.vm.validateFields();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("does call router.push", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls router.push with correct argument", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).toHaveBeenCalledWith(
      getConvertedPath(
        wrapper.vm.$router.currentRoute.value.path,
        payPractitionerRoutes.MAIN_FORM_PAGE.path
      )
    );
  });
});

describe("ClaimCountPage.vue pay practitioner beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouterCSR,
        },
      },
    });

    vi.spyOn(wrapper.vm.$store, "dispatch");

    vi.spyOn(mockRouterCSR, "push").mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls scrollTo() and getTopScrollPosition() when given invalid route", async () => {
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
    expect(spyOnGetTopScrollPosition).toHaveBeenCalled();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("calls next() with proper arguments when given invalid route", async () => {
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
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.CLAIM_COUNT_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
      replace: true,
    });
  });

  it("calls next() with proper arguments when given valid route", async () => {
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
    expect(next).toHaveBeenCalled();
    expect(spyOnGetTopScrollPosition).not.toHaveBeenCalled();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
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
