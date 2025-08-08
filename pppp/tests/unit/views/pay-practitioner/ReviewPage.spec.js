import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-practitioner/ReviewPage.vue";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-practitioner-form-dummy-data";
import logService from "@/services/log-service";
import apiService from "@/services/api-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import {
  payPractitionerRoutes,
  payPractitionerRouteStepOrder,
} from "@/router/routes";
import * as scrollHelper from "@/helpers/scroll";

const mockRouterCSR = {
  $router: {
    push: vi.fn(),
    currentRoute: {
      value: {
        path: "/potato-csr",
      },
    },
  },
};

const mockRouter = {
  $router: {
    push: vi.fn(),
    currentRoute: {
      value: {
        path: "/potato",
      },
    },
  },
};

const mockResponse = {
  data: {
    applicationUuid: "ed8fcf17-fb1f-4b3d-93aa-1ba5fbfb2898",
    requestUuid: "d88ecb3b-0ce5-4849-a349-e91fd7b11618",
    returnCode: "0",
    returnMessage: "Success",
    planReferenceNumber: "1270900001",
  },
  status: 200,
  statusText: "OK",
};

const mockResponse3 = {
  data: {
    applicationUuid: "ed8fcf17-fb1f-4b3d-93aa-1ba5fbfb2898",
    requestUuid: "d88ecb3b-0ce5-4849-a349-e91fd7b11618",
    returnCode: "3",
    returnMessage: "Success",
    planReferenceNumber: "1270900001",
  },
  status: 200,
  statusText: "OK",
};

const mockResponseMisc = {
  data: {
    applicationUuid: "ed8fcf17-fb1f-4b3d-93aa-1ba5fbfb2898",
    requestUuid: "d88ecb3b-0ce5-4849-a349-e91fd7b11618",
    returnCode: "-1",
    returnMessage: "Error message",
  },
  status: 200,
  statusText: "OK",
};

const mockResponseDBErrorPrnPresent = {
  data: {
    applicationUuid: "80b041ce-d638-5961-e881-4b55d32c8cd2",
    requestUuid: "01b041ce-d638-5961-e891-4b55d32c8cd2",
    returnCode: "404",
    returnMessage: "Not Found",
    planReferenceNumber: "1301900007",
  },
};

const next = vi.fn();
const testDate = new Date();

//The following code creates four templates for testing purposes.
//storeTemplateC has medical claims set to C. storeTemplateN has medical claims set to N.
//storeTemplateNHospitalC and storeTemplateNHospitalN also have *medical* claims set to N.
//NHospitalC has *hospital* claims set to C. NHospitalN has *hospital* claims set to N.

const storeTemplateC = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const storeTemplateN = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const storeTemplateNHospitalC = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const storeTemplateNHospitalN = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const practitionerStateC = cloneDeep(dummyDataValid.default);
const practitionerStateN = cloneDeep(dummyDataValid.default);
const practitionerStateNHospitalC = cloneDeep(dummyDataValid.default);
const practitionerStateNHospitalN = cloneDeep(dummyDataValid.default);

practitionerStateC.medicalServiceClaims[0].correspondenceAttached = "C";
practitionerStateN.medicalServiceClaims[0].correspondenceAttached = "N";
practitionerStateNHospitalC.medicalServiceClaims[0].correspondenceAttached =
  "N";
practitionerStateNHospitalN.medicalServiceClaims[0].correspondenceAttached =
  "N";

practitionerStateNHospitalC.hospitalVisitClaims[0].correspondenceAttached = "C";
practitionerStateNHospitalN.hospitalVisitClaims[0].correspondenceAttached = "N";

storeTemplateC.modules.payPractitionerForm.state =
  cloneDeep(practitionerStateC);
storeTemplateN.modules.payPractitionerForm.state =
  cloneDeep(practitionerStateN);
storeTemplateNHospitalC.modules.payPractitionerForm.state = cloneDeep(
  practitionerStateNHospitalC
);
storeTemplateNHospitalN.modules.payPractitionerForm.state = cloneDeep(
  practitionerStateNHospitalN
);

//required to prevent date errors
vi.spyOn(global, "Date").mockImplementation(() => testDate);

vi.spyOn(apiService, "submitPayPractitionerApplication").mockImplementation(
  () => Promise.resolve(mockResponse)
);

const spyOnVisitPage = vi.spyOn(pageStateService, "visitPage");

const spyOnSetPageComplete = vi.spyOn(pageStateService, "setPageComplete");

const spyOnSetPageIncomplete = vi
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnLogService = vi
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnLogServiceSubmission = vi
  .spyOn(logService, "logSubmission")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnLogServiceError = vi
  .spyOn(logService, "logError")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnPrint = vi.spyOn(window, "print").mockImplementation(vi.fn);

const spyOnScrollTo = vi
  .spyOn(scrollHelper, "scrollTo")
  .mockImplementation(() => Promise.resolve("scrolled"));
  
const spyOnScrollToError = vi
  .spyOn(scrollHelper, "scrollToError")
  .mockImplementation(() => Promise.resolve("scrolled to error"));

const spyOnGetTopScrollPosition = vi
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

describe("ReviewPage.vue pay practitioner", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
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

describe("ReviewPage.vue pay practitioner created()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls logService", () => {
    expect(spyOnLogService).toBeDefined();
  });
});

describe("ReviewPage.vue pay practitioner continueHandler()", () => {
  let store;
  let wrapper;

  beforeEach(() => {});

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls submitForm if the store has medical claims correspondenceAttached = N", () => {
    store = createStore(storeTemplateN);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = vi.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls window.print if the store has medical claims correspondenceAttached = C", () => {
    store = createStore(storeTemplateC);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouter,
      },
    });
    wrapper.vm.continueHandler();
    expect(spyOnPrint).toHaveBeenCalled();
  });

  it("calls submit if the store has medical claims correspondenceAttached = C and -csr route", () => {
    store = createStore(storeTemplateC);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = vi.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls submitForm if the store has medical claims correspondenceAttached = N and hospital claims = N", () => {
    store = createStore(storeTemplateNHospitalN);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = vi.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls window.print if the store has medical claims correspondenceAttached = N and hospital claims = C", () => {
    store = createStore(storeTemplateNHospitalC);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouter,
      },
    });
    wrapper.vm.continueHandler();
    expect(spyOnPrint).toHaveBeenCalled();
  });

  it("calls submitForm if the store has medical claims correspondenceAttached = N and hospital claims = C and -csr route", () => {
    store = createStore(storeTemplateNHospitalC);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = vi.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });
});

//skipping continueButtonLabel() tests because they would be entirely hardcoded

describe("ReviewPage.vue pay practitioner submitForm()", () => {
  let store;
  let wrapper;
  let spyOnDispatch;
  let spyOnNavigateToSubmissionPage;
  let spyOnNavigateToSubmissionErrorPage;

  beforeEach(() => {
    store = createStore(storeTemplateN);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    spyOnDispatch = vi.spyOn(wrapper.vm.$store, "dispatch");

    spyOnNavigateToSubmissionPage = vi.spyOn(
      wrapper.vm,
      "navigateToSubmissionPage"
    );

    spyOnNavigateToSubmissionErrorPage = vi.spyOn(
      wrapper.vm,
      "navigateToSubmissionErrorPage"
    );
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("dispatches the submission date", async () => {
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_SUBMISSION_DATE}`,
      testDate
    );
  });

  it("dispatches the reference number from the API response", async () => {
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module3.MODULE_NAME}/${module3.SET_REFERENCE_NUMBER}`,
      mockResponse.data.planReferenceNumber
    );
  });

  it("calls logService.logSubmission on successful submission", async () => {
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceSubmission).toHaveBeenCalled();
  });

  it("calls navigateToSubmissionPage on successful submission", async () => {
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnNavigateToSubmissionPage).toHaveBeenCalled();
  });

  it("calls scrollToError on error code 3", async () => {
    vi.spyOn(
      apiService,
      "submitPayPractitionerApplication"
    ).mockImplementationOnce(() => Promise.resolve(mockResponse3));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("calls logServiceError on error code 3", async () => {
    vi.spyOn(
      apiService,
      "submitPayPractitionerApplication"
    ).mockImplementationOnce(() => Promise.resolve(mockResponse3));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls navigateToSubmissionErrorPage on misc error", async () => {
    vi.spyOn(
      apiService,
      "submitPayPractitionerApplication"
    ).mockImplementationOnce(() => Promise.resolve(mockResponseMisc));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnNavigateToSubmissionErrorPage).toHaveBeenCalled();
    expect(spyOnNavigateToSubmissionPage).not.toHaveBeenCalled();
  });

  it("calls logServiceError on misc error", async () => {
    vi.spyOn(
      apiService,
      "submitPayPractitionerApplication"
    ).mockImplementationOnce(() => Promise.resolve(mockResponseMisc));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls logServiceError on DB Error PRN Present error", async () => {
    vi.spyOn(
      apiService,
      "submitPayPractitionerApplication"
    ).mockImplementationOnce(() =>
      Promise.resolve(mockResponseDBErrorPrnPresent)
    );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls spyOnNavigateToSubmissionPage on DB Error PRN Present error", async () => {
    vi.spyOn(
      apiService,
      "submitPayPractitionerApplication"
    ).mockImplementationOnce(() =>
      Promise.resolve(mockResponseDBErrorPrnPresent)
    );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnNavigateToSubmissionPage).toHaveBeenCalled();
    expect(spyOnNavigateToSubmissionErrorPage).not.toHaveBeenCalled();
  });

  //had difficulty replicating the conditions for an http error
  //coworkers said not to worry about it, but future state could include those tests
});

describe("ReviewPage.vue pay practitioner navigateToSubmissionPage()", () => {
  let store;
  let wrapper;
  let $router;
  let spyOnRouter;
  let toPath;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    //declared a separate $router to make mocking/spying easier
    $router = {
      currentRoute: {
        value: {
          path: "/potato-csr",
        },
      },
      push: vi.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router,
        },
      },
    });

    spyOnRouter = vi
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    toPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.SUBMISSION_PAGE.path
    );

    wrapper.vm.navigateToSubmissionPage();
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("pushes to the router with correct argument", () => {
    expect(spyOnRouter).toHaveBeenCalledWith(toPath);
  });

  it("calls pageStateService visitPage with correct argument", () => {
    expect(spyOnVisitPage).toHaveBeenCalledWith(toPath);
  });

  it("calls pageStateService setPageComplete with correct argument", () => {
    expect(spyOnSetPageComplete).toHaveBeenCalledWith(toPath);
  });

  it("calls scrollTo", () => {
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewPage.vue pay practitioner navigateToSubmissionErrorPage()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnRouter;
  let toPath;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    $router = {
      $route,
      currentRoute: {
        value: {
          path: "/potato-csr",
        },
      },
      push: vi.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router,
        },
      },
    });
    spyOnRouter = vi
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    toPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.SUBMISSION_ERROR_PAGE.path
    );

    wrapper.vm.navigateToSubmissionErrorPage();
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("pushes to the router with correct argument", () => {
    expect(spyOnRouter).toHaveBeenCalledWith(toPath);
  });

  it("calls pageStateService visitPage with correct argument", () => {
    expect(spyOnVisitPage).toHaveBeenCalledWith(toPath);
  });

  it("calls pageStateService setPageComplete with correct argument", () => {
    expect(spyOnSetPageComplete).toHaveBeenCalledWith(toPath);
  });

  it("calls scrollTo", () => {
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewPage.vue beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplateN);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
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
      payPractitionerRoutes.REVIEW_PAGE.path
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
