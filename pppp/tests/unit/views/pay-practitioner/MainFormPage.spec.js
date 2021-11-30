import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-practitioner/MainFormPage.vue";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-practitioner-form-dummy-data";
import apiService from "@/services/api-service";
import { getConvertedPath } from "@/helpers/url";
import {
  payPractitionerRoutes,
  payPractitionerRouteStepOrder,
} from "@/router/routes";

const testDate = new Date();

const testDateFutureYear = new Date();
testDateFutureYear.setFullYear(testDateFutureYear.getFullYear() + 1);

const testDateFutureMonth = new Date();
testDateFutureMonth.setMonth(testDateFutureMonth.getMonth() + 1);

const testDatePast89Days = new Date();
testDatePast89Days.setDate(testDatePast89Days.getDate() - 89);

const testDatePast91Days = new Date();
testDatePast91Days.setDate(testDatePast91Days.getDate() - 91);

const next = jest.fn();

const mockBackendValidationResponse = {
  data: {
    applicationUuid: "9f6b649b-c483-4327-b5a9-f5aa8d3bec13",
    requestUuid: "1dc94b87-86f9-4d92-a749-fb8b2fc1edaf",
    returnCode: "0",
    returnMessage: "Valid",
    practitionerFirstName: "Y",
    practitionerLastName: "Y",
    practitionerNumber: "Y",
    serviceFeeItem1: "Y",
    serviceFeeItem2: "",
    serviceFeeItem3: "",
    serviceFeeItem4: "",
    serviceLocationCode1: "",
    serviceLocationCode2: "",
    serviceLocationCode3: "",
    serviceLocationCode4: "",
    hospitalFeeItem1: "",
    hospitalFeeItem2: "",
    hospitalLocationCode1: "",
    hospitalLocationCode2: "",
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
    breadcrumbid: "ID-vs-dapp041-maximusbchealth-local-1636494389451-0-269",
    "cache-control": "no-store",
    connection: "close",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json",
    date: "Tue, 16 Nov 2021 00:43:38 GMT",
    forwarded:
      "for=216.232.32.188;host=pppp-web-0752cb-dev.apps.silver.devops.gov.bc.ca;proto=https",
    origin: "http://localhost:8080",
    pragma: "no-cache",
    referer: "http://localhost:8080/pppp/pay-patient/main-form",
    "response-type": "application/json",
    "sec-ch-ua":
      '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "transfer-encoding": "chunked",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    uuid: "9f6b649b-c483-4327-b5a9-f5aa8d3bec13",
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
      "/pppp/api/payformsIntegration/validateClaim/9f6b649b-c483-4327-b5a9-f5aa8d3bec13",
    method: "post",
    data:
      '{"applicationUuid":"9f6b649b-c483-4327-b5a9-f5aa8d3bec13","practitionerFirstName":"MICHAEL","practitionerLastName":"GOTTNER","practitionerNumber":"00001","serviceFeeItem1":"00010","serviceFeeItem2":"","serviceFeeItem3":"","serviceFeeItem4":"","serviceLocationCode1":"","serviceLocationCode2":"","serviceLocationCode3":"","serviceLocationCode4":"","hospitalFeeItem1":"","hospitalFeeItem2":"","hospitalLocationCode1":"","hospitalLocationCode2":"","requestUuid":"1dc94b87-86f9-4d92-a749-fb8b2fc1edaf"}',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiOWY2YjY0OWItYzQ4My00MzI3LWI1YTktZjVhYThkM2JlYzEzIn0sImlhdCI6MTYzNzAyMzMzOCwiZXhwIjoxNjM3MDM0MTM4fQ.ARc5LYhvmOAj-pCMnwbxNfpKnAk_g3ZTWHkoYWHp7EA",
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
  },
  request: {},
};

const mockBackendValidationResponseFail = {
  data: {
    applicationUuid: "c440ae62-d591-40f8-b1fb-0f31bcb2def2",
    requestUuid: "cb0984f6-6811-45bb-974e-e02689097557",
    returnCode: "1",
    returnMessage: "Not valid",
    practitionerFirstName: "N",
    practitionerLastName: "N",
    practitionerNumber: "N",
    serviceFeeItem1: "Y",
    serviceFeeItem2: "",
    serviceFeeItem3: "",
    serviceFeeItem4: "",
    serviceLocationCode1: "",
    serviceLocationCode2: "",
    serviceLocationCode3: "",
    serviceLocationCode4: "",
    hospitalFeeItem1: "",
    hospitalFeeItem2: "",
    hospitalLocationCode1: "",
    hospitalLocationCode2: "",
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
    breadcrumbid: "ID-vs-dapp041-maximusbchealth-local-1636494389451-0-294",
    "cache-control": "no-store",
    connection: "close",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json",
    date: "Wed, 17 Nov 2021 00:20:11 GMT",
    forwarded:
      "for=216.232.32.188;host=pppp-web-0752cb-dev.apps.silver.devops.gov.bc.ca;proto=https",
    origin: "http://localhost:8080",
    pragma: "no-cache",
    referer: "http://localhost:8080/pppp/pay-patient/main-form",
    "response-type": "application/json",
    "sec-ch-ua":
      '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "transfer-encoding": "chunked",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    uuid: "c440ae62-d591-40f8-b1fb-0f31bcb2def2",
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
      "/pppp/api/payformsIntegration/validateClaim/c440ae62-d591-40f8-b1fb-0f31bcb2def2",
    method: "post",
    data:
      '{"applicationUuid":"c440ae62-d591-40f8-b1fb-0f31bcb2def2","practitionerFirstName":"a","practitionerLastName":"a","practitionerNumber":"00001","serviceFeeItem1":"00010","serviceFeeItem2":"","serviceFeeItem3":"","serviceFeeItem4":"","serviceLocationCode1":"","serviceLocationCode2":"","serviceLocationCode3":"","serviceLocationCode4":"","hospitalFeeItem1":"","hospitalFeeItem2":"","hospitalLocationCode1":"","hospitalLocationCode2":"","requestUuid":"cb0984f6-6811-45bb-974e-e02689097557"}',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiYzQ0MGFlNjItZDU5MS00MGY4LWIxZmItMGYzMWJjYjJkZWYyIn0sImlhdCI6MTYzNzEwODM2MSwiZXhwIjoxNjM3MTE5MTYxfQ.s8zdHDcg8mRfscBfypobqgKaU2SYyGQfcSIdBPFGeWM",
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
  },
  request: {},
};

const mockBackendValidationResponseDefault = {
  data: {},
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
    breadcrumbid: "ID-vs-dapp041-maximusbchealth-local-1636494389451-0-294",
    "cache-control": "no-store",
    connection: "close",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json",
    date: "Wed, 17 Nov 2021 00:20:11 GMT",
    forwarded:
      "for=216.232.32.188;host=pppp-web-0752cb-dev.apps.silver.devops.gov.bc.ca;proto=https",
    origin: "http://localhost:8080",
    pragma: "no-cache",
    referer: "http://localhost:8080/pppp/pay-patient/main-form",
    "response-type": "application/json",
    "sec-ch-ua":
      '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "transfer-encoding": "chunked",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    uuid: "c440ae62-d591-40f8-b1fb-0f31bcb2def2",
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
      "/pppp/api/payformsIntegration/validateClaim/c440ae62-d591-40f8-b1fb-0f31bcb2def2",
    method: "post",
    data:
      '{"applicationUuid":"c440ae62-d591-40f8-b1fb-0f31bcb2def2","practitionerFirstName":"a","practitionerLastName":"a","practitionerNumber":"00001","serviceFeeItem1":"00010","serviceFeeItem2":"","serviceFeeItem3":"","serviceFeeItem4":"","serviceLocationCode1":"","serviceLocationCode2":"","serviceLocationCode3":"","serviceLocationCode4":"","hospitalFeeItem1":"","hospitalFeeItem2":"","hospitalLocationCode1":"","hospitalLocationCode2":"","requestUuid":"cb0984f6-6811-45bb-974e-e02689097557"}',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiYzQ0MGFlNjItZDU5MS00MGY4LWIxZmItMGYzMWJjYjJkZWYyIn0sImlhdCI6MTYzNzEwODM2MSwiZXhwIjoxNjM3MTE5MTYxfQ.s8zdHDcg8mRfscBfypobqgKaU2SYyGQfcSIdBPFGeWM",
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
  },
  request: {},
};

const passingData = {
  medicalServiceClaimsCount: "1",
  hospitalVisitClaimsCount: "1",

  planReferenceNumber: "1234567890",

  phn: "9999 999 998",
  dependentNumber: "66",
  firstName: "Bob",
  middleInitial: "H",
  lastName: "Smith",
  birthDate: new Date(),

  isVehicleAccident: "Y",
  vehicleAccidentClaimNumber: "A0000001",

  planReferenceNumberOfOriginalClaim: "321",

  medicalServiceClaims: [
    {
      serviceDate: new Date(),
      numberOfServices: "1",
      serviceClarificationCode: "A1",
      feeItem: "00010",
      amountBilled: "0.00",
      calledStartTime: {
        hour: "08",
        minute: "08",
      },
      renderedFinishTime: {
        hour: "16",
        minute: "06",
      },
      diagnosticCode: "001",
      locationOfService: "B",
      correspondenceAttached: null,
      submissionCode: "I",
      notes: "Notes here.",
    },
  ],

  hospitalVisitClaims: [
    {
      month: testDate.getMonth().toString(),
      dayFrom: testDate.getDate().toString(),
      dayTo: testDate.getDate().toString(),
      year: testDate.getFullYear().toString(),
      numberOfServices: "1",
      serviceClarificationCode: "A1",
      feeItem: "00010",
      amountBilled: "0.00",
      diagnosticCode: "001",
      locationOfService: "B",
      correspondenceAttached: null,
      submissionCode: "I",
      notes: "Notes here.",
    },
  ],

  practitionerLastName: "GOTTNER",
  practitionerFirstName: "MICHAEL",
  practitionerPaymentNumber: "A1234",
  practitionerPractitionerNumber: "00001",
  practitionerFacilityNumber: "12345",
  practitionerSpecialtyCode: "99",
  coveragePreAuthNumber: "2222",

  referredByFirstNameInitial: "R",
  referredByLastName: "McDonald",
  referredByPractitionerNumber: "22271",

  referredToFirstNameInitial: "C",
  referredToLastName: "Lee",
  referredToPractitionerNumber: "22272",
};

const failingData = {
  medicalServiceClaimsCount: "",
  hospitalVisitClaimsCount: "",

  planReferenceNumber: "",

  phn: "",
  dependentNumber: "",
  firstName: "",
  middleInitial: "",
  lastName: "",
  birthDate: new Date(),

  isVehicleAccident: "",
  vehicleAccidentClaimNumber: "",

  planReferenceNumberOfOriginalClaim: "",

  medicalServiceClaims: [
    {
      serviceDate: new Date(),
      numberOfServices: "",
      serviceClarificationCode: "",
      feeItem: "",
      amountBilled: "",
      calledStartTime: {
        hour: "",
        minute: "",
      },
      renderedFinishTime: {
        hour: "",
        minute: "",
      },
      diagnosticCode: "",
      locationOfService: "",
      correspondenceAttached: null,
      submissionCode: "",
      notes: "",
    },
  ],

  hospitalVisitClaims: [
    {
      month: "",
      dayFrom: "",
      dayTo: "",
      year: "",
      numberOfServices: "",
      serviceClarificationCode: "",
      feeItem: "",
      amountBilled: "",
      diagnosticCode: "",
      locationOfService: "",
      correspondenceAttached: null,
      submissionCode: "",
      notes: "",
    },
  ],

  practitionerLastName: "",
  practitionerFirstName: "",
  practitionerPaymentNumber: "",
  practitionerPractitionerNumber: "",
  practitionerFacilityNumber: "",
  practitionerSpecialtyCode: "",
  coveragePreAuthNumber: "",

  referredByFirstNameInitial: "",
  referredByLastName: "",
  referredByPractitionerNumber: "",

  referredToFirstNameInitial: "",
  referredToLastName: "",
  referredToPractitionerNumber: "",
};

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve(mockBackendValidationResponse);
  }),
}));

const spyOnAPIService = jest
  .spyOn(apiService, "validateApplication")
  .mockImplementation(() => Promise.resolve(mockBackendValidationResponse));

const scrollHelper = require("@/helpers/scroll");

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
  getTopScrollPosition: jest.fn(),
}));

jest.spyOn(window, "scrollTo").mockImplementation(jest.fn);

const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");
const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

const spyOnGetTopScrollPosition = jest
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));

const spyOnSetPageComplete = jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));
const spyOnVisitPage = jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const practitionerState = cloneDeep(dummyDataValid.default);
storeTemplate.modules.payPractitionerForm.state = cloneDeep(practitionerState);

const mockRouter = {
  $route: {
    path: "/",
  },
  $router: {
    push: jest.fn(),
    currentRoute: {
      path: "/pay-practitioner/main-form",
    },
  },
};

const mockRouterCSR = {
  $route: {
    path: "/",
  },
  $router: {
    push: jest.fn(),
    currentRoute: {
      path: "/pay-practitioner-csr/main-form",
    },
  },
};

describe("MainFormPage.vue pay practitioner", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("MainFormPage.vue pay practitioner created()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  jest.useFakeTimers();

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("assigns data the values in the store", () => {
    //I'm not gonna do all of them, but if these five are here, we're probably good
    expect(wrapper.vm.planReferenceNumber).toEqual(
      storeTemplate.modules.payPractitionerForm.state.planReferenceNumber
    );
    expect(wrapper.vm.phn).toEqual(
      storeTemplate.modules.payPractitionerForm.state.phn
    );
    expect(wrapper.vm.vehicleAccidentClaimNumber).toEqual(
      storeTemplate.modules.payPractitionerForm.state.vehicleAccidentClaimNumber
    );
    expect(wrapper.vm.practitionerPractitionerNumber).toEqual(
      storeTemplate.modules.payPractitionerForm.state
        .practitionerPractitionerNumber
    );
    expect(wrapper.vm.referredToLastName).toEqual(
      storeTemplate.modules.payPractitionerForm.state.referredToLastName
    );
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError).toHaveLength(
      4
    );
  });

  it("calls logNavigation", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });

  it("sets page loaded to true", async () => {
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(wrapper.vm.isPageLoaded).toEqual(true);
  });
});

describe("MainFormPage.vue handleBlurField()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  const fakeTrueValidation = {
    $touch: jest.fn,
  };
  const spyOnTrueTouch = jest.spyOn(fakeTrueValidation, "$touch");

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls $touch when passed a validation", () => {
    wrapper.vm.handleBlurField(fakeTrueValidation);
    expect(spyOnTrueTouch).toHaveBeenCalled();
  });

  it("doesn't break when not passed a validation", () => {
    wrapper.vm.handleBlurField();
    expect(wrapper.element).toBeDefined();
  });
});

describe("MainFormPage.vue handleInputPractitioner()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets isPractitionerErrorShown to false", () => {
    wrapper.vm.isPractitionerErrorShown = true;
    expect(wrapper.vm.isPractitionerErrorShown).toEqual(true);
    wrapper.vm.handleInputPractitioner();
    expect(wrapper.vm.isPractitionerErrorShown).toEqual(false);
  });
});

describe("MainFormPage.vue handleInputServiceFeeItem()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets fee item validation to false", () => {
    wrapper.vm.medicalServiceClaimsFeeItemValidationError[0] = true;
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError[0]).toEqual(
      true
    );
    wrapper.vm.handleInputServiceFeeItem(0);
    expect(wrapper.vm.medicalServiceClaimsFeeItemValidationError[0]).toEqual(
      false
    );
  });
});

describe("MainFormPage.vue handleProcessBirthDate()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets data to equal value passed", () => {
    wrapper.vm.birthDateData = "notPotato";
    expect(wrapper.vm.birthDateData).toEqual("notPotato");
    wrapper.vm.handleProcessBirthDate("potato");
    expect(wrapper.vm.birthDateData).toEqual("potato");
  });
});

describe("MainFormPage.vue handleProcessServiceDate()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets serviceDateData to value passed", () => {
    const claimIndex = 0;

    wrapper.vm.medicalServiceClaims[claimIndex].serviceDateData = "notPotato";
    wrapper.vm.handleProcessServiceDate("potato", claimIndex);
    expect(wrapper.vm.medicalServiceClaims[claimIndex].serviceDateData).toEqual(
      "potato"
    );
  });
});

describe("MainFormPage.vue handleInputHospitalVisitFeeItem()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets fee item validation to false", () => {
    wrapper.vm.hospitalVisitClaimsFeeItemValidationError[0] = true;
    expect(wrapper.vm.hospitalVisitClaimsFeeItemValidationError[0]).toEqual(
      true
    );
    wrapper.vm.handleInputHospitalVisitFeeItem(0);
    expect(wrapper.vm.hospitalVisitClaimsFeeItemValidationError[0]).toEqual(
      false
    );
  });
});

describe.only("MainFormPage.vue validateFields(), public", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  let spyOnNavigateToNextPage;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });

    spyOnNavigateToNextPage = jest.spyOn(wrapper.vm, "navigateToNextPage");
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("navigates successfully when data is good", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("does not navigate successfully when data is bad", async () => {
    Object.assign(wrapper.vm, failingData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("does not navigate successfully when it gets an invalid backend validation response", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() =>
      Promise.resolve(mockBackendValidationResponseFail)
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;

    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("does not navigate successfully when it gets an unsuccessful backend validation", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() =>
      Promise.resolve(mockBackendValidationResponseDefault)
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;

    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("does not navigate successfully when it catches an error", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() => Promise.resolve("potato"));
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;

    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(PHN) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ phn: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(PHN) flags invalid if invalid entry", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ phn: "9999 999 999" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if non number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if negative number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if not 00 or 66 with a PHN", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "55" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `1` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character (2)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `^` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags valid if contains alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `a` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(lastName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(lastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(lastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given date is too far in the past", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: new Date(1595, 11, 17) });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given date is in future", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: testDateFutureYear });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given invalid date", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({
      birthDateData: {
        month: 0,
        day: "32",
        year: "2020",
      },
    });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(isVehicleAccident) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ isVehicleAccident: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags invalid if not correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "^^^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags invalid if not correct format (2)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "88888888" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags valid if correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "AA111111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not positive", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //medicalServiceClaims

  it("(serviceDate) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(serviceDate) flags invalid if given date is too far in the past", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(1595, 11, 17);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(serviceDate) flags invalid if given date is in future", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    //feeItem is set in passing data to not be 03333, which changes this test.
    //see related tests at the end of this section
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDateFutureYear;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(serviceDate) flags invalid if given invalid date", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDateData = {
      month: 0,
      day: "32",
      year: "2020",
    };

    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(serviceDate) flags invalid if given date is after Oct 1 2021 and location is A", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 10, 3);
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if given date is before Oct 1 2021 and location is A", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 8, 28);
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if date is within 90 days of the future and fee item is 03333", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDateFutureMonth;
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags invalid if date is within 90 days of the future and fee item is not 03333", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDateFutureMonth;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices) flags invalid if negative integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices) flags invalid if zero", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = "0";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(feeItem) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(feeItem) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(feeItem) flags invalid if negative integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled) flags invalid if negative integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "-2.00";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled) flags invalid if it doesn't end in .00", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled) flags valid if it does end in .00", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "2.00";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(amountBilled) flags invalid if value is correct but fee item is 03333", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "2.00";
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(calledStartTime) flags invalid if hour not present but minute is", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].calledStartTime.hour = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(calledStartTime) flags invalid if hour present but minute is not", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].calledStartTime.minute = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(renderedFinishTime) flags invalid if hour not present but minute is", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].renderedFinishTime.hour = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(renderedFinishTime) flags invalid if hour present but minute is not", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].renderedFinishTime.minute = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].diagnosticCode = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode) flags invalid if not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].diagnosticCode = "a^^^";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode) flags invalid if not on diagnostic list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].diagnosticCode = "A111";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(locationOfService) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].locationOfService = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(locationOfService) flags invalid if A and after Oct 1st 2021", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 10, 3);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(locationOfService) flags valid if A and before Oct 1st 2021", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 8, 28);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceClarificationCode) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceClarificationCode = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceClarificationCode) flags invalid if value is not in list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceClarificationCode = "AA";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(submissionCode) flags invalid if not present and more than 90 days ago", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].submissionCode = null;
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast91Days;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(submissionCode) flags valid if not present and less than 90 days ago", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].submissionCode = null;
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast89Days;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(notes) flags invalid if more than 400 characters", async () => {
    const testMessage =
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].notes = testMessage;
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast89Days;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //end of medical services tests

  // **hospitalVisitClaims tests go here** (Public)
  it("(month, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].month = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(month, hospitalVisitClaims) flags invalid if not an integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].month = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(month, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].month = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dayFrom, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].dayFrom = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dayFrom, hospitalVisitClaims) flags invalid if not an integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].dayFrom = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dayFrom, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].dayFrom = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dayTo, hospitalVisitClaims) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].dayTo = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(dayTo, hospitalVisitClaims) flags invalid if not an integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].dayTo = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dayTo, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].dayTo = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(year, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].year = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(year, hospitalVisitClaims) flags invalid if not an integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].year = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(year, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].year = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].numberOfServices = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if not an integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].numberOfServices = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].numberOfServices = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices, hospitalVisitClaims) flags invalid if zero", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].numberOfServices = "0";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(feeItem, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].feeItem = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(feeItem, hospitalVisitClaims) flags invalid if not an integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].feeItem = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(feeItem, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].feeItem = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].amountBilled = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not an integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].amountBilled = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not a positive integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].amountBilled = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if not a positive integer ending in .00", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].amountBilled = "2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled, hospitalVisitClaims) flags valid if it does end in .00", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].amountBilled = "2.00";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(amountBilled, hospitalVisitClaims) flags invalid if value is correct but fee item is 03333", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].amountBilled = "2.00";
    wrapper.vm.hospitalVisitClaims[0].feeItem = "03333";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].diagnosticCode = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode, hospitalVisitClaims) flags invalid if not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].diagnosticCode = "a^^^";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode, hospitalVisitClaims) flags invalid if not on diagnostic list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].diagnosticCode = "A111";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(locationOfService, hospitalVisitClaims) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].locationOfService = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(locationOfService, hospitalVisitClaims) flags invalid if A and after Oct 1st 2021", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].locationOfService = "A";
    wrapper.vm.hospitalVisitClaims[0].dayFrom = "3";
    wrapper.vm.hospitalVisitClaims[0].month = "11";
    wrapper.vm.hospitalVisitClaims[0].year = "2021";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(locationOfService, hospitalVisitClaims) flags valid if A and before Oct 1st 2021", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].locationOfService = "A";
    wrapper.vm.hospitalVisitClaims[0].dayFrom = "3";
    wrapper.vm.hospitalVisitClaims[0].month = "8";
    wrapper.vm.hospitalVisitClaims[0].year = "2021";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceClarificationCode, hospitalVisitClaims) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].serviceClarificationCode = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceClarificationCode, hospitalVisitClaims) flags invalid if value is not in list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].serviceClarificationCode = "AA";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(submissionCode, hospitalVisitClaims) flags invalid if not present and more than 90 days ago", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].submissionCode = null;
    wrapper.vm.hospitalVisitClaims[0].dayFrom = testDatePast91Days
      .getDate()
      .toString();
    const correctedMonth = testDatePast89Days.getMonth() + 1;
    wrapper.vm.hospitalVisitClaims[0].month = correctedMonth.toString();
    wrapper.vm.hospitalVisitClaims[0].year = testDatePast91Days
      .getFullYear()
      .toString();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(submissionCode, hospitalVisitClaims) flags valid if not present and less than 90 days ago", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].submissionCode = null;
    wrapper.vm.hospitalVisitClaims[0].dayFrom = testDatePast89Days
      .getDate()
      .toString();
    const correctedMonth = testDatePast89Days.getMonth() + 1;
    wrapper.vm.hospitalVisitClaims[0].month = correctedMonth.toString();
    wrapper.vm.hospitalVisitClaims[0].year = testDatePast89Days
      .getFullYear()
      .toString();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(notes, hospitalVisitClaims) flags invalid if more than 400 characters", async () => {
    const testMessage =
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].notes = testMessage;
    wrapper.vm.hospitalVisitClaims[0].serviceDate = testDatePast89Days;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //end hospital visit tests

  it("(practitionerLastName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPaymentNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPaymentNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPractitionerNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPractitionerNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFacilityNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFacilityNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if alphanumeric but not on list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "a^^^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not the minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "0" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not on the list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "98" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //coveragePreAuthNumber tests (new)
  it("(coveragePreAuthNumber) flags invalid if not numeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not positive number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags valid if minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "2222" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredByFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: "1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredByPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByPractitionerNumber: `1111` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: "1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredToPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToPractitionerNumber: `1111` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //miscellaneous conditions

  it("flags invalid if dependentNumber not 66 and birthdate not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: `00` });
    await wrapper.setData({ birthDate: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: `Q` });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: "Surname" });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: "11111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags valid if all three are null (referred By)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags invalid if referredTo first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: `Q` });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: "Surname" });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: "11111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags valid if all three are null and no fee item (referredTo)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags valid if planReferenceNumber is null", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });
});

describe("MainFormPage.vue validateFields(), CSR", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  let spyOnNavigateToNextPage;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouterCSR,
    });

    spyOnNavigateToNextPage = jest.spyOn(wrapper.vm, "navigateToNextPage");
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("navigates successfully when data is good", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("does not navigate successfully when data is bad", async () => {
    Object.assign(wrapper.vm, failingData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("does navigate successfully when it gets an invalid backend validation response", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() =>
      Promise.resolve(mockBackendValidationResponseFail)
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;

    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("does navigate successfully when it gets an unsuccessful backend validation", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() =>
      Promise.resolve(mockBackendValidationResponseDefault)
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;

    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("does navigate successfully when it catches an error", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    spyOnAPIService.mockImplementationOnce(() => Promise.resolve("potato"));
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;

    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(PHN) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ phn: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(PHN) flags invalid if invalid entry", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ phn: "9999 999 999" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if non number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if negative number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags valid if not 00 or 66 with a PHN", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: "55" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(firstName) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(firstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ firstName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `1` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character (2)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `^` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags valid if contains alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ middleInitial: `a` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(lastName) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(lastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(lastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags valid if given date is too far in the past", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: new Date(1595, 11, 17) });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags valid if given date is in future", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ birthDate: testDateFutureYear });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given invalid date", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({
      birthDateData: {
        month: 0,
        day: "32",
        year: "2020",
      },
    });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(isVehicleAccident) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ isVehicleAccident: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags invalid if not correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "^^^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags valid if eight numerals", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "88888888" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags valid if correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ vehicleAccidentClaimNumber: "AA111111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not positive", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //medicalServiceClaims

  it("(serviceDate) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if given date is far in the past", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(1595, 11, 17);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if given date is in future", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    //feeItem is set in passing data to not be 03333, which changes this test.
    //see related tests at the end of this section
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDateFutureYear;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags invalid if given invalid date", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDateData = {
      month: 0,
      day: "32",
      year: "2020",
    };

    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if given date is after Oct 1 2021 and location is A", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 10, 3);
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if given date is before Oct 1 2021 and location is A", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 8, 28);
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if date is within 90 days of the future and fee item is 03333", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDateFutureMonth;
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceDate) flags valid if date is within 90 days of the future and fee item is not 03333", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDateFutureMonth;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(numberOfServices) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(numberOfServices) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices) flags invalid if negative integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(numberOfServices) flags valid if zero", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].numberOfServices = "0";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(feeItem) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(feeItem) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = "a";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(feeItem) flags invalid if negative integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = "-2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(amountBilled) flags invalid if negative integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "-2.00";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled) flags invalid if it doesn't end in .00", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "2";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(amountBilled) flags valid if it does end in .00", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "2.00";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(amountBilled) flags invalid if value is correct but fee item is 03333", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].amountBilled = "2.00";
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(calledStartTime) flags invalid if hour not present but minute is", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].calledStartTime.hour = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(calledStartTime) flags invalid if hour present but minute is not", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].calledStartTime.minute = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(renderedFinishTime) flags invalid if hour not present but minute is", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].renderedFinishTime.hour = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(renderedFinishTime) flags invalid if hour present but minute is not", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].renderedFinishTime.minute = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].diagnosticCode = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(diagnosticCode) flags invalid if not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].diagnosticCode = "a^^^";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(diagnosticCode) flags valid if not on diagnostic list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].diagnosticCode = "A111";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(locationOfService) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].locationOfService = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(locationOfService) flags valid if A and after Oct 1st 2021", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 10, 3);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(locationOfService) flags valid if A and before Oct 1st 2021", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].locationOfService = "A";
    wrapper.vm.medicalServiceClaims[0].serviceDate = new Date(2021, 8, 28);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceClarificationCode) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceClarificationCode = null;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceClarificationCode) flags valid if value is not in list but is alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceClarificationCode = "AA";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(serviceClarificationCode) flags invalid if value is not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceClarificationCode = "^^";
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(submissionCode) flags valid if not present and more than 90 days ago", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].submissionCode = null;
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast91Days;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(submissionCode) flags valid if not present and less than 90 days ago", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].submissionCode = null;
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast89Days;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(notes) flags invalid if more than 400 characters", async () => {
    const testMessage =
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].notes = testMessage;
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast89Days;
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //end of medical services tests
  //**hospitalVisitClaims tests go here** (CSR)

  it("(practitionerLastName) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPaymentNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPaymentNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPractitionerNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerPractitionerNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFacilityNumber: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags valid if alphanumeric but not on list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFacilityNumber: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags valid if alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "A1A1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "a^^^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags valid if not the minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "0" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags valid if not on the list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerSpecialtyCode: "98" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not numeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "a" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not positive number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "-2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "2" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(coveragePreAuthNumber) flags valid if minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ coveragePreAuthNumber: "2222" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredByFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: "1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredByPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByPractitionerNumber: `1111` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: "1" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToLastName: "aaa^" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToLastName: `a-.' -.' ` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredToPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToPractitionerNumber: `1111` });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //miscellaneous conditions

  it("flags valid if dependentNumber not 66 and birthdate not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ dependentNumber: `00` });
    await wrapper.setData({ birthDate: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags invalid if referredBy first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: `Q` });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: "Surname" });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: "11111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags valid if all three are null (referred By)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags invalid if referredTo first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: `Q` });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: "Surname" });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: "11111" });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags valid if all three are null (referred To)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags invalid if planReferenceNumber is null", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumber: null });
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });
});

describe("MainFormPage.vue validationModal handlers", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  let spyOnNavigateToNextPage;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    spyOnNavigateToNextPage = jest.spyOn(wrapper.vm, "navigateToNextPage");
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls navigateToNextPage() on Yes", () => {
    wrapper.vm.validationModalYesHandler();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("sets display to false on No", async () => {
    await wrapper.setData({ isValidationModalShown: true });
    expect(wrapper.vm.isValidationModalShown).toEqual(true);
    wrapper.vm.validationModalNoHandler();
    expect(wrapper.vm.isValidationModalShown).toEqual(false);
  });
});

describe("MainFormPage.vue navigateToNextPage()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls pageStateService.setPageComplete", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(spyOnSetPageComplete).toHaveBeenCalled();
  });

  it("calls pageStateService.visitPage", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(spyOnVisitPage).toHaveBeenCalled();
  });

  it("calls router.push", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.push).toHaveBeenCalled();
  });

  it("calls scrollTo", async () => {
    await wrapper.vm.navigateToNextPage();
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("MainFormPage.vue saveData()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;
  let spyOnDispatch;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });

    spyOnDispatch = jest.spyOn(store, "dispatch");
    Object.assign(wrapper.vm, cloneDeep(passingData));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("dispatches correctly", async () => {
    wrapper.vm.saveData();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it("saves example value to store", async () => {
    const testValue = "SaveDataTestValue";
    expect(
      wrapper.vm.$store.state.payPractitionerForm.referredByLastName
    ).not.toEqual(testValue);
    await wrapper.setData({ referredByLastName: testValue });
    wrapper.vm.saveData();
    expect(
      wrapper.vm.$store.state.payPractitionerForm.referredByLastName
    ).toEqual(testValue);
  });
});

describe("MainFormPage.vue getMedicalServiceClaimTitle()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns correct title when 1 claim", () => {
    //should return "Service" or something like it, without saying 1 out of 1
    //so I check to see if 1 is in the result, which it shouldn't be
    const arrayLength = wrapper.vm.medicalServiceClaims.length;
    const result = wrapper.vm.getMedicalServiceClaimTitle(0);
    expect(result).not.toContain(arrayLength);
  });

  it("returns correct title when more than 1 claim", async () => {
    //should return "Service 1 out of 3" or something like it
    //so I check to see if 3 is in the result, which it should be
    await wrapper.setData({
      medicalServiceClaims: [
        {
          serviceDate: new Date(),
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          calledStartTime: {
            hour: "08",
            minute: "01",
          },
          renderedFinishTime: {
            hour: "16",
            minute: "05",
          },
          diagnosticCode: "001",
          locationOfService: "B",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
        {
          serviceDate: new Date(),
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          calledStartTime: {
            hour: "08",
            minute: "01",
          },
          renderedFinishTime: {
            hour: "16",
            minute: "05",
          },
          diagnosticCode: "001",
          locationOfService: "B",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
        {
          serviceDate: new Date(),
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          calledStartTime: {
            hour: "08",
            minute: "01",
          },
          renderedFinishTime: {
            hour: "16",
            minute: "05",
          },
          diagnosticCode: "001",
          locationOfService: "B",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
      ],
    });
    const arrayLength = wrapper.vm.medicalServiceClaims.length;
    const result = wrapper.vm.getMedicalServiceClaimTitle(0);
    expect(result).toContain(arrayLength);
  });
});

describe("MainFormPage.vue getHospitalVisitClaimTitle()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns correct title when 1 claim", () => {
    //should return "Service" or something like it, without saying 1 out of 1
    //so I check to see if 1 is in the result, which it shouldn't be
    const arrayLength = wrapper.vm.hospitalVisitClaims.length;
    const result = wrapper.vm.getHospitalVisitClaimTitle(0);
    expect(result).not.toContain(arrayLength);
  });

  it("returns correct title when more than 1 claim", async () => {
    //should return "Service 1 out of 3" or something like it
    //so I check to see if 3 is in the result, which it should be
    await wrapper.setData({
      hospitalVisitClaims: [
        {
          month: "12",
          dayFrom: "24",
          dayTo: "26",
          year: "2020",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
        {
          month: "12",
          dayFrom: "24",
          dayTo: "26",
          year: "2020",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
        {
          month: "12",
          dayFrom: "24",
          dayTo: "26",
          year: "2020",
          numberOfServices: "1",
          serviceClarificationCode: "A1",
          feeItem: "00010",
          amountBilled: "0.00",
          diagnosticCode: "001",
          locationOfService: "A",
          correspondenceAttached: null,
          submissionCode: "I",
          notes: "Notes here.",
        },
      ],
    });
    const arrayLength = wrapper.vm.hospitalVisitClaims.length;
    const result = wrapper.vm.getHospitalVisitClaimTitle(0);
    expect(result).toContain(arrayLength);
  });
});

describe("MainFormPage.vue getServiceDateFutureErrorMessage()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns correct message when 1 claim", () => {
    const result = wrapper.vm.getServiceDateFutureErrorMessage();
    expect(result).not.toContain("90"); //eg. "90 days in the future"
  });

  it("returns correct message when more than 1 claim", async () => {
    const result = wrapper.vm.getServiceDateFutureErrorMessage("03333");
    expect(result).toContain("90"); //eg. "90 days in the future"
  });
});

describe("MainFormPage.vue isSubmissionCodeRequired()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false when serviceDate is null", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = null;
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toEqual(false);
  });

  it("returns false when not service date is less than 90 days ago", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast89Days;
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toEqual(false);
  });

  it("returns true when not service date is more than 90 days ago", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast91Days;
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toEqual(true);
  });

  it("returns false when route is CSR", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouterCSR,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].serviceDate = testDatePast91Days;
    const result = wrapper.vm.isSubmissionCodeRequired(0);
    expect(result).toEqual(false);
  });
});

describe("MainFormPage.vue isHospitalVisitSubmissionCodeRequired()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false when serviceDate is null", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].year = null;
    wrapper.vm.hospitalVisitClaims[0].month = null;
    wrapper.vm.hospitalVisitClaims[0].dayFrom = null;
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toEqual(false);
  });

  it("returns false when service date is less than 90 days ago", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].year = testDatePast89Days
      .getFullYear()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast89Days.getMonth() + 1;
    wrapper.vm.hospitalVisitClaims[0].month = correctedMonth.toString();
    wrapper.vm.hospitalVisitClaims[0].dayFrom = testDatePast89Days
      .getDate()
      .toString();
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toEqual(false);
  });

  it("returns true when service date is more than 90 days ago", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].year = testDatePast91Days
      .getFullYear()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast91Days.getMonth() + 1;
    wrapper.vm.hospitalVisitClaims[0].month = correctedMonth.toString();
    wrapper.vm.hospitalVisitClaims[0].dayFrom = testDatePast91Days
      .getDate()
      .toString();
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toEqual(true);
  });

  it("returns false when route is CSR", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouterCSR,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.hospitalVisitClaims[0].year = testDatePast91Days
      .getFullYear()
      .toString();
    // javascript date has January start at 0, but the select field has January start from 1
    // this code adjusts for that fact
    const correctedMonth = testDatePast91Days.getMonth() + 1;
    wrapper.vm.hospitalVisitClaims[0].month = correctedMonth.toString();
    wrapper.vm.hospitalVisitClaims[0].dayFrom = testDatePast91Days
      .getDate()
      .toString();
    const result = wrapper.vm.isHospitalVisitSubmissionCodeRequired(0);
    expect(result).toEqual(false);
  });
});

//-----computed value tests-----
describe("MainFormPage.vue isReferredByRequired()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false if all three conditions are null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(false);
  });

  it("returns true if the first is not null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: "A" });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the second is not null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: "A" });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the third is not null", async () => {
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: "A" });
    expect(Page.computed.isReferredByRequired.call(wrapper.vm)).toBe(true);
  });
});

describe("MainFormPage.vue isReferredToRequired()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.medicalServiceClaims[0].feeItem = "11111";
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns true if the first is not null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: "A" });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the second is not null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: "A" });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns true if the third is not null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: "A" });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns false if all three conditions are null", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(false);
  });

  it("returns true if fee item is 03333", async () => {
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(true);
  });

  it("returns false if route is CSR and the three conditions are null (fee item 11111)", async () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouterCSR,
    });

    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    wrapper.vm.medicalServiceClaims[0].feeItem = "11111";
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(false);
  });

  it("returns false if route is CSR and the three conditions are null (fee item 03333)", async () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouterCSR,
    });

    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    expect(Page.computed.isReferredToRequired.call(wrapper.vm)).toBe(false);
  });
});

describe("MainFormPage.vue isContainingNoChargeFeeItem()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);

    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });

    wrapper.vm.medicalServiceClaims = [
      {
        serviceDate: new Date(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        calledStartTime: {
          hour: "08",
          minute: "01",
        },
        renderedFinishTime: {
          hour: "16",
          minute: "05",
        },
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
      {
        serviceDate: new Date(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        calledStartTime: {
          hour: "08",
          minute: "01",
        },
        renderedFinishTime: {
          hour: "16",
          minute: "05",
        },
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
      {
        serviceDate: new Date(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        calledStartTime: {
          hour: "08",
          minute: "01",
        },
        renderedFinishTime: {
          hour: "16",
          minute: "05",
        },
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
    ];

    wrapper.vm.hospitalVisitClaims = [
      {
        month: testDate.getMonth().toString(),
        dayFrom: testDate.getDate().toString(),
        dayTo: testDate.getDate().toString(),
        year: testDate.getFullYear().toString(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
      {
        month: testDate.getMonth().toString(),
        dayFrom: testDate.getDate().toString(),
        dayTo: testDate.getDate().toString(),
        year: testDate.getFullYear().toString(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
      {
        month: testDate.getMonth().toString(),
        dayFrom: testDate.getDate().toString(),
        dayTo: testDate.getDate().toString(),
        year: testDate.getFullYear().toString(),
        numberOfServices: "1",
        serviceClarificationCode: "A1",
        feeItem: "00010",
        amountBilled: "0.00",
        diagnosticCode: "001",
        locationOfService: "B",
        correspondenceAttached: null,
        submissionCode: "I",
        notes: "Notes here.",
      },
    ];
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns true if one of the (medical) feeItems is 03333", () => {
    wrapper.vm.medicalServiceClaims[0].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns true if one of the (medical) feeItems is 03333 (2)", () => {
    wrapper.vm.medicalServiceClaims[1].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns false if none of the (medical) feeItems are 03333", () => {
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      false
    );
  });

  it("returns true if one of the (hospital) feeItems is 03333", () => {
    wrapper.vm.hospitalVisitClaims[0].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns true if one of the (hospital) feeItems is 03333 (2)", () => {
    wrapper.vm.hospitalVisitClaims[1].feeItem = "03333";
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      true
    );
  });

  it("returns false if none of the (hospital) feeItems are 03333", () => {
    expect(Page.computed.isContainingNoChargeFeeItem.call(wrapper.vm)).toBe(
      false
    );
  });
});

describe("MainFormPage.vue isCSR()", () => {
  // eslint-disable-next-line
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      applicationUuid: null,
    };
    store = new Vuex.Store(storeTemplate);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false if not CSR route", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouter,
    });
    expect(Page.computed.isCSR.call(wrapper.vm)).toBe(false);
  });

  it("returns true if CSR route", () => {
    wrapper = shallowMount(Page, {
      store,
      localVue,
      mocks: mockRouterCSR,
    });
    expect(Page.computed.isCSR.call(wrapper.vm)).toBe(true);
  });
});

//I'm not testing validationWarningList() since it relies on a variable, containsWarnings
//which never has data put into it. If this feature is implemented in the future, tests can go here

describe("MainFormPage.vue beforeRouteLeave(to, from, next)", () => {
  let store;
  let wrapper;
  let $route;
  let $router;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    $route = {
      path: "/potato",
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

  it("calls scrollTo() and getTopScrollPosition() when given invalid route", async () => {
    //to, from, next
    jest.useFakeTimers();
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPractitionerRouteStepOrder[3],
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
      payPractitionerRouteStepOrder[3],
      payPractitionerRouteStepOrder[0],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    const testPath = getConvertedPath(
      wrapper.vm.$router.currentRoute.path,
      payPractitionerRoutes.MAIN_FORM_PAGE.path
    );
    expect(next).toHaveBeenCalledWith({
      path: testPath,
      replace: true,
    });
  });

  it("calls next() when passed a route that has been completed in pageStateService", async () => {
    //to, from, next
    jest.useFakeTimers();
    await pageStateService.importPageRoutes(payPractitionerRouteStepOrder);
    await wrapper.vm.$nextTick;
    await pageStateService.setPageComplete(
      payPractitionerRouteStepOrder[0].path
    );
    await wrapper.vm.$nextTick;
    Page.beforeRouteLeave.call(
      wrapper.vm,
      payPractitionerRouteStepOrder[0],
      payPractitionerRouteStepOrder[1],
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(next).toHaveBeenCalled();
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
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
});
