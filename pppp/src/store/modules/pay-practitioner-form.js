import dummyData from '@/store/states/pay-practitioner-form-dummy-data';
import settings from '@/settings';

export const MODULE_NAME = 'payPractitionerForm';

// Action names.
export const RESET_FORM = 'resetForm';
export const SET_APPLICATION_UUID = 'setApplicationUuid';
export const SET_CAPTCHA_TOKEN = 'setCaptchaToken';
export const SET_SUBMISSION_DATE = 'setSubmissionDate';
export const SET_REFERENCE_NUMBER = 'setReferenceNumber';

export const SET_MEDICAL_SERVICE_CLAIMS_COUNT = 'setMedicalServiceClaimsCount';
export const SET_HOSPITAL_VISIT_CLAIMS_COUNT = 'setHospitalVisitClaimsCount';

export const SET_PHN = 'setPhn';
export const SET_DEPENDENT_NUMBER = 'setDependentNumber';
export const SET_FIRST_NAME = 'setFirstName';
export const SET_MIDDLE_INITIAL = 'setMiddleInitial';
export const SET_LAST_NAME = 'setLastName';
export const SET_BIRTH_DATE = 'setBirthDate';

export const SET_IS_VEHICLE_ACCIDENT = 'setIsVehicleAccident';
export const SET_VEHICLE_ACCIDENT_CLAIM_NUMBER = 'setVehicleAccidentClaimNumber';
export const SET_CORRESPONDENCE_ATTACHED = 'setCorrespondenceAttached';
export const SET_SUBMISSION_CODE = 'setSubmissionCode';
export const SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM = 'setPlanReferenceNumberOfOriginalClaim';
export const SET_COVERAGE_PRE_AUTH_NUMBER = 'setCoveragePreAuthNumber';
export const SET_PROCEDURE_OR_OPERATION = 'setProcedureOrOperation';

export const SET_MEDICAL_SERVICE_CLAIMS = 'setMedicalServiceClaims';
export const SET_HOSPITAL_VISIT_CLAIMS = 'setHospitalVisitClaims';

export const SET_PRACTITIONER_LAST_NAME_OR_CLINIC_NAME = 'setPractitionerLastNameOrClinicName';
export const SET_PRACTITIONER_FIRST_NAME_INITIAL = 'setPractitionerFirstNameInitial';
export const SET_PRACTITIONER_PAYMENT_NUMBER = 'setPractitionerPaymentNumber';
export const SET_PRACTITIONER_PRACTITIONER_NUMBER = 'setPractitionerPractitionerNumber';
export const SET_PRACTITIONER_FACILITY_NUMBER = 'setPractitionerFacilityNumber';
export const SET_PRACTITIONER_SPECIALTY_CODE = 'setPractitionerSpecialtyCode';

export const SET_REFERRED_BY_LAST_NAME = 'setReferredByLastName';
export const SET_REFERRED_BY_FIRST_NAME_INITIAL = 'setReferredByFirstNameInitial';
export const SET_REFERRED_BY_PRACTITIONER_NUMBER = 'setReferredByPractitionerNumber';

export const SET_REFERRED_TO_LAST_NAME = 'setReferredToLastName';
export const SET_REFERRED_TO_FIRST_NAME_INITIAL = 'setReferredToFirstNameInitial';
export const SET_REFERRED_TO_PRACTITIONER_NUMBER = 'setReferredToPractitionerNumber';

export default {
  namespaced: true,
  state: () => {
    const state = {
      applicationUuid: null,
      captchaToken: null,
      submissionDate: null,
      referenceNumber: null,

      medicalServiceClaimsCount: null,
      hospitalVisitClaimsCount: null,

      phn: null,
      dependentNumber: null,
      firstName: null,
      middleInitial: null,
      lastName: null,
      birthDate: null,

      isVehicleAccident: null,
      vehicleAccidentClaimNumber: null,
      correspondenceAttached: null,
      submissionCode: null,
      planReferenceNumberOfOriginalClaim: null,
      coveragePreAuthNumber: null,
      procedureOrOperation: null,

      medicalServiceClaims: [],
      hospitalVisitClaims: [],

      practitionerLastNameOrClinicName: null,
      practitionerFirstNameInitial: null,
      practitionerPaymentNumber: null,
      practitionerPractitionerNumber: null,
      practitionerFacilityNumber: null,
      practitionerSpecialtyCode: null,

      referredByLastName: null,
      referredByFirstNameInitial: null,
      referredByPractitionerNumber: null,

      referredToLastName: null,
      referredToFirstNameInitial: null,
      referredToPractitionerNumber: null,
    };
    if (settings.useDummyData) {
      Object.assign(state, dummyData);
    }
    return state;
  },
  mutations: {
    setApplicationUuid(state, payload) {
      state.applicationUuid = payload;
    },
    setCaptchaToken(state, payload) {
      state.captchaToken = payload;
    },
    setSubmissionDate(state, payload) {
      state.submissionDate = payload;
    },
    setReferenceNumber(state, payload) {
      state.referenceNumber = payload;
    },
    setMedicalServiceClaimsCount(state, payload) {
      state.medicalServiceClaimsCount = payload;
    },
    setHospitalVisitClaimsCount(state, payload) {
      state.hospitalVisitClaimsCount = payload;
    },
    setPhn(state, payload) {
      state.phn = payload;
    },
    setDependentNumber(state, payload) {
      state.dependentNumber = payload;
    },
    setFirstName(state, payload) {
      state.firstName = payload;
    },
    setMiddleInitial(state, payload) {
      state.middleInitial = payload;
    },
    setLastName(state, payload) {
      state.lastName = payload;
    },
    setBirthDate(state, payload) {
      state.birthDate = payload;
    },
    setIsVehicleAccident(state, payload) {
      state.isVehicleAccident = payload;
    },
    setVehicleAccidentClaimNumber(state, payload) {
      state.vehicleAccidentClaimNumber = payload;
    },
    setCorrespondenceAttached(state, payload) {
      state.correspondenceAttached = payload;
    },
    setSubmissionCode(state, payload) {
      state.submissionCode = payload;
    },
    setPlanReferenceNumberOfOriginalClaim(state, payload) {
      state.planReferenceNumberOfOriginalClaim = payload;
    },
    setCoveragePreAuthNumber(state, payload) {
      state.coveragePreAuthNumber = payload;
    },
    setProcedureOrOperation(state, payload) {
      state.procedureOrOperation = payload;
    },
    setMedicalServiceClaims(state, payload) {
      state.medicalServiceClaims = payload;
    },
    setHospitalVisitClaims(state, payload) {
      state.hospitalVisitClaims = payload;
    },
    setPractitionerLastNameOrClinicName(state, payload) {
      state.practitionerLastNameOrClinicName = payload;
    },
    setPractitionerFirstNameInitial(state, payload) {
      state.practitionerFirstNameInitial = payload;
    },
    setPractitionerPaymentNumber(state, payload) {
      state.practitionerPaymentNumber = payload;
    },
    setPractitionerPractitionerNumber(state, payload) {
      state.practitionerPractitionerNumber = payload;
    },
    setPractitionerFacilityNumber(state, payload) {
      state.practitionerFacilityNumber = payload;
    },
    setPractitionerSpecialtyCode(state, payload) {
      state.practitionerSpecialtyCode = payload;
    },
    setReferredByLastName(state, payload) {
      state.referredByLastName = payload;
    },
    setReferredByFirstNameInitial(state, payload) {
      state.referredByFirstNameInitial = payload;
    },
    setReferredByPractitionerNumber(state, payload) {
      state.referredByPractitionerNumber = payload;
    },
    setReferredToLastName(state, payload) {
      state.referredToLastName = payload;
    },
    setReferredToFirstNameInitial(state, payload) {
      state.referredToFirstNameInitial = payload;
    },
    setReferredToPractitionerNumber(state, payload) {
      state.referredToPractitionerNumber = payload;
    },
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_APPLICATION_UUID, null);
      commit(SET_CAPTCHA_TOKEN, null);
      commit(SET_SUBMISSION_DATE, null);
      commit(SET_REFERENCE_NUMBER, null);

      commit(SET_MEDICAL_SERVICE_CLAIMS_COUNT, null);
      commit(SET_HOSPITAL_VISIT_CLAIMS_COUNT, null);

      commit(SET_PHN, null);
      commit(SET_DEPENDENT_NUMBER, null);
      commit(SET_FIRST_NAME, null);
      commit(SET_MIDDLE_INITIAL, null);
      commit(SET_LAST_NAME, null);
      commit(SET_BIRTH_DATE, null);

      commit(SET_IS_VEHICLE_ACCIDENT, null);
      commit(SET_VEHICLE_ACCIDENT_CLAIM_NUMBER, null);
      commit(SET_CORRESPONDENCE_ATTACHED, null);
      commit(SET_SUBMISSION_CODE, null);
      commit(SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM, null);
      commit(SET_COVERAGE_PRE_AUTH_NUMBER, null);
      commit(SET_PROCEDURE_OR_OPERATION, null);

      commit(SET_MEDICAL_SERVICE_CLAIMS, []);
      commit(SET_HOSPITAL_VISIT_CLAIMS, []);
      
      commit(SET_PRACTITIONER_LAST_NAME_OR_CLINIC_NAME, null);
      commit(SET_PRACTITIONER_FIRST_NAME_INITIAL, null);
      commit(SET_PRACTITIONER_PAYMENT_NUMBER, null);
      commit(SET_PRACTITIONER_PRACTITIONER_NUMBER, null);
      commit(SET_PRACTITIONER_SPECIALTY_CODE, null);
      
      commit(SET_REFERRED_BY_LAST_NAME, null);
      commit(SET_REFERRED_BY_FIRST_NAME_INITIAL, null);
      commit(SET_REFERRED_BY_PRACTITIONER_NUMBER, null);
      
      commit(SET_REFERRED_TO_LAST_NAME, null);
      commit(SET_REFERRED_TO_FIRST_NAME_INITIAL, null);
      commit(SET_REFERRED_TO_PRACTITIONER_NUMBER, null);
    },
    setApplicationUuid({ commit }, payload) {
      commit(SET_APPLICATION_UUID, payload);
    },
    setCaptchaToken({ commit }, payload) {
      commit(SET_CAPTCHA_TOKEN, payload);
    },
    setSubmissionDate({ commit }, payload) {
      commit(SET_SUBMISSION_DATE, payload);
    },
    setReferenceNumber({ commit }, payload) {
      commit(SET_REFERENCE_NUMBER, payload);
    },
    setMedicalServiceClaimsCount({ commit }, payload) {
      commit(SET_MEDICAL_SERVICE_CLAIMS_COUNT, payload);
    },
    setHospitalVisitClaimsCount({ commit }, payload) {
      commit(SET_HOSPITAL_VISIT_CLAIMS_COUNT, payload);
    },
    setPhn({ commit }, payload) {
      commit(SET_PHN, payload);
    },
    setDependentNumber({ commit }, payload) {
      commit(SET_DEPENDENT_NUMBER, payload);
    },
    setFirstName({ commit }, payload) {
      commit(SET_FIRST_NAME, payload);
    },
    setMiddleInitial({ commit }, payload) {
      commit(SET_MIDDLE_INITIAL, payload);
    },
    setLastName({ commit }, payload) {
      commit(SET_LAST_NAME, payload);
    },
    setBirthDate({ commit }, payload) {
      commit(SET_BIRTH_DATE, payload);
    },
    setIsVehicleAccident({ commit }, payload) {
      commit(SET_IS_VEHICLE_ACCIDENT, payload);
    },
    setVehicleAccidentClaimNumber({ commit }, payload) {
      commit(SET_VEHICLE_ACCIDENT_CLAIM_NUMBER, payload);
    },
    setCorrespondenceAttached({ commit }, payload) {
      commit(SET_CORRESPONDENCE_ATTACHED, payload);
    },
    setSubmissionCode({ commit }, payload) {
      commit(SET_SUBMISSION_CODE, payload);
    },
    setPlanReferenceNumberOfOriginalClaim({ commit }, payload) {
      commit(SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM, payload);
    },
    setCoveragePreAuthNumber({ commit }, payload) {
      commit(SET_COVERAGE_PRE_AUTH_NUMBER, payload);
    },
    setProcedureOrOperation({ commit }, payload) {
      commit(SET_PROCEDURE_OR_OPERATION, payload);
    },
    setMedicalServiceClaims({ commit }, payload) {
      commit(SET_MEDICAL_SERVICE_CLAIMS, payload);
    },
    setHospitalVisitClaims({ commit }, payload) {
      commit(SET_HOSPITAL_VISIT_CLAIMS, payload);
    },
    setPractitionerLastNameOrClinicName({ commit }, payload) {
      commit(SET_PRACTITIONER_LAST_NAME_OR_CLINIC_NAME, payload);
    },
    setPractitionerFirstNameInitial({ commit }, payload) {
      commit(SET_PRACTITIONER_FIRST_NAME_INITIAL, payload);
    },
    setPractitionerPaymentNumber({ commit }, payload) {
      commit(SET_PRACTITIONER_PAYMENT_NUMBER, payload);
    },
    setPractitionerPractitionerNumber({ commit }, payload) {
      commit(SET_PRACTITIONER_PRACTITIONER_NUMBER, payload);
    },
    setPractitionerFacilityNumber({ commit }, payload) {
      commit(SET_PRACTITIONER_FACILITY_NUMBER, payload);
    },
    setPractitionerSpecialtyCode({ commit }, payload) {
      commit(SET_PRACTITIONER_SPECIALTY_CODE, payload);
    },
    setReferredByLastName({ commit }, payload) {
      commit(SET_REFERRED_BY_LAST_NAME, payload);
    },
    setReferredByFirstNameInitial({ commit }, payload) {
      commit(SET_REFERRED_BY_FIRST_NAME_INITIAL, payload);
    },
    setReferredByPractitionerNumber({ commit }, payload) {
      commit(SET_REFERRED_BY_PRACTITIONER_NUMBER, payload);
    },
    setReferredToLastName({ commit }, payload) {
      commit(SET_REFERRED_TO_LAST_NAME, payload);
    },
    setReferredToFirstNameInitial({ commit }, payload) {
      commit(SET_REFERRED_TO_FIRST_NAME_INITIAL, payload);
    },
    setReferredToPractitionerNumber({ commit }, payload) {
      commit(SET_REFERRED_TO_PRACTITIONER_NUMBER, payload);
    },
  },
  getters: {}
};
