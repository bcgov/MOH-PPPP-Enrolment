import dummyData from '@/store/states/pay-patient-form-dummy-data';
import settings from '@/settings';

export const MODULE_NAME = 'payPatientForm';

// Action names.
export const RESET_FORM = 'resetForm';
export const SET_APPLICATION_UUID = 'setApplicationUuid';
export const SET_CAPTCHA_TOKEN = 'setCaptchaToken';
export const SET_SUBMISSION_DATE = 'setSubmissionDate';
export const SET_REFERENCE_NUMBER = 'setReferenceNumber';

export const SET_CLAIM_COUNT = 'setClaimCount';

export const SET_PHN = 'setPhn';
export const SET_DEPENDENT_NUMBER = 'setDependentNumber';
export const SET_FIRST_NAME = 'setFirstName';
export const SET_MIDDLE_INITIAL = 'setMiddleInitial';
export const SET_LAST_NAME = 'setLastName';
export const SET_BIRTH_DATE = 'setBirthDate';

export const SET_ADDRESS_OWNER = 'setAddressOwner';
export const SET_UNIT_NUMBER = 'setUnitNumber';
export const SET_STREET_NUMBER = 'setStreetNumber';
export const SET_STREET_NAME = 'setStreetName';
export const SET_CITY = 'setCity';
export const SET_POSTAL_CODE = 'setPostalCode';

export default {
  namespaced: true,
  state: () => {
    const state = {
      applicationUuid: null,
      captchaToken: null,
      submissionDate: null,
      referenceNumber: null,

      claimCount: null,

      phn: null,
      dependentNumber: null,
      firstName: null,
      middleInitial: null,
      lastName: null,
      birthDate: null,

      addressOwner: null,
      unitNumber: null,
      streetNumber: null,
      streetName: null,
      city: null,
      postalCode: null,
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
    setClaimCount(state, payload) {
      state.claimCount = payload;
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
    setAddressOwner(state, payload) {
      state.addressOwner = payload;
    },
    setUnitNumber(state, payload) {
      state.unitNumber = payload;
    },
    setStreetNumber(state, payload) {
      state.streetNumber = payload;
    },
    setStreetName(state, payload) {
      state.streetName = payload;
    },
    setCity(state, payload) {
      state.city = payload;
    },
    setPostalCode(state, payload) {
      state.postalCode = payload;
    },
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_APPLICATION_UUID, null);
      commit(SET_CAPTCHA_TOKEN, null);
      commit(SET_SUBMISSION_DATE, null);
      commit(SET_REFERENCE_NUMBER, null);

      commit(SET_CLAIM_COUNT, null);

      commit(SET_PHN, null);
      commit(SET_DEPENDENT_NUMBER, null);
      commit(SET_FIRST_NAME, null);
      commit(SET_MIDDLE_INITIAL, null);
      commit(SET_LAST_NAME, null);
      commit(SET_BIRTH_DATE, null);

      commit(SET_ADDRESS_OWNER, null);
      commit(SET_UNIT_NUMBER, null);
      commit(SET_STREET_NUMBER, null);
      commit(SET_STREET_NAME, null);
      commit(SET_CITY, null);
      commit(SET_POSTAL_CODE, null);
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
    setClaimCount({ commit }, payload) {
      commit(SET_CLAIM_COUNT, payload);
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
    setAddressOwner({ commit }, payload) {
      commit(SET_ADDRESS_OWNER, payload);
    },
    setUnitNumber({ commit }, payload) {
      commit(SET_UNIT_NUMBER, payload);
    },
    setStreetNumber({ commit }, payload) {
      commit(SET_STREET_NUMBER, payload);
    },
    setStreetName({ commit }, payload) {
      commit(SET_STREET_NAME, payload);
    },
    setCity({ commit }, payload) {
      commit(SET_CITY, payload);
    },
    setPostalCode({ commit }, payload) {
      commit(SET_POSTAL_CODE, payload);
    },
  },
  getters: {}
};
