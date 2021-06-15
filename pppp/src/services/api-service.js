import axios from 'axios';

const BASE_API_PATH = '/pppp/api/';
const SUBMIT_PAY_PATIENT_APPLICATION_URL = BASE_API_PATH + 'ppppIntegration/payPatientSubmission';
const SUBMIT_PAY_PRACTITIONER_APPLICATION_URL = BASE_API_PATH + 'ppppIntegration/payPractitionerSubmission';

class ApiService {
  submitPayPatientApplication(token, formState) {
    const jsonPayload = {...formState};
    const headers = this.getHeaders(token);
    return axios.post(SUBMIT_PAY_PATIENT_APPLICATION_URL, jsonPayload, { headers });
  }

  submitPayPractitionerApplication(token, formState) {
    const jsonPayload = {...formState};
    const headers = this.getHeaders(token);
    return axios.post(SUBMIT_PAY_PRACTITIONER_APPLICATION_URL, jsonPayload, { headers });
  }

  getHeaders(token) {
    return {
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization": "Bearer " + token
    }
  }
}

export default new ApiService();
