import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import Page from "@/views/pay-patient/MainFormPage.vue";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import * as dummyDataValid from "../../../../src/store/states/pay-patient-form-dummy-data";
import apiService from "@/services/api-service";

const testDateFutureYear = new Date();
testDateFutureYear.setFullYear(testDateFutureYear.getFullYear() + 1);

const testDateFutureMonth = new Date();
testDateFutureMonth.setMonth(testDateFutureMonth.getMonth() + 1);

const testDatePast89Days = new Date();
testDatePast89Days.setDate(testDatePast89Days.getDate() - 89);

const testDatePast91Days = new Date();
testDatePast91Days.setDate(testDatePast91Days.getDate() - 91);

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
  phn: "9999 999 998",
  dependentNumber: "66",
  firstName: "Bob",
  middleInitial: "H",
  lastName: "Smith",
  birthDate: new Date("2000-01-01"),

  addressOwner: "PATIENT",
  unitNumber: "123",
  streetNumber: "321",
  streetName: "Fake St.",
  city: "Victoria",
  postalCode: "V8V 8V8",

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

  practitionerLastName: "GOTTNER",
  practitionerFirstName: "MICHAEL",
  practitionerPaymentNumber: "00001",
  practitionerPractitionerNumber: "00001",
  practitionerFacilityNumber: "12345",
  practitionerSpecialtyCode: "99",

  referredByFirstNameInitial: "R",
  referredByLastName: "McDonald",
  referredByPractitionerNumber: "22271",

  referredToFirstNameInitial: "C",
  referredToLastName: "Lee",
  referredToPractitionerNumber: "22272",
};

const failingData = {
  planReferenceNumber: "",
  phn: "",
  dependentNumber: "",
  firstName: "",
  middleInitial: "",
  lastName: "",
  birthDate: new Date("2000-01-01"),

  addressOwner: "",
  unitNumber: "",
  streetNumber: "",
  streetName: "",
  city: "",
  postalCode: "",

  isVehicleAccident: "",
  vehicleAccidentClaimNumber: "",

  planReferenceNumberOfOriginalClaim: "",

  medicalServiceClaims: [
    {
      serviceDate: new Date("2000-01-01"),
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

  practitionerLastName: "",
  practitionerFirstName: "",
  practitionerPaymentNumber: "",
  practitionerPractitionerNumber: "",
  practitionerFacilityNumber: "",
  practitionerSpecialtyCode: "",

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

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientState = cloneDeep(dummyDataValid.default);
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

const mockRouter = {
  $route: {
    path: "/",
  },
  $router: {
    push: jest.fn(),
    currentRoute: {
      value: {
        path: "/pay-patient/main-form",
      },
    },
  },
};

describe("MainFormPage.vue validateFields(), public", () => {
  let store;
  let wrapper;
  let spyOnNavigateToNextPage;

  beforeEach(() => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: mockRouter,
      },
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
    Object.assign(wrapper.vm, cloneDeep(failingData));
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
    const testData = "";
    await wrapper.setData({ phn: testData });
    expect(wrapper.vm.phn).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(PHN) flags invalid if invalid entry", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "1212 121 212";
    await wrapper.setData({ phn: testData });
    expect(wrapper.vm.phn).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(PHN) flags invalid if PHN doesn't start with 9", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "7999 999 998";
    await wrapper.setData({ phn: testData });
    expect(wrapper.vm.phn).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if non number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "a";
    await wrapper.setData({ dependentNumber: testData });
    expect(wrapper.vm.dependentNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if negative number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "-2";
    await wrapper.setData({ dependentNumber: testData });
    expect(wrapper.vm.dependentNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(dependentNumber) flags invalid if not 00 or 66 with a PHN", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "55";
    await wrapper.setData({ dependentNumber: testData });
    expect(wrapper.vm.dependentNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = null;
    await wrapper.setData({ firstName: testData });
    expect(wrapper.vm.aaa).not.toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "aaa^";
    await wrapper.setData({ firstName: testData });
    expect(wrapper.vm.firstName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(firstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `a-.' -.' `;
    await wrapper.setData({ firstName: testData });
    expect(wrapper.vm.firstName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `1`;
    await wrapper.setData({ middleInitial: testData });
    expect(wrapper.vm.middleInitial).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags invalid if contains non-alphabetic character (2)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `^`;
    await wrapper.setData({ middleInitial: testData });
    expect(wrapper.vm.middleInitial).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(middleInitial) flags valid if contains alphabetic character", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `a`;
    await wrapper.setData({ middleInitial: testData });
    expect(wrapper.vm.middleInitial).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(lastName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ lastName: null });
    expect(wrapper.vm.lastName).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(lastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "aaa^";
    await wrapper.setData({ lastName: testData });
    expect(wrapper.vm.lastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(lastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `a-.' -.' `;
    await wrapper.setData({ lastName: testData });
    expect(wrapper.vm.lastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if not present and dependentNumber is not 66", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "00";
    await wrapper.setData({ birthDate: null });
    await wrapper.setData({ dependentNumber: testData });
    expect(wrapper.vm.birthDate).toBeNull();
    expect(wrapper.vm.dependentNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags valid if not present and dependentNumber is 66", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "66";
    await wrapper.setData({ birthDate: null });
    await wrapper.setData({ dependentNumber: testData });
    expect(wrapper.vm.birthDate).toBeNull();
    expect(wrapper.vm.dependentNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given date is too far in the past", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = new Date(1595, 11, 17);
    wrapper.vm.birthDate = testData;
    await wrapper.vm.$nextTick;
    expect(wrapper.vm.birthDate).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given date is in future", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    wrapper.vm.birthDate = testDateFutureYear;
    expect(wrapper.vm.birthDate).toStrictEqual(testDateFutureYear);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(birthDate) flags invalid if given invalid date", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = {
      date: null,
      month: 0,
      day: "32",
      year: "2020",
    };
    await wrapper.setData({
      birthDateData: testData,
    });
    expect(wrapper.vm.birthDateData).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(addressOwner) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ addressOwner: null });
    expect(wrapper.vm.addressOwner).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(streetName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ streetName: null });
    expect(wrapper.vm.streetName).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(city) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ city: null });
    expect(wrapper.vm.city).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(postalCode) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ postalCode: null });
    expect(wrapper.vm.postalCode).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(postalCode) flags invalid if not BC postal code", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "A1A1A1";
    await wrapper.setData({ postalCode: testData });
    expect(wrapper.vm.postalCode).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(postalCode) flags valid if BC postal code", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "V1A1A1";
    await wrapper.setData({ postalCode: testData });
    expect(wrapper.vm.postalCode).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(isVehicleAccident) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ isVehicleAccident: null });
    expect(wrapper.vm.isVehicleAccident).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags invalid if not correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "^^^";
    await wrapper.setData({ vehicleAccidentClaimNumber: testData });
    expect(wrapper.vm.vehicleAccidentClaimNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags invalid if eight numerals (2)", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "88888888";
    await wrapper.setData({ vehicleAccidentClaimNumber: testData });
    expect(wrapper.vm.vehicleAccidentClaimNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(vehicleAccidentClaimNumber) flags valid if correct format", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "AA111111";
    await wrapper.setData({ vehicleAccidentClaimNumber: testData });
    expect(wrapper.vm.vehicleAccidentClaimNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not integer", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "a";
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: testData });
    expect(wrapper.vm.planReferenceNumberOfOriginalClaim).toStrictEqual(
      testData
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(planReferenceNumberOfOriginalClaim) flags invalid if not positive", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "-2";
    await wrapper.setData({ planReferenceNumberOfOriginalClaim: testData });
    expect(wrapper.vm.planReferenceNumberOfOriginalClaim).toStrictEqual(
      testData
    );
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerLastName: null });
    expect(wrapper.vm.practitionerLastName).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "aaa^";
    await wrapper.setData({ practitionerLastName: testData });
    expect(wrapper.vm.practitionerLastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `a-.' -.' `;
    await wrapper.setData({ practitionerLastName: testData });
    expect(wrapper.vm.practitionerLastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ practitionerFirstName: null });
    expect(wrapper.vm.practitionerFirstName).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "aaa^";
    await wrapper.setData({ practitionerFirstName: testData });
    expect(wrapper.vm.practitionerFirstName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFirstName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `a-.' -.' `;
    await wrapper.setData({ practitionerFirstName: testData });
    expect(wrapper.vm.practitionerFirstName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "";
    await wrapper.setData({ practitionerPaymentNumber: testData });
    expect(wrapper.vm.practitionerPaymentNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPaymentNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "A1A1";
    await wrapper.setData({ practitionerPaymentNumber: testData });
    expect(wrapper.vm.practitionerPaymentNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags invalid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "";
    await wrapper.setData({ practitionerPractitionerNumber: testData });
    expect(wrapper.vm.practitionerPractitionerNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerPractitionerNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "A1A1";
    await wrapper.setData({ practitionerPractitionerNumber: testData });
    expect(wrapper.vm.practitionerPractitionerNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "";
    await wrapper.setData({ practitionerFacilityNumber: testData });
    expect(wrapper.vm.practitionerFacilityNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerFacilityNumber) flags invalid if less than five digits", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "A1A1";
    await wrapper.setData({ practitionerFacilityNumber: testData });
    expect(wrapper.vm.practitionerFacilityNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags valid if not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "";
    await wrapper.setData({ practitionerSpecialtyCode: testData });
    expect(wrapper.vm.practitionerSpecialtyCode).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if alphanumeric but not on list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "A1A1";
    await wrapper.setData({ practitionerSpecialtyCode: testData });
    expect(wrapper.vm.practitionerSpecialtyCode).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not alphanumeric", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "a^^^";
    await wrapper.setData({ practitionerSpecialtyCode: testData });
    expect(wrapper.vm.practitionerSpecialtyCode).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not the minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "0";
    await wrapper.setData({ practitionerSpecialtyCode: testData });
    expect(wrapper.vm.practitionerSpecialtyCode).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(practitionerSpecialtyCode) flags invalid if not on the list", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "98";
    await wrapper.setData({ practitionerSpecialtyCode: testData });
    expect(wrapper.vm.practitionerSpecialtyCode).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "1";
    await wrapper.setData({ referredByFirstNameInitial: testData });
    expect(wrapper.vm.referredByFirstNameInitial).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "aaa^";
    await wrapper.setData({ referredByLastName: testData });
    expect(wrapper.vm.referredByLastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredByLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `a-.' -.' `;
    await wrapper.setData({ referredByLastName: testData });
    expect(wrapper.vm.referredByLastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredByPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `1111`;
    await wrapper.setData({ referredByPractitionerNumber: testData });
    expect(wrapper.vm.referredByPractitionerNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToFirstNameInitial) flags invalid if not alphabetic", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "1";
    await wrapper.setData({ referredToFirstNameInitial: testData });
    expect(wrapper.vm.referredToFirstNameInitial).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags invalid if contains invalid characters", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "aaa^";
    await wrapper.setData({ referredToLastName: testData });
    expect(wrapper.vm.referredToLastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("(referredToLastName) flags valid if contains commas, dashes, or apostrophes and starts with a letter", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `a-.' -.' `;
    await wrapper.setData({ referredToLastName: testData });
    expect(wrapper.vm.referredToLastName).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("(referredToPractitionerNumber) flags invalid if not minimum length", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `1111`;
    await wrapper.setData({ referredToPractitionerNumber: testData });
    expect(wrapper.vm.referredToPractitionerNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  //miscellaneous conditions

  it("flags invalid if dependentNumber not 66 and birthdate not present", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testDependentNumber = `00`;
    await wrapper.setData({ dependentNumber: testDependentNumber });
    await wrapper.setData({ birthDate: null });
    expect(wrapper.vm.dependentNumber).toStrictEqual(testDependentNumber);
    expect(wrapper.vm.birthDate).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `Q`;
    await wrapper.setData({ referredByFirstNameInitial: testData });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(wrapper.vm.referredByFirstNameInitial).toStrictEqual(testData);
    expect(wrapper.vm.referredByLastName).toBeNull();
    expect(wrapper.vm.referredByPractitionerNumber).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "Surname";
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: testData });
    await wrapper.setData({ referredByPractitionerNumber: null });
    expect(wrapper.vm.referredByFirstNameInitial).toBeNull();
    expect(wrapper.vm.referredByLastName).toStrictEqual(testData);
    expect(wrapper.vm.referredByPractitionerNumber).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredBy prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "11111";
    await wrapper.setData({ referredByFirstNameInitial: null });
    await wrapper.setData({ referredByLastName: null });
    await wrapper.setData({ referredByPractitionerNumber: testData });
    expect(wrapper.vm.referredByFirstNameInitial).toBeNull();
    expect(wrapper.vm.referredByLastName).toBeNull();
    expect(wrapper.vm.referredByPractitionerNumber).toStrictEqual(testData);
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
    expect(wrapper.vm.referredByFirstNameInitial).toBeNull();
    expect(wrapper.vm.referredByLastName).toBeNull();
    expect(wrapper.vm.referredByPractitionerNumber).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags invalid if referredTo first name initial present but not last name or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = `Q`;
    await wrapper.setData({ referredToFirstNameInitial: testData });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(wrapper.vm.referredToFirstNameInitial).toStrictEqual(testData);
    expect(wrapper.vm.referredToLastName).toBeNull();
    expect(wrapper.vm.referredToPractitionerNumber).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo last name present but not first name initial or prac number", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "Surname";
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: testData });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(wrapper.vm.referredToFirstNameInitial).toBeNull();
    expect(wrapper.vm.referredToLastName).toStrictEqual(testData);
    expect(wrapper.vm.referredToPractitionerNumber).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags invalid if referredTo prac number present but not first name initial or last name", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    const testData = "11111";
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: testData });
    expect(wrapper.vm.referredToFirstNameInitial).toBeNull();
    expect(wrapper.vm.referredToLastName).toBeNull();
    expect(wrapper.vm.referredToPractitionerNumber).toStrictEqual(testData);
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).not.toHaveBeenCalled();
  });

  it("flags valid if all three are null", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ referredToFirstNameInitial: null });
    await wrapper.setData({ referredToLastName: null });
    await wrapper.setData({ referredToPractitionerNumber: null });
    expect(wrapper.vm.referredToFirstNameInitial).toBeNull();
    expect(wrapper.vm.referredToLastName).toBeNull();
    expect(wrapper.vm.referredToPractitionerNumber).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });

  it("flags valid if planReferenceNumber is null", async () => {
    Object.assign(wrapper.vm, cloneDeep(passingData));
    await wrapper.setData({ planReferenceNumber: null });
    expect(wrapper.vm.planReferenceNumber).toBeNull();
    await wrapper.vm.validateFields();
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(spyOnNavigateToNextPage).toHaveBeenCalled();
  });
});
