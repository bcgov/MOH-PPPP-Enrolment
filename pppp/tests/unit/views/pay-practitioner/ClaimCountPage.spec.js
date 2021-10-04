import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import Page from "@/views/pay-practitioner/ClaimCountPage.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-practitioner-form-dummy-data";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import {
  payPractitionerRoutes,
  payPractitionerRouteStepOrder,
} from "@/router/routes";
import { getConvertedPath } from "@/helpers/url";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

const testDate = new Date().getFullYear() - 1;
const next = jest.fn();

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const storeTemplate2 = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const practitionerState = {
  isInfoCollectionNoticeOpen: true,
  applicationUuid: null,
};

const practitionerState2 = cloneDeep(dummyDataValid.default);
practitionerState2.medicalServiceClaims[0].serviceDate = testDate;

storeTemplate.modules.payPractitionerForm.state = cloneDeep(practitionerState);
storeTemplate2.modules.payPractitionerForm.state = cloneDeep(
  practitionerState2
);

const spyOnLogService = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

jest.spyOn(window, "scrollTo").mockImplementation(jest.fn);

const spyOnGetTopScrollPosition = jest
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnVisitPage = jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

const spyOnSetPageComplete = jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

describe("ClaimCountPage.vue render test", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
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

describe("ClaimCountPage.vue created()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls logService", () => {
    expect(spyOnLogService).toHaveBeenCalled();
  });

  /* 
  I spent a number of hours trying to test the code in the if (this.isFirstLoad()) {} block. 
  I came to the conclusion that it may not be possible to do for lifecycle reasons.
  The order of operations looks like this:
  1. Created() test runs
  2. New Store is created
  3. The if (this.isFirstLoad()) {} code block recognizes that there isn't a UUID, so it assigns one
  4. The if block calls all of the other functions inside the if block
  5. The mounted() method creates any spies to check to see if those functions are called
  6. If you call the created() hook a second time, the if block sees there's already a UUID
  So it doesn't call anything in the if block a second time
  7. The spies don't catch the function calls because they're created after the function is called
  And it's not really possible to call them a second time without refactoring the code

  If it's essential that these functions be tested, the contents of the if block would need to be moved to a separate function
  Then that function can be called independently of the if block and tested that way
  Until then, I leave these comments as an aid to anyone who tries to attempt this in the future
  */
});

describe("ClaimCountPage.vue isFirstLoad()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false", () => {
    const result = wrapper.vm.isFirstLoad();
    expect(result).toEqual(false);
  });

  //the true version of this test is impossible to verify
  //for the reasons stated in the created() section
});

describe("ClaimCountPage.vue handleCaptchaVerified()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls dispatch with correct parameters", () => {
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    wrapper.vm.handleCaptchaVerified("captchaTokenTest");
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_CAPTCHA_TOKEN}`,
      "captchaTokenTest"
    );
  });

  it("assigns value to store such that it can be retrieved later", () => {
    wrapper.vm.handleCaptchaVerified("captchaTokenTest");
    expect(wrapper.vm.$store.state.payPractitionerForm.captchaToken).toEqual(
      "captchaTokenTest"
    );
  });
});

describe("ClaimCountPage.vue handleCloseConsentModal()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls dispatch with correct parameters", () => {
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    wrapper.vm.handleCloseConsentModal();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_IS_INFO_COLLECTION_NOTICE_OPEN}`,
      false
    );
  });

  it("assigns value to store such that it can be retrieved later", () => {
    wrapper.vm.handleCloseConsentModal();
    expect(
      wrapper.vm.$store.state.payPractitionerForm.isInfoCollectionNoticeOpen
    ).toEqual(false);
  });
});

describe("ClaimCountPage.vue validateFields() part 1 (invalid)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnRouter;
  let spyOnDispatch;

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

    spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
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

describe("ClaimCountPage.vue validateFields() part 2 (valid)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnRouter;
  let spyOnDispatch;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate2);
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

    spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
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
          amountBilled: "0.00",
          calledStartTime: { hour: "08", minute: "08" },
          correspondenceAttached: null,
          diagnosticCode: "001",
          feeItem: "03333",
          locationOfService: "A",
          notes: "Notes here.",
          numberOfServices: "1",
          renderedFinishTime: { hour: "16", minute: "06" },
          serviceClarificationCode: "A1",
          serviceDate: testDate,
          serviceDateData: null,
          submissionCode: "I",
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
          amountBilled: "0.00",
          correspondenceAttached: null,
          dayFrom: "24",
          dayTo: "26",
          diagnosticCode: "001",
          feeItem: "03333",
          locationOfService: "A",
          month: "12",
          notes: "Notes here.",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          submissionCode: "I",
          year: "2020",
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

  it("calls router.push with correct argumentt", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).toHaveBeenCalledWith(
      getConvertedPath(
        wrapper.vm.$router.currentRoute.path,
        payPractitionerRoutes.MAIN_FORM_PAGE.path
      )
    );
  });
});

describe("ClaimCountPage.vue beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnRouter;
  let spyOnDispatch;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate2);
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

    spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
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
      wrapper.vm.$router.currentRoute.path,
      payPractitionerRoutes.CLAIM_COUNT_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
      replace: true,
    });
  });

  it("calls next() with proper arguments when given valid route", async () => {
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
    expect(next).toHaveBeenCalled();
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
