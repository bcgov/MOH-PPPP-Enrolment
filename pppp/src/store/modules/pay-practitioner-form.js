import dummyData from '@/store/states/pay-practitioner-form-dummy-data';
import settings from '@/settings';

export const MODULE_NAME = 'payPractitionerForm';

// Action names.
export const RESET_FORM = 'resetForm';
export const SET_APPLICATION_UUID = 'setApplicationUuid';
export const SET_CAPTCHA_TOKEN = 'setCaptchaToken';
export const SET_SUBMISSION_DATE = 'setSubmissionDate';
export const SET_REFERENCE_NUMBER = 'setReferenceNumber';

export const SET_CLAIM_COUNT = 'setClaimCount';

export default {
  namespaced: true,
  state: () => {
    const state = {
      applicationUuid: null,
      captchaToken: null,
      submissionDate: null,
      referenceNumber: null,

      claimCount: null,
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
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_APPLICATION_UUID, null);
      commit(SET_CAPTCHA_TOKEN, null);
      commit(SET_SUBMISSION_DATE, null);
      commit(SET_REFERENCE_NUMBER, null);

      commit(SET_CLAIM_COUNT, null);
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
  },
  getters: {}
};
