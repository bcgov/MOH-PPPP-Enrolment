export const MODULE_NAME = 'app';

export const SET_SHOW_MOBILE_STEPPER_DETAILS = 'setShowMobileStepperDetails';
export const SET_IS_MODAL_OPEN = 'setIsModalOpen';

export default {
  namespaced: true,
  state: () => {
    const state = {
      showMobileStepperDetails: false,
      isModalOpen: false,
    };
    return state;
  },
  mutations: {
    [SET_SHOW_MOBILE_STEPPER_DETAILS](state, payload) {
      state.showMobileStepperDetails = payload;
    },
    [SET_IS_MODAL_OPEN](state, payload) {
      state.isModalOpen = payload;
    }
  },
  actions: {
    [SET_SHOW_MOBILE_STEPPER_DETAILS]({ commit }, payload) {
      commit(SET_SHOW_MOBILE_STEPPER_DETAILS, payload);
    },
    [SET_IS_MODAL_OPEN]({ commit }, payload) {
      commit(SET_IS_MODAL_OPEN, payload);
    }
  },
  getters: {}
};
