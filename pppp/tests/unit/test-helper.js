import { cloneDeep } from "lodash";
import * as appModule from "@/store/modules/app";
import * as patientModule from "@/store/modules/pay-patient-form";
import * as pracModule from "@/store/modules/pay-practitioner-form";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";

//store template values are all empty/null
export const defaultStoreTemplate = {
  modules: {
    app: cloneDeep(appModule.default),
    payPatientForm: cloneDeep(patientModule.default),
    payPractitionerForm: cloneDeep(pracModule.default),
  },
};

//for situations where the route doesn't matter
export const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

//for when tests require switching between different routes
export const mockRouterCSR = {
  push: vi.fn(),
  currentRoute: {
    value: {
      path: "/foobar-csr",
    },
  },
};

export const mockRouter = {
  push: vi.fn(),
  currentRoute: {
    value: {
      path: "/foobar",
    },
  },
};

export const failingData = {
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
