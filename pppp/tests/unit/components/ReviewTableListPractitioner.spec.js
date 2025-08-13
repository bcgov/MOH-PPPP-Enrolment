import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import Page from "@/components/pay-practitioner/ReviewTableList.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../src/store/modules/app";
import * as module2 from "../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../src/store/modules/pay-practitioner-form";
import pageStateService from "@/services/page-state-service";
import { routeCollection } from "@/router/index";
import * as scrollHelper from "@/helpers/scroll";

const spyOnSetPageComplete = vi
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnScrollTo = vi
  .spyOn(scrollHelper, "scrollTo")
  .mockImplementation(() => Promise.resolve("scrolled"));

const spyOnScrollToElement = vi
  .spyOn(scrollHelper, "scrollToElement")
  .mockImplementation(() => Promise.resolve("scrolled to element"));

const storeTemplate = {
  modules: {
    app: cloneDeep(module1),
    payPatientForm: cloneDeep(module2),
    payPractitionerForm: cloneDeep(module3),
  },
};

const storeTemplate2 = {
  modules: {
    app: cloneDeep(module1),
    payPatientForm: cloneDeep(module2),
    payPractitionerForm: cloneDeep(module3),
  },
};

const practitionerState = {
  planReferenceNumber: "defaultReferenceNumber",
  phn: "defaultphn",
  dependentNumber: "defaultdependentNumber",
  firstName: "defaultfirstName",
  lastName: "defaultlastName",
  birthDate: "defaultBirthDate",
  addressOwner: "Default address owner",
  unitNumber: "defaultunitNumber",
  streetNumber: "defaultstreetNumber",
  streetName: "defaultstreetName",
  city: "defaultcity",
  postalCode: "defaultpostalCode",
  isVehicleAccident: "Y",
  vehicleAccidentClaimNumber: "defaultAccidentClaimNumber",
  planReferenceNumberOfOriginalClaim:
    "defaultplanReferenceNumberOfOriginalClaim",
  medicalServiceClaims: [
    {
      serviceDate: "defaultserviceDate",
      numberOfServices: "defaultnumberOfServices",
      serviceClarificationCode: "defaultserviceClarificationCode",
      feeItem: "defaultfeeItem",
      amountBilled: "defaultamountBilled",
      calledStartTime: { time: "defaultcalledStartTime" },
      renderedFinishTime: { time: "defaultrenderedFinishTime" },
      diagnosticCode: "defaultdiagnosticCode",
      locationOfService: "defaultlocationOfService",
      correspondenceAttached: "defaultcorrespondenceAttached",
      submissionCode: "defaultsubmissionCode",
      notes: "defaultnotes",
    },
  ],
  practitionerLastName: "defaultpractitionerLastName",
  practitionerFirstName: "defaultpractitionerFirstName",
  practitionerPaymentNumber: "defaultpractitionerPaymentNumber",
  practitionerPractitionerNumber: "defaultpractitionerPractitionerNumber",
  practitionerSpecialtyCode: "defaultpractitionerSpecialtyCode",
  practitionerFacilityNumber: "defaultpractitionerFacilityNumber",
  referredByPractitionerNumber: "defaultreferredByPractitionerNumber",
  referredByLastName: "defaultreferredByLastName",
  referredByFirstNameInitial: "defaultreferredByFirstNameInitial",
  referredToPractitionerNumber: "defaultreferredToPractitionerNumber",
  referredToLastName: "defaultreferredToLastName",
  referredToFirstNameInitial: "defaultreferredToFirstNameInitial",
  hospitalVisitClaims: [
    {
      month: "1",
      dayFrom: "defaultHVCdayFrom",
      dayTo: "defaultHVCdayTo",
      year: "defaultHVCyear",
      numberOfServices: "defaultHVCnumberOfServices",
      serviceClarificationCode: "defaultHVCserviceClarificationCode",
      feeItem: "defaultHVCfeeItem",
      amountBilled: "defaultHVCamountBilled",
      diagnosticCode: "defaultHVCdiagnosticCode",
      locationOfService: "defaultHVClocationOfService",
      correspondenceAttached: "defaultHVCcorrespondenceAttached",
      submissionCode: "defaultHVCsubmissionCode",
      notes: "defaultHVCnotes",
    },
  ],
  coveragePreAuthNumber: "defaultcoveragePreAuthNumber",
};

let practitionerState2 = cloneDeep(practitionerState);
practitionerState2.medicalServiceClaims = [
  {
    serviceDate: "defaultserviceDate",
    numberOfServices: "defaultnumberOfServices",
    serviceClarificationCode: "defaultserviceClarificationCode",
    feeItem: "defaultfeeItem",
    amountBilled: "defaultamountBilled",
    calledStartTime: { time: "defaultcalledStartTime" },
    renderedFinishTime: { time: "defaultrenderedFinishTime" },
    diagnosticCode: "defaultdiagnosticCode",
    locationOfService: "defaultlocationOfService",
    correspondenceAttached: "defaultcorrespondenceAttached",
    submissionCode: "defaultsubmissionCode",
    notes: "defaultnotes",
  },
  {
    serviceDate: "defaultserviceDate",
    numberOfServices: "defaultnumberOfServices",
    serviceClarificationCode: "defaultserviceClarificationCode",
    feeItem: "defaultfeeItem",
    amountBilled: "defaultamountBilled",
    calledStartTime: { time: "defaultcalledStartTime" },
    renderedFinishTime: { time: "defaultrenderedFinishTime" },
    diagnosticCode: "defaultdiagnosticCode",
    locationOfService: "defaultlocationOfService",
    correspondenceAttached: "defaultcorrespondenceAttached",
    submissionCode: "defaultsubmissionCode",
    notes: "defaultnotes",
  },
  {
    serviceDate: "defaultserviceDate",
    numberOfServices: "defaultnumberOfServices",
    serviceClarificationCode: "defaultserviceClarificationCode",
    feeItem: "defaultfeeItem",
    amountBilled: "defaultamountBilled",
    calledStartTime: { time: "defaultcalledStartTime" },
    renderedFinishTime: { time: "defaultrenderedFinishTime" },
    diagnosticCode: "defaultdiagnosticCode",
    locationOfService: "defaultlocationOfService",
    correspondenceAttached: "defaultcorrespondenceAttached",
    submissionCode: "defaultsubmissionCode",
    notes: "defaultnotes",
  },
];
practitionerState2.hospitalVisitClaims = [
  {
    month: "1",
    dayFrom: "defaultHVCdayFrom",
    dayTo: "defaultHVCdayTo",
    year: "defaultHVCyear",
    numberOfServices: "defaultHVCnumberOfServices",
    serviceClarificationCode: "defaultHVCserviceClarificationCode",
    feeItem: "defaultHVCfeeItem",
    amountBilled: "defaultHVCamountBilled",
    diagnosticCode: "defaultHVCdiagnosticCode",
    locationOfService: "defaultHVClocationOfService",
    correspondenceAttached: "defaultHVCcorrespondenceAttached",
    submissionCode: "defaultHVCsubmissionCode",
    notes: "defaultHVCnotes",
  },
  {
    month: "1",
    dayFrom: "defaultHVCdayFrom",
    dayTo: "defaultHVCdayTo",
    year: "defaultHVCyear",
    numberOfServices: "defaultHVCnumberOfServices",
    serviceClarificationCode: "defaultHVCserviceClarificationCode",
    feeItem: "defaultHVCfeeItem",
    amountBilled: "defaultHVCamountBilled",
    diagnosticCode: "defaultHVCdiagnosticCode",
    locationOfService: "defaultHVClocationOfService",
    correspondenceAttached: "defaultHVCcorrespondenceAttached",
    submissionCode: "defaultHVCsubmissionCode",
    notes: "defaultHVCnotes",
  },
  {
    month: "1",
    dayFrom: "defaultHVCdayFrom",
    dayTo: "defaultHVCdayTo",
    year: "defaultHVCyear",
    numberOfServices: "defaultHVCnumberOfServices",
    serviceClarificationCode: "defaultHVCserviceClarificationCode",
    feeItem: "defaultHVCfeeItem",
    amountBilled: "defaultHVCamountBilled",
    diagnosticCode: "defaultHVCdiagnosticCode",
    locationOfService: "defaultHVClocationOfService",
    correspondenceAttached: "defaultHVCcorrespondenceAttached",
    submissionCode: "defaultHVCsubmissionCode",
    notes: "defaultHVCnotes",
  },
];

storeTemplate.modules.payPractitionerForm.state = cloneDeep(practitionerState);
storeTemplate2.modules.payPractitionerForm.state =
  cloneDeep(practitionerState2);

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

//-------COMPUTED-------
describe("ReviewTableList practitioner", () => {
  it("renders", () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });

    const store = createStore(storeTemplate);
    const wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("ReviewTableList practitioner planReferenceNumberData() CSR", () => {
  let store;
  let wrapper;

  it("returns plan reference number in store when path isCSR", async () => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            currentRoute: {
              value: {
                path: "/pay-practitioner-csr",
              },
            },
          },
        },
      },
    });
    const result =
      wrapper.vm.$store.state.payPractitionerForm.planReferenceNumber;
    expect(result).toBe("defaultReferenceNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultReferenceNumber")
    );
  });

  it("does not render plan reference number when path is NOT CSR", async () => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            currentRoute: {
              value: {
                path: "/pay-practitioner",
              },
            },
          },
        },
      },
    });
    const result =
      wrapper.vm.$store.state.payPractitionerForm.planReferenceNumber;
    expect(result).toBe("defaultReferenceNumber");
    expect(wrapper.text()).not.toEqual(
      expect.stringContaining("defaultReferenceNumber")
    );
  });
});

describe("ReviewTableList practitioner patientData()", () => {
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

  it("renders phn", () => {
    const phn = wrapper.vm.$store.state.payPractitionerForm.phn;
    expect(phn).toBe("defaultphn");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultphn"));
  });

  it("renders dependentNumber", () => {
    const dependentNumber =
      wrapper.vm.$store.state.payPractitionerForm.dependentNumber;
    expect(dependentNumber).toBe("defaultdependentNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultdependentNumber")
    );
  });

  it("renders firstName", () => {
    const firstName = wrapper.vm.$store.state.payPractitionerForm.firstName;
    expect(firstName).toBe("defaultfirstName");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultfirstName"));
  });

  it("renders lastName", () => {
    const lastName = wrapper.vm.$store.state.payPractitionerForm.lastName;
    expect(lastName).toBe("defaultlastName");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultlastName"));
  });

  it("renders birthDate", () => {
    const birthDate = wrapper.vm.$store.state.payPractitionerForm.birthDate;
    expect(birthDate).toBe("defaultBirthDate");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultBirthDate"));
  });
});

describe("ReviewTableList Practitioner vehicleAccidentData()", () => {
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

  it("renders isVehicleAccident", () => {
    const isVehicleAccident =
      wrapper.vm.$store.state.payPractitionerForm.isVehicleAccident;
    expect(isVehicleAccident).toBe("Y");
    expect(wrapper.text()).toEqual(expect.stringContaining("Yes"));
  });

  it("renders vehicleAccidentClaimNumber", () => {
    const vehicleAccidentClaimNumber =
      wrapper.vm.$store.state.payPractitionerForm.vehicleAccidentClaimNumber;
    expect(vehicleAccidentClaimNumber).toBe("defaultAccidentClaimNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultAccidentClaimNumber")
    );
  });
});

describe("ReviewTableList Practitioner claimInfoData()", () => {
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

  it("renders planReferenceNumberOfOriginalClaim", () => {
    const isVehicleAccident =
      wrapper.vm.$store.state.payPractitionerForm
        .planReferenceNumberOfOriginalClaim;
    expect(isVehicleAccident).toBe("defaultplanReferenceNumberOfOriginalClaim");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultplanReferenceNumberOfOriginalClaim")
    );
  });
});

describe("ReviewTableList Practitioner medicalServiceClaims()", () => {
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

  it("renders serviceDate", () => {
    const serviceDate =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .serviceDate;
    expect(serviceDate).toBe("defaultserviceDate");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultserviceDate")
    );
  });

  it("renders numberOfServices", () => {
    const numberOfServices =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .numberOfServices;
    expect(numberOfServices).toBe("defaultnumberOfServices");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultnumberOfServices")
    );
  });

  it("renders serviceClarificationCode", () => {
    const serviceClarificationCode =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .serviceClarificationCode;
    expect(serviceClarificationCode).toBe("defaultserviceClarificationCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultserviceClarificationCode")
    );
  });

  it("renders feeItem", () => {
    const feeItem =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .feeItem;
    expect(feeItem).toBe("defaultfeeItem");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultfeeItem"));
  });

  it("renders amountBilled", () => {
    const amountBilled =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .amountBilled;
    expect(amountBilled).toBe("defaultamountBilled");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultamountBilled")
    );
  });

  it("renders calledStartTime", () => {
    const calledStartTime =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .calledStartTime.time;
    expect(calledStartTime).toBe("defaultcalledStartTime");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultcalledStartTime")
    );
  });

  it("renders renderedFinishTime", () => {
    const renderedFinishTime =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .renderedFinishTime.time;
    expect(renderedFinishTime).toBe("defaultrenderedFinishTime");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultrenderedFinishTime")
    );
  });

  it("renders diagnosticCode", () => {
    const diagnosticCode =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .diagnosticCode;
    expect(diagnosticCode).toBe("defaultdiagnosticCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultdiagnosticCode")
    );
  });

  it("renders locationOfService", () => {
    const locationOfService =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .locationOfService;
    expect(locationOfService).toBe("defaultlocationOfService");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultlocationOfService")
    );
  });

  it("renders correspondenceAttached", () => {
    const correspondenceAttached =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .correspondenceAttached;
    expect(correspondenceAttached).toBe("defaultcorrespondenceAttached");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultcorrespondenceAttached")
    );
  });

  it("renders submissionCode", () => {
    const submissionCode =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0]
        .submissionCode;
    expect(submissionCode).toBe("defaultsubmissionCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultsubmissionCode")
    );
  });

  it("renders notes", () => {
    const notes =
      wrapper.vm.$store.state.payPractitionerForm.medicalServiceClaims[0].notes;
    expect(notes).toBe("defaultnotes");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultnotes"));
  });
});

describe("ReviewTableList Practitioner practitionerData()", () => {
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

  it("renders PractitionerLastName", () => {
    const practitionerLastName =
      wrapper.vm.$store.state.payPractitionerForm.practitionerLastName;
    expect(practitionerLastName).toBe("defaultpractitionerLastName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerLastName")
    );
  });

  it("renders practitionerFirstName", () => {
    const practitionerFirstName =
      wrapper.vm.$store.state.payPractitionerForm.practitionerFirstName;
    expect(practitionerFirstName).toBe("defaultpractitionerFirstName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerFirstName")
    );
  });

  it("renders practitionerPaymentNumber", () => {
    const practitionerPaymentNumber =
      wrapper.vm.$store.state.payPractitionerForm.practitionerPaymentNumber;
    expect(practitionerPaymentNumber).toBe("defaultpractitionerPaymentNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerPaymentNumber")
    );
  });

  it("renders practitionerPractitionerNumber", () => {
    const practitionerPractitionerNumber =
      wrapper.vm.$store.state.payPractitionerForm
        .practitionerPractitionerNumber;
    expect(practitionerPractitionerNumber).toBe(
      "defaultpractitionerPractitionerNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerPractitionerNumber")
    );
  });

  it("renders practitionerSpecialtyCode", () => {
    const practitionerSpecialtyCode =
      wrapper.vm.$store.state.payPractitionerForm.practitionerSpecialtyCode;
    expect(practitionerSpecialtyCode).toBe("defaultpractitionerSpecialtyCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerSpecialtyCode")
    );
  });

  it("renders practitionerFacilityNumber", () => {
    const practitionerFacilityNumber =
      wrapper.vm.$store.state.payPractitionerForm.practitionerFacilityNumber;
    expect(practitionerFacilityNumber).toBe(
      "defaultpractitionerFacilityNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerFacilityNumber")
    );
  });

  it("renders Coverage Pre-Authorization Number", () => {
    const coveragePreAuthNumber =
      wrapper.vm.$store.state.payPractitionerForm.coveragePreAuthNumber;
    expect(coveragePreAuthNumber).toBe("defaultcoveragePreAuthNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultcoveragePreAuthNumber")
    );
  });
});

describe("ReviewTableList practitioner referredByData()", () => {
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

  it("renders referredByPractitionerNumber", () => {
    const referredByPractitionerNumber =
      wrapper.vm.$store.state.payPractitionerForm.referredByPractitionerNumber;
    expect(referredByPractitionerNumber).toBe(
      "defaultreferredByPractitionerNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredByPractitionerNumber")
    );
  });

  it("renders referredByLastName", () => {
    const referredByLastName =
      wrapper.vm.$store.state.payPractitionerForm.referredByLastName;
    expect(referredByLastName).toBe("defaultreferredByLastName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredByLastName")
    );
  });

  it("renders referredByFirstNameInitial", () => {
    const referredByFirstNameInitial =
      wrapper.vm.$store.state.payPractitionerForm.referredByFirstNameInitial;
    expect(referredByFirstNameInitial).toBe(
      "defaultreferredByFirstNameInitial"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredByFirstNameInitial")
    );
  });
});

describe("ReviewTableList practitioner referredToData()", () => {
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

  it("renders referredToPractitionerNumber", () => {
    const referredToPractitionerNumber =
      wrapper.vm.$store.state.payPractitionerForm.referredToPractitionerNumber;
    expect(referredToPractitionerNumber).toBe(
      "defaultreferredToPractitionerNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredToPractitionerNumber")
    );
  });

  it("renders referredToLastName", () => {
    const referredToLastName =
      wrapper.vm.$store.state.payPractitionerForm.referredToLastName;
    expect(referredToLastName).toBe("defaultreferredToLastName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredToLastName")
    );
  });

  it("renders referredToFirstNameInitial", () => {
    const referredToFirstNameInitial =
      wrapper.vm.$store.state.payPractitionerForm.referredToFirstNameInitial;
    expect(referredToFirstNameInitial).toBe(
      "defaultreferredToFirstNameInitial"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredToFirstNameInitial")
    );
  });
});

describe("ReviewTableList practitioner hospitalVisitClaims()", () => {
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

  it("renders HVC month", () => {
    const month =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0].month;
    expect(month).toBe("1");
    expect(wrapper.text()).toEqual(expect.stringContaining("January"));
  });

  it("renders HVC dayFrom", () => {
    const dayFrom =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .dayFrom;
    expect(dayFrom).toBe("defaultHVCdayFrom");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCdayFrom")
    );
  });

  it("renders HVC dayTo", () => {
    const dayTo =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0].dayTo;
    expect(dayTo).toBe("defaultHVCdayTo");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultHVCdayTo"));
  });

  it("renders HVC year", () => {
    const year =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0].year;
    expect(year).toBe("defaultHVCyear");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultHVCyear"));
  });

  it("renders HVC numberOfServices", () => {
    const numberOfServices =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .numberOfServices;
    expect(numberOfServices).toBe("defaultHVCnumberOfServices");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCnumberOfServices")
    );
  });

  it("renders HVC serviceClarificationCode", () => {
    const serviceClarificationCode =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .serviceClarificationCode;
    expect(serviceClarificationCode).toBe("defaultHVCserviceClarificationCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCserviceClarificationCode")
    );
  });

  it("renders HVC feeItem", () => {
    const feeItem =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .feeItem;
    expect(feeItem).toBe("defaultHVCfeeItem");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCfeeItem")
    );
  });

  it("renders HVC amountBilled", () => {
    const amountBilled =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .amountBilled;
    expect(amountBilled).toBe("defaultHVCamountBilled");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCamountBilled")
    );
  });

  it("renders HVC diagnosticCode", () => {
    const diagnosticCode =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .diagnosticCode;
    expect(diagnosticCode).toBe("defaultHVCdiagnosticCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCdiagnosticCode")
    );
  });

  it("renders HVC locationOfService", () => {
    const locationOfService =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .locationOfService;
    expect(locationOfService).toBe("defaultHVClocationOfService");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVClocationOfService")
    );
  });

  it("renders HVC correspondenceAttached", () => {
    const correspondenceAttached =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .correspondenceAttached;
    expect(correspondenceAttached).toBe("defaultHVCcorrespondenceAttached");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCcorrespondenceAttached")
    );
  });

  it("renders HVC submissionCode", () => {
    const submissionCode =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0]
        .submissionCode;
    expect(submissionCode).toBe("defaultHVCsubmissionCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultHVCsubmissionCode")
    );
  });

  it("renders HVC notes", () => {
    const notes =
      wrapper.vm.$store.state.payPractitionerForm.hospitalVisitClaims[0].notes;
    expect(notes).toBe("defaultHVCnotes");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultHVCnotes"));
  });
});

//isCSR() is weirdly difficult to test.
//Can't call the function directly because it relies on mounted variables
//Can't check the rendered output directly because it doesn't put text on the page
//Next best thing is to check the v-if code on the planReferenceNumberData ReviewTable, currently line 15
//So I did that in that test and skipped this specific test

//-------METHODS-------
describe("ReviewTableList practitioner navigateToClaimCountPage()", () => {
  let store;
  let wrapper;
  let mockRouter;
  let spyOnRouter;

  beforeEach(() => {
    mockRouter = {
      push: vi.fn(),
      currentRoute: {
        value: {
          path: "/potato",
        },
      },
    };

    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = vi
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls router push", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-practitioner");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnSetPageComplete).toHaveBeenCalledWith("/pay-practitioner");
  });

  it("calls scrollTo", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewTableList practitioner navigateToClaimCountPage() (part 2 CSR)", () => {
  let store;
  let wrapper;
  let mockRouter;
  let spyOnRouter;

  beforeEach(() => {
    mockRouter = {
      push: vi.fn(),
      currentRoute: {
        value: {
          path: "/potato-csr",
        },
      },
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = vi
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls router push", async () => {
    await wrapper.vm.$router.push("/potato-csr");
    await wrapper.vm.$nextTick;
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-practitioner-csr");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnSetPageComplete).toHaveBeenCalledWith("/pay-practitioner-csr");
  });

  it("calls scrollTo", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewTableList practitioner navigateToMainFormPage(anchorName)", () => {
  let store;
  let wrapper;
  let mockRouter;
  let spyOnRouter;

  const anchorName = "anchorName";

  beforeEach(() => {
    mockRouter = {
      push: vi.fn(),
      currentRoute: {
        value: {
          path: "/potato",
        },
      },
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = vi
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls router push", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-practitioner/main-form");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnSetPageComplete).toHaveBeenCalledWith(
      "/pay-practitioner/main-form"
    );
  });

  it("calls scrollToElement", async () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToElement).toHaveBeenCalled();
  });
});

describe("ReviewTableList practitioner navigateToMainFormPage(anchorName) (part 2 CSR)", () => {
  let store;
  let wrapper;
  let mockRouter;
  let spyOnRouter;

  const anchorName = "anchorName";

  beforeEach(() => {
    mockRouter = {
      push: vi.fn(),
      currentRoute: {
        value: {
          path: "/potato-csr",
        },
      },
    };
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = vi
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls router push", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-practitioner-csr/main-form");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnSetPageComplete).toHaveBeenCalledWith(
      "/pay-practitioner-csr/main-form"
    );
  });

  it("calls scrollToElement", async () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToElement).toHaveBeenCalled();
  });
});

describe("ReviewTableList practitioner getMedicalServiceClaimTitle(index)", () => {
  let store;
  let wrapper;

  const mockRouter = {
    push: vi.fn(),
    currentRoute: {
      value: {
        path: "/potato-csr",
      },
    },
  };

  it("returns 1", () => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    const result = wrapper.vm.getMedicalServiceClaimTitle(0);
    expect(result).toBe("Service");
  });

  it("returns 2", () => {
    store = createStore(storeTemplate2);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
    const result = wrapper.vm.getMedicalServiceClaimTitle(0);
    expect(result).toBe("Service (1 of 3)");
  });
});
