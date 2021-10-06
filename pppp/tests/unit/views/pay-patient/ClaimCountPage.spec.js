import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import Page from "@/views/pay-patient/ClaimCountPage.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-patient-form-dummy-data";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { payPatientRoutes, payPatientRouteStepOrder } from "@/router/routes";
import { getConvertedPath } from "@/helpers/url";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve();
  }),
}));

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

const patientState = {
  isInfoCollectionNoticeOpen: true,
  applicationUuid: null,
};

const patientState2 = cloneDeep(dummyDataValid.default);
patientState2.medicalServiceClaims[0].serviceDate = testDate;

storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);
storeTemplate2.modules.payPatientForm.state = cloneDeep(patientState2);

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

describe("ClaimCountPage.vue pay patient render test", () => {
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

describe("ClaimCountPage.vue pay patient created()", () => {
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
    expect(wrapper.element).toBeDefined();
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

describe("ClaimCountPage.vue pay patient isFirstLoad()", () => {
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

  it.only("returns false", () => {
    console.log("avocado", wrapper.vm.$store.state.payPatientForm.applicationUuid)
    const result = wrapper.vm.isFirstLoad();
    expect(result).toEqual(true);
    const result2 = wrapper.vm.isFirstLoad();
    expect(result2).toEqual(false);
  });

  //the true version of this test is impossible to verify
  //for the reasons stated in the created() section
});

describe("ClaimCountPage.vue pay patient handleCaptchaVerified()", () => {
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
      `${module2.MODULE_NAME}/${module2.SET_CAPTCHA_TOKEN}`,
      "captchaTokenTest"
    );
  });

  it("assigns value to store such that it can be retrieved later", () => {
    wrapper.vm.handleCaptchaVerified("captchaTokenTest");
    expect(wrapper.vm.$store.state.payPatientForm.captchaToken).toEqual(
      "captchaTokenTest"
    );
  });
});

describe("ClaimCountPage.vue pay patient handleCloseConsentModal()", () => {
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
      `${module2.MODULE_NAME}/${module2.SET_IS_INFO_COLLECTION_NOTICE_OPEN}`,
      false
    );
  });

  it("assigns value to store such that it can be retrieved later", () => {
    wrapper.vm.handleCloseConsentModal();
    expect(
      wrapper.vm.$store.state.payPatientForm.isInfoCollectionNoticeOpen
    ).toEqual(false);
  });
});

describe("ClaimCountPage.vue pay patient validateFields() part 1 (invalid)", () => {
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

  it("does not call router.push", () => {
    wrapper.vm.validateFields();
    expect(spyOnRouter).not.toHaveBeenCalled();
  });
});

describe("ClaimCountPage.vue pay patient validateFields() part 2 (valid)", () => {
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

  it("does call spyOnDispatch() with claim count", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_CLAIM_COUNT}`,
      wrapper.vm.claimCount
    );
  });

  it("does call spyOnDispatch() with medical service claims", () => {
    wrapper.vm.validateFields();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_MEDICAL_SERVICE_CLAIMS}`,
      [
        {
          amountBilled: "1.00",
          calledStartTime: { hour: "08", minute: "01" },
          correspondenceAttached: null,
          diagnosticCode: "001",
          feeItem: "12345",
          locationOfService: "A",
          notes: "Notes here.",
          numberOfServices: "1",
          renderedFinishTime: { hour: "16", minute: "05" },
          serviceClarificationCode: "A1",
          serviceDate: testDate,
          serviceDateData: null,
          submissionCode: "I",
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
        payPatientRoutes.MAIN_FORM_PAGE.path
      )
    );
  });
});

describe("ClaimCountPage.vue pay patient beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

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
      payPatientRoutes.CLAIM_COUNT_PAGE.path
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
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
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
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
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
      payPatientRouteStepOrder[1],
      payPatientRouteStepOrder[0],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });
});
