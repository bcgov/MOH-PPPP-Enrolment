import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import Page from "@/components/pay-patient/ReviewTableList.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../src/store/modules/app";
import * as module2 from "../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../src/store/modules/pay-practitioner-form";
import pageStateService from "@/services/page-state-service";
import { routeCollection } from "@/router/index";

const scrollHelper = require("@/helpers/scroll");

const spyOnSetPageComplete = jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToElement: jest.fn(),
}));

const spyOnScrollTo = jest
  .spyOn(scrollHelper, "scrollTo")
  .mockImplementation(() => Promise.resolve("scrolled"));
const spyOnScrollToElement = jest
  .spyOn(scrollHelper, "scrollToElement")
  .mockImplementation(() => Promise.resolve("scrolled"));

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

const patientState = {
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
};

const patientState2 = {
  medicalServiceClaims: ["1", "2", "3"],
};
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);
storeTemplate2.modules.payPatientForm.state = cloneDeep(patientState2);

//-------COMPUTED-------
describe("ReviewTableList patient", () => {
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

describe("ReviewTableList patient planReferenceNumberData() CSR", () => {
  let store;
  let wrapper;

  it("returns plan reference number in store when path isCSR", () => {
    //please note the route change between this and the next test
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            currentRoute: {
              value: {
                path: "/potato-csr",
              },
            },
          },
        },
      },
    });
    const result = wrapper.vm.$store.state.payPatientForm.planReferenceNumber;
    expect(result).toBe("defaultReferenceNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultReferenceNumber")
    );
  });

  it("does not render plan reference number when path is NOT CSR", () => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            currentRoute: {
              value: {
                path: "/potato",
              },
            },
          },
        },
      },
    });
    const result = wrapper.vm.$store.state.payPatientForm.planReferenceNumber;
    expect(result).toBe("defaultReferenceNumber");
    expect(wrapper.text()).not.toEqual(
      expect.stringContaining("defaultReferenceNumber")
    );
  });
});

describe("ReviewTableList patient patientData()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders phn", () => {
    const phn = wrapper.vm.$store.state.payPatientForm.phn;
    expect(phn).toBe("defaultphn");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultphn"));
  });

  it("renders dependentNumber", () => {
    const dependentNumber =
      wrapper.vm.$store.state.payPatientForm.dependentNumber;
    expect(dependentNumber).toBe("defaultdependentNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultdependentNumber")
    );
  });

  it("renders firstName", () => {
    const firstName = wrapper.vm.$store.state.payPatientForm.firstName;
    expect(firstName).toBe("defaultfirstName");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultfirstName"));
  });

  it("renders lastName", () => {
    const lastName = wrapper.vm.$store.state.payPatientForm.lastName;
    expect(lastName).toBe("defaultlastName");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultlastName"));
  });

  it("renders birthDate", () => {
    const birthDate = wrapper.vm.$store.state.payPatientForm.birthDate;
    expect(birthDate).toBe("defaultBirthDate");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultBirthDate"));
  });
});

describe("ReviewTableList patient paymentMailAddressData()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders addressOwner", () => {
    const addressOwner = wrapper.vm.$store.state.payPatientForm.addressOwner;
    expect(addressOwner).toBe("Default address owner");
    //it capitalizes the value, so I capitalized it below
    expect(wrapper.text()).toEqual(
      expect.stringContaining("Default address owner")
    );
  });

  it("renders unitNumber", () => {
    const unitNumber = wrapper.vm.$store.state.payPatientForm.unitNumber;
    expect(unitNumber).toBe("defaultunitNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultunitNumber")
    );
  });

  it("renders streetNumber", () => {
    const streetNumber = wrapper.vm.$store.state.payPatientForm.streetNumber;
    expect(streetNumber).toBe("defaultstreetNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultstreetNumber")
    );
  });

  it("renders streetName", () => {
    const streetName = wrapper.vm.$store.state.payPatientForm.streetName;
    expect(streetName).toBe("defaultstreetName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultstreetName")
    );
  });

  it("renders city", () => {
    const city = wrapper.vm.$store.state.payPatientForm.city;
    expect(city).toBe("defaultcity");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultcity"));
  });

  it("renders postalCode", () => {
    const postalCode = wrapper.vm.$store.state.payPatientForm.postalCode;
    expect(postalCode).toBe("defaultpostalCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpostalCode")
    );
  });
});

describe("ReviewTableList patient vehicleAccidentData()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders isVehicleAccident", () => {
    const isVehicleAccident =
      wrapper.vm.$store.state.payPatientForm.isVehicleAccident;
    expect(isVehicleAccident).toBe("Y");
    expect(wrapper.text()).toEqual(expect.stringContaining("Yes"));
  });

  it("renders vehicleAccidentClaimNumber", () => {
    const vehicleAccidentClaimNumber =
      wrapper.vm.$store.state.payPatientForm.vehicleAccidentClaimNumber;
    expect(vehicleAccidentClaimNumber).toBe("defaultAccidentClaimNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultAccidentClaimNumber")
    );
  });
});

describe("ReviewTableList patient claimInfoData()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders planReferenceNumberOfOriginalClaim", () => {
    const isVehicleAccident =
      wrapper.vm.$store.state.payPatientForm.planReferenceNumberOfOriginalClaim;
    expect(isVehicleAccident).toBe("defaultplanReferenceNumberOfOriginalClaim");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultplanReferenceNumberOfOriginalClaim")
    );
  });
});

describe("ReviewTableList patient medicalServiceClaims()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders serviceDate", () => {
    const serviceDate =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .serviceDate;
    expect(serviceDate).toBe("defaultserviceDate");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultserviceDate")
    );
  });

  it("renders numberOfServices", () => {
    const numberOfServices =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .numberOfServices;
    expect(numberOfServices).toBe("defaultnumberOfServices");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultnumberOfServices")
    );
  });

  it("renders serviceClarificationCode", () => {
    const serviceClarificationCode =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .serviceClarificationCode;
    expect(serviceClarificationCode).toBe("defaultserviceClarificationCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultserviceClarificationCode")
    );
  });

  it("renders feeItem", () => {
    const feeItem =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0].feeItem;
    expect(feeItem).toBe("defaultfeeItem");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultfeeItem"));
  });

  it("renders amountBilled", () => {
    const amountBilled =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .amountBilled;
    expect(amountBilled).toBe("defaultamountBilled");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultamountBilled")
    );
  });

  it("renders calledStartTime", () => {
    const calledStartTime =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .calledStartTime.time;
    expect(calledStartTime).toBe("defaultcalledStartTime");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultcalledStartTime")
    );
  });

  it("renders renderedFinishTime", () => {
    const renderedFinishTime =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .renderedFinishTime.time;
    expect(renderedFinishTime).toBe("defaultrenderedFinishTime");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultrenderedFinishTime")
    );
  });

  it("renders diagnosticCode", () => {
    const diagnosticCode =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .diagnosticCode;
    expect(diagnosticCode).toBe("defaultdiagnosticCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultdiagnosticCode")
    );
  });

  it("renders locationOfService", () => {
    const locationOfService =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .locationOfService;
    expect(locationOfService).toBe("defaultlocationOfService");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultlocationOfService")
    );
  });

  it("renders correspondenceAttached", () => {
    const correspondenceAttached =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .correspondenceAttached;
    expect(correspondenceAttached).toBe("defaultcorrespondenceAttached");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultcorrespondenceAttached")
    );
  });

  it("renders submissionCode", () => {
    const submissionCode =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0]
        .submissionCode;
    expect(submissionCode).toBe("defaultsubmissionCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultsubmissionCode")
    );
  });

  it("renders notes", () => {
    const notes =
      wrapper.vm.$store.state.payPatientForm.medicalServiceClaims[0].notes;
    expect(notes).toBe("defaultnotes");
    expect(wrapper.text()).toEqual(expect.stringContaining("defaultnotes"));
  });
});

describe("ReviewTableList patient practitionerData()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders practitionerLastName", () => {
    const practitionerLastName =
      wrapper.vm.$store.state.payPatientForm.practitionerLastName;
    expect(practitionerLastName).toBe("defaultpractitionerLastName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerLastName")
    );
  });

  it("renders practitionerFirstName", () => {
    const practitionerFirstName =
      wrapper.vm.$store.state.payPatientForm.practitionerFirstName;
    expect(practitionerFirstName).toBe("defaultpractitionerFirstName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerFirstName")
    );
  });

  it("renders practitionerPaymentNumber", () => {
    const practitionerPaymentNumber =
      wrapper.vm.$store.state.payPatientForm.practitionerPaymentNumber;
    expect(practitionerPaymentNumber).toBe("defaultpractitionerPaymentNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerPaymentNumber")
    );
  });

  it("renders practitionerPractitionerNumber", () => {
    const practitionerPractitionerNumber =
      wrapper.vm.$store.state.payPatientForm.practitionerPractitionerNumber;
    expect(practitionerPractitionerNumber).toBe(
      "defaultpractitionerPractitionerNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerPractitionerNumber")
    );
  });

  it("renders practitionerSpecialtyCode", () => {
    const practitionerSpecialtyCode =
      wrapper.vm.$store.state.payPatientForm.practitionerSpecialtyCode;
    expect(practitionerSpecialtyCode).toBe("defaultpractitionerSpecialtyCode");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerSpecialtyCode")
    );
  });

  it("renders practitionerFacilityNumber", () => {
    const practitionerFacilityNumber =
      wrapper.vm.$store.state.payPatientForm.practitionerFacilityNumber;
    expect(practitionerFacilityNumber).toBe(
      "defaultpractitionerFacilityNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultpractitionerFacilityNumber")
    );
  });
});

describe("ReviewTableList patient referredByData()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders referredByPractitionerNumber", () => {
    const referredByPractitionerNumber =
      wrapper.vm.$store.state.payPatientForm.referredByPractitionerNumber;
    expect(referredByPractitionerNumber).toBe(
      "defaultreferredByPractitionerNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredByPractitionerNumber")
    );
  });

  it("renders referredByLastName", () => {
    const referredByLastName =
      wrapper.vm.$store.state.payPatientForm.referredByLastName;
    expect(referredByLastName).toBe("defaultreferredByLastName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredByLastName")
    );
  });

  it("renders referredByFirstNameInitial", () => {
    const referredByFirstNameInitial =
      wrapper.vm.$store.state.payPatientForm.referredByFirstNameInitial;
    expect(referredByFirstNameInitial).toBe(
      "defaultreferredByFirstNameInitial"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredByFirstNameInitial")
    );
  });
});

describe("ReviewTableList patient referredToData()", () => {
  let store;
  let router;
  let wrapper;

  beforeEach(() => {
    store = createStore(storeTemplate);
    router = createRouter({
      history: createWebHistory(),
      routes: routeCollection,
    });
    wrapper = mount(Page, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("renders referredToPractitionerNumber", () => {
    const referredToPractitionerNumber =
      wrapper.vm.$store.state.payPatientForm.referredToPractitionerNumber;
    expect(referredToPractitionerNumber).toBe(
      "defaultreferredToPractitionerNumber"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredToPractitionerNumber")
    );
  });

  it("renders referredToLastName", () => {
    const referredToLastName =
      wrapper.vm.$store.state.payPatientForm.referredToLastName;
    expect(referredToLastName).toBe("defaultreferredToLastName");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredToLastName")
    );
  });

  it("renders referredToFirstNameInitial", () => {
    const referredToFirstNameInitial =
      wrapper.vm.$store.state.payPatientForm.referredToFirstNameInitial;
    expect(referredToFirstNameInitial).toBe(
      "defaultreferredToFirstNameInitial"
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultreferredToFirstNameInitial")
    );
  });
});

//isCSR() is weirdly difficult to test.
//Can't call the function directly because it relies on mounted variables
//Can't check the rendered output directly because it doesn't put text on the page
//Next best thing is to check the v-if code on the planReferenceNumberData ReviewTable, currently line 15
//So I did that in that test and skipped this specific test

//-------METHODS-------
describe("ReviewTableList patient navigateToClaimCountPage()", () => {
  let store;
  let wrapper;
  let mockRoute;
  let mockRouter;
  let spyOnRouter;

  beforeEach(() => {
    mockRoute = {
      path: "/potato",
    };
    mockRouter = {
      push: jest.fn(),
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
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = jest
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls router push", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-patient");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnSetPageComplete).toHaveBeenCalledWith("/pay-patient");
  });

  it("calls scrollTo", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewTableList patient navigateToClaimCountPage() (part 2 CSR)", () => {
  let store;
  let wrapper;
  let mockRoute;
  let mockRouter;
  let spyOnRouter;

  beforeEach(() => {
    mockRoute = {
      path: "/potato-csr",
    };
    mockRouter = {
      push: jest.fn(),
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
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = jest
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls router push", async () => {
    await wrapper.vm.$router.push("/potato-csr");
    await wrapper.vm.$nextTick;
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-patient-csr");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnSetPageComplete).toHaveBeenCalledWith("/pay-patient-csr");
  });

  it("calls scrollTo", () => {
    wrapper.vm.navigateToClaimCountPage();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewTableList patient navigateToMainFormPage(anchorName)", () => {
  let store;
  let wrapper;
  let mockRoute;
  let mockRouter;
  let spyOnRouter;

  const anchorName = "anchorName";

  beforeEach(() => {
    mockRoute = {
      path: "/potato",
    };
    mockRouter = {
      push: jest.fn(),
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
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = jest
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls router push", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-patient/main-form");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnSetPageComplete).toHaveBeenCalledWith("/pay-patient/main-form");
  });

  it("calls scrollToElement", async () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToElement).toHaveBeenCalled();
  });
});

describe("ReviewTableList patient navigateToMainFormPage(anchorName) (part 2 CSR)", () => {
  let store;
  let wrapper;
  let mockRoute;
  let mockRouter;
  let spyOnRouter;

  const anchorName = "anchorName";

  beforeEach(() => {
    mockRoute = {
      path: "/potato-csr",
    };
    mockRouter = {
      push: jest.fn(),
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
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
    spyOnRouter = jest
      .spyOn(mockRouter, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls router push", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnRouter).toHaveBeenCalledWith("/pay-patient-csr/main-form");
  });

  it("calls setPageComplete", () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    expect(spyOnSetPageComplete).toHaveBeenCalledWith(
      "/pay-patient-csr/main-form"
    );
  });

  it("calls scrollToElement", async () => {
    wrapper.vm.navigateToMainFormPage(anchorName);
    await wrapper.vm.$nextTick;
    expect(spyOnScrollToElement).toHaveBeenCalled();
  });
});

describe("ReviewTableList patient getMedicalServiceClaimTitle(index)", () => {
  let store;
  let wrapper;

  const mockRoute = {
    path: "/potato",
  };
  const mockRouter = {
    push: jest.fn(),
    currentRoute: {
      value: {
        path: "/potato",
      },
    },
  };

  it("returns 1", () => {
    store = createStore(storeTemplate);
    wrapper = mount(Page, {
      global: {
        plugins: [store],
        mocks: {
          $route: mockRoute,
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
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
    const result = wrapper.vm.getMedicalServiceClaimTitle(0);
    expect(result).toBe("Service (1 of 3)");
  });
});
