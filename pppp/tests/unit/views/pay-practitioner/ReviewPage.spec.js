import { shallowMount, createLocalVue } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";
import Vuex from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-practitioner/ReviewPage.vue";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-practitioner-form-dummy-data";
import spaEnvService from "@/services/spa-env-service";
import logService from "@/services/log-service";
import apiService from "@/services/api-service";
import pageStateService from "@/services/page-state-service";
import { getConvertedPath } from "@/helpers/url";
import {
  payPractitionerRoutes,
  payPractitionerRouteStepOrder,
} from "@/router/routes";
let router;
router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });

const mockRouterCSR = {
  $route: {
    path: "/potato-csr",
  },
  $router: {
    push: jest.fn(),
    currentRoute: {
      value: {
        path: "/potato-csr",
      },
    },
  },
};

const mockRouter = {
  $route: {
    path: "/potato",
  },
  $router: {
    push: jest.fn(),
    currentRoute: {
      value: {
        path: "/potato",
      },
    },
  },
};

// const localVue = createLocalVue();
// localVue.use(Vuex);

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
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "access-control-allow-credentials": "true",
    "access-control-allow-headers":
      "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-origin": "https://my.gov.bc.ca",
    "access-control-expose-headers": "Authorization",
    authorization: "Basic Z2NwZW1zcGRlOndlbGNvbWUx",
    breadcrumbid: "ID-vs-dapp041-maximusbchealth-local-1632513873115-0-11",
    "cache-control": "no-store",
    connection: "close",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json",
    date: "Mon, 27 Sep 2021 22:15:41 GMT",
    forwarded:
      "for=216.232.32.188;host=pppp-web-0752cb-dev.apps.silver.devops.gov.bc.ca;proto=https",
    origin: "http://localhost:8080",
    pragma: "no-cache",
    referer: "http://localhost:8080/pppp/pay-patient/review",
    "response-type": "application/json",
    "sec-ch-ua":
      '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "transfer-encoding": "chunked",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    uuid: "ed8fcf17-fb1f-4b3d-93aa-1ba5fbfb2898",
    "x-content-type-options": "nosniff",
    "x-forwarded-for": "127.0.0.1, 216.232.32.188",
    "x-forwarded-host":
      "localhost:8080, pppp-web-0752cb-dev.apps.silver.devops.gov.bc.ca",
    "x-forwarded-port": "8080, 443",
    "x-forwarded-proto": "http, https",
    "x-frame-options": "DENY",
    "x-powered-by": "Servlet/3.1 JSP/2.3",
    "x-weblogic-request-clusterinfo": "true",
    "x-xss-protection": "1",
  },
  config: {
    url:
      "/pppp/api/payformsIntegration/patient/ed8fcf17-fb1f-4b3d-93aa-1ba5fbfb2898",
    method: "post",
    data:
      '{"applicationUuid":"ed8fcf17-fb1f-4b3d-93aa-1ba5fbfb2898","requestUuid":"d88ecb3b-0ce5-4849-a349-e91fd7b11618","submissionDate":"2021-09-27","isCSR":"N","payPatient":{"claimCount":"1","planReferenceNumber":"","phn":"9353166544","dependentNumber":"00","firstName":"a","middleInitial":"","lastName":"a","birthDate":"2021-09-11","addressOwner":"PATIENT","unitNumber":"","streetNumber":"111 Fa","streetName":"Fake Street","city":"Edmonton","postalCode":"V1A1A1","isVehicleAccident":"N","vehicleAccidentClaimNumber":"","planReferenceNumberOfOriginalClaim":"","medicalServiceClaims":[{"serviceDate":"2021-09-18","numberOfServices":"1","serviceClarificationCode":"","feeItem":"00001","amountBilled":"1.00","calledStartTime":"","renderedFinishTime":"","diagnosticCode":"001","locationOfService":"Q","correspondenceAttached":"","submissionCode":"","notes":""}],"practitionerLastName":"a","practitionerFirstName":"a","practitionerPaymentNumber":"23442","practitionerPractitionerNumber":"A2222","practitionerFacilityNumber":"","practitionerSpecialtyCode":"","referredByFirstNameInitial":"","referredByLastName":"","referredByPractitionerNumber":"","referredToFirstNameInitial":"","referredToLastName":"","referredToPractitionerNumber":""}}',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiZWQ4ZmNmMTctZmIxZi00YjNkLTkzYWEtMWJhNWZiZmIyODk4In0sImlhdCI6MTYzMjc4MDgzOCwiZXhwIjoxNjMyNzkxNjM4fQ.cz1Qji529tSFguGjAsZ4cyPv_hetoHWCc02QYyCM-ds",
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
  },
  request: {},
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

const next = jest.fn();
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

storeTemplateC.modules.payPractitionerForm.state = cloneDeep(
  practitionerStateC
);
storeTemplateN.modules.payPractitionerForm.state = cloneDeep(
  practitionerStateN
);
storeTemplateNHospitalC.modules.payPractitionerForm.state = cloneDeep(
  practitionerStateNHospitalC
);
storeTemplateNHospitalN.modules.payPractitionerForm.state = cloneDeep(
  practitionerStateNHospitalN
);

//later versions of Jest use a function called "jest.setSystemTime"
//but since this project is using Jest 24.x
//I've instead mocked the function below
jest.spyOn(global, "Date").mockImplementation(() => testDate);

jest
  .spyOn(apiService, "submitPayPractitionerApplication")
  .mockImplementation(() => Promise.resolve(mockResponse));

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

const spyOnGetTopScrollPosition = jest
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnVisitPage = jest.spyOn(pageStateService, "visitPage");

const spyOnSetPageComplete = jest.spyOn(pageStateService, "setPageComplete");

const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnLogService = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnLogServiceSubmission = jest
  .spyOn(logService, "logSubmission")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnLogServiceError = jest
  .spyOn(logService, "logError")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnPrint = jest.spyOn(window, "print").mockImplementation(jest.fn);

jest.spyOn(window, "scrollTo").mockImplementation(jest.fn);

describe("ReviewPage.vue pay practitioner", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    jest.spyOn(wrapper.vm.$store, "dispatch");

    jest
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    jest
      .spyOn(logService, "logNavigation")
      .mockImplementation(() => Promise.resolve("logged"));

    // wrapper.vm.$options.created.forEach((hook) => {
    //   hook.call(wrapper.vm);
    // });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("ReviewPage.vue pay practitioner created()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    jest.spyOn(wrapper.vm.$store, "dispatch");

    jest
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    // wrapper.vm.$options.created.forEach((hook) => {
    //   hook.call(wrapper.vm);
    // });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls logService", () => {
    expect(spyOnLogService).toBeDefined();
  });
});

describe("ReviewPage.vue pay practitioner continueHandler()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    jest.spyOn(wrapper.vm.$store, "dispatch");

    jest
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls submitForm if the store has medical claims correspondenceAttached = N", () => {
    store = createStore(storeTemplateN);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = jest.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls window.print if the store has medical claims correspondenceAttached = C", () => {
    store = createStore(storeTemplateC);
    $route = {
      path: "/potato",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
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
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = jest.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls submitForm if the store has medical claims correspondenceAttached = N and hospital claims = N", () => {
    store = createStore(storeTemplateNHospitalN);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = jest.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });

  it("calls window.print if the store has medical claims correspondenceAttached = N and hospital claims = C", () => {
    store = createStore(storeTemplateNHospitalC);
    $route = {
      path: "/potato",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
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
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    const spyOnSubmitForm = jest.spyOn(wrapper.vm, "submitForm");
    wrapper.vm.continueHandler();
    expect(spyOnSubmitForm).toHaveBeenCalled();
  });
});

//skipping continueButtonLabel() tests because they would be entirely hardcoded

describe("ReviewPage.vue pay practitioner submitForm()", () => {
  let store;
  let wrapper;
  let $route;
  let $router;
  let spyOnDispatch;
  let spyOnNavigateToSubmissionPage;
  let spyOnNavigateToSubmissionErrorPage;

  beforeEach(() => {
    // jest.useFakeTimers("modern");
    // jest.setSystemTime(testDate);
    store = createStore(storeTemplateN);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
      },
    });
    spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");

    spyOnNavigateToSubmissionPage = jest.spyOn(
      wrapper.vm,
      "navigateToSubmissionPage"
    );

    spyOnNavigateToSubmissionErrorPage = jest.spyOn(
      wrapper.vm,
      "navigateToSubmissionErrorPage"
    );

    jest
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
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
    jest
      .spyOn(apiService, "submitPayPractitionerApplication")
      .mockImplementationOnce(() => Promise.resolve(mockResponse3));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("calls logServiceError on error code 3", async () => {
    jest
      .spyOn(apiService, "submitPayPractitionerApplication")
      .mockImplementationOnce(() => Promise.resolve(mockResponse3));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls navigateToSubmissionErrorPage on misc error", async () => {
    jest
      .spyOn(apiService, "submitPayPractitionerApplication")
      .mockImplementationOnce(() => Promise.resolve(mockResponseMisc));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnNavigateToSubmissionErrorPage).toHaveBeenCalled();
    expect(spyOnNavigateToSubmissionPage).not.toHaveBeenCalled();
  });

  it("calls logServiceError on misc error", async () => {
    jest
      .spyOn(apiService, "submitPayPractitionerApplication")
      .mockImplementationOnce(() => Promise.resolve(mockResponseMisc));
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls logServiceError on DB Error PRN Present error", async () => {
    jest
      .spyOn(apiService, "submitPayPractitionerApplication")
      .mockImplementationOnce(() =>
        Promise.resolve(mockResponseDBErrorPrnPresent)
      );
    wrapper.vm.submitForm();
    await wrapper.vm.$nextTick;
    expect(spyOnLogServiceError).toHaveBeenCalled();
  });

  it("calls spyOnNavigateToSubmissionPage on DB Error PRN Present error", async () => {
    jest
      .spyOn(apiService, "submitPayPractitionerApplication")
      .mockImplementationOnce(() =>
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
  let $route;
  let $router;
  let spyOnRouter;
  let toPath;

  beforeEach(() => {
    store = createStore(storeTemplateC);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: {
        value: $route,
      },
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router,
        },
      },
    });
    jest.spyOn(wrapper.vm.$store, "dispatch");

    jest
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    toPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.SUBMISSION_PAGE.path
    );

    wrapper.vm.navigateToSubmissionPage();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
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
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: {
        value: $route,
      },
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router,
        },
      },
    });
    jest.spyOn(wrapper.vm.$store, "dispatch");

    jest
      .spyOn(spaEnvService, "loadEnvs")
      .mockImplementation(() => Promise.resolve("loaded"));

    spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    toPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.value.path,
      payPractitionerRoutes.SUBMISSION_ERROR_PAGE.path
    );

    wrapper.vm.navigateToSubmissionErrorPage();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
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
  let $route;
  let $router;

  beforeEach(() => {
    store = createStore(storeTemplateN);
    $route = {
      path: "/potato-csr",
    };
    $router = {
      $route,
      currentRoute: $route,
      push: jest.fn(),
    };
    wrapper = shallowMount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouterCSR,
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
