import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Page from "@/components/pay-patient/ReviewTableList.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../src/store/modules/app";
import * as module2 from "../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../src/store/modules/pay-practitioner-form";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

const storeTemplate = {
  modules: {
    app: cloneDeep(module1),
    payPatientForm: cloneDeep(module2),
    payPractitionerForm: cloneDeep(module3),
  },
};

const patientState = {
  medicalServiceClaims: ["1", "2", "3"],
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
};
storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

describe("ReviewTableList patient", () => {
  it("renders", () => {
    const store = new Vuex.Store(storeTemplate);
    const wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/",
          },
        },
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
    const result = wrapper.vm.$store.state.payPatientForm.planReferenceNumber;
    expect(result).toBe("defaultReferenceNumber");
    expect(wrapper.text()).toEqual(
      expect.stringContaining("defaultReferenceNumber")
    );
  });

  it("does not render plan reference number when path is NOT CSR", () => {
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
            path: "/potato",
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

  it("renders addressOwner", () => {
    console.log("avocado", wrapper.text());
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
