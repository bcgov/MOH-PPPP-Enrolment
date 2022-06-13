import { createStore } from 'vuex';
import app from './modules/app';
import payPatientForm from './modules/pay-patient-form';
import payPractitionerForm from './modules/pay-practitioner-form';

export default createStore({
  modules: {
    app,
    payPatientForm,
    payPractitionerForm,
  }
});
