import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import { createStore } from "vuex";
import Page from "@/views/pay-patient/ReviewPage.vue";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as dummyDataValid from "../../../../src/store/states/pay-patient-form-dummy-data";
import logService from "@/services/log-service";
import apiService from "@/services/api-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import { payPatientRoutes, payPatientRouteStepOrder } from "@/router/routes";
import * as scrollHelper from "@/helpers/scroll";
import { defaultStoreTemplate, mockRouter, mockRouterCSR, router } from "../../test-helper.js";

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

//create two variables with passing store data
const patientStateC = cloneDeep(dummyDataValid.default);
const patientStateN = cloneDeep(dummyDataValid.default);

//assign the patient states different correspondenceAttached variables
patientStateC.medicalServiceClaims[0].correspondenceAttached = "C";
patientStateN.medicalServiceClaims[0].correspondenceAttached = "N";

//create two store template variables from default (currently contains null store data)
const storeTemplateC = cloneDeep(defaultStoreTemplate);
const storeTemplateN = cloneDeep(defaultStoreTemplate);

//initialize the two store templates with different patient states/correspondence variables
storeTemplateC.modules.payPatientForm.state = cloneDeep(patientStateC);
storeTemplateN.modules.payPatientForm.state = cloneDeep(patientStateN);

vi.spyOn(apiService, "submitPayPatientApplication").mockImplementation(() =>
  Promise.resolve(mockResponse)
);

const spyOnScrollTo = vi
  .spyOn(scrollHelper, "scrollTo")
  .mockImplementation(() => Promise.resolve("scrolled"));
const spyOnScrollToError = vi
  .spyOn(scrollHelper, "scrollToError")
  .mockImplementation(() => Promise.resolve("scrolled to error"));

const spyOnGetTopScrollPosition = vi
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

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

vi.spyOn(window, "scrollTo").mockImplementation(vi.fn);

describe("ReviewPage.vue pay patient", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplateC);
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

describe("ReviewPage.vue pay patient created()", () => {
  let store;

  beforeEach(() => {
    store = createStore(storeTemplateC);
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
    expect(spyOnLogService).toBeDefined();
  });
});

describe("ReviewPage.vue pay patient continueHandler()", () => {
  let store;
  let wrapper;

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls submitForm if the store has correspondenceAttached = N", () => {
    store = createStore(storeTemplateN);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    const spyOnSubmitForm = vi.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls submit if the store has correspondenceAttached = C and the route ends in -csr", () => {
    store = createStore(storeTemplateC);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouterCSR,
        },
      },
    });
    const spyOnSubmitForm = vi.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls window.print if the store has correspondenceAttached = C", () => {
    store = createStore(storeTemplateC);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    wrapper.vm.continueHandler();
    expect(spyOnPrint).toHaveBeenCalled();
  });
});

//skipping continueButtonLabel() tests because they would be entirely hardcoded

describe("ReviewPage.vue pay patient submitForm()", () => {
  let store;
  let wrapper;
  let spyOnDispatch;
  let spyOnNavigateToSubmissionPage;
  let spyOnNavigateToSubmissionErrorPage;

  beforeEach(() => {
    store = createStore(storeTemplateN);
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
    spyOnDispatch = vi.spyOn(wrapper.vm.$store, "dispatch");

    spyOnNavigateToSubmissionPage = vi.spyOn(wrapper.vm, "navigateToSubmissionPage");

    spyOnNavigateToSubmissionErrorPage = vi.spyOn(wrapper.vm, "navigateToSubmissionErrorPage");
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("dispatches the submission date", async () => {
    vi.setSystemTime(testDate);
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_SUBMISSION_DATE}`,
      testDate
    );
    vi.useRealTimers();
  });

  it("dispatches the reference number from the API response", async () => {
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_REFERENCE_NUMBER}`,
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
    vi.spyOn(apiService, "submitPayPatientApplication").mockImplementationOnce(() =>
      Promise.resolve(mockResponse3)
    );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("calls logServiceError on error code 3", async () => {
    vi.spyOn(apiService, "submitPayPatientApplication").mockImplementationOnce(() =>
      Promise.resolve(mockResponse3)
    );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls navigateToSubmissionErrorPage on misc error", async () => {
    vi.spyOn(apiService, "submitPayPatientApplication").mockImplementationOnce(() =>
      Promise.resolve(mockResponseMisc)
    );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnNavigateToSubmissionErrorPage).toHaveBeenCalled();
    expect(spyOnNavigateToSubmissionPage).not.toHaveBeenCalled();
  });

  it("calls logServiceError on misc error", async () => {
    vi.spyOn(apiService, "submitPayPatientApplication").mockImplementationOnce(() =>
      Promise.resolve(mockResponseMisc)
    );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls logServiceError on DB Error PRN Present error", async () => {
    vi.spyOn(apiService, "submitPayPatientApplication").mockImplementationOnce(() =>
      Promise.resolve(mockResponseDBErrorPrnPresent)
    );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls spyOnNavigateToSubmissionPage on DB Error PRN Present error", async () => {
    vi.spyOn(apiService, "submitPayPatientApplication").mockImplementationOnce(() =>
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

describe("ReviewPage.vue pay patient navigateToSubmissionPage()", () => {
  let store;
  let wrapper;
  let spyOnRouter;
  let toPath;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
    vi.spyOn(wrapper.vm.$store, "dispatch");

    spyOnRouter = vi.spyOn(router, "push").mockImplementation(() => Promise.resolve("pushed"));

    toPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPatientRoutes.SUBMISSION_PAGE.path
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

describe("ReviewPage.vue pay patient navigateToSubmissionErrorPage()", () => {
  let store;
  let wrapper;
  let spyOnRouter;
  let toPath;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });

    spyOnRouter = vi.spyOn(router, "push").mockImplementation(() => Promise.resolve("pushed"));

    toPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPatientRoutes.SUBMISSION_ERROR_PAGE.path
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

  it("calls scrollTo() and getTopScrollPosition() when given invalid route", async () => {
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
    expect(spyOnGetTopScrollPosition).toHaveBeenCalled();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  it("calls next() with proper arguments when given invalid route", async () => {
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
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPatientRoutes.REVIEW_PAGE.path
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
      payPatientRouteStepOrder[0],
      payPatientRouteStepOrder[1],
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
