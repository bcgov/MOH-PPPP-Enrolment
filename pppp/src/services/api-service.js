import axios from 'axios';

const BASE_API_PATH = '/pppp/api/';
const SUBMIT_PAY_PATIENT_APPLICATION_URL = BASE_API_PATH + 'ppppIntegration/payPatientSubmission';
const SUBMIT_PAY_PRACTITIONER_APPLICATION_URL = BASE_API_PATH + 'ppppIntegration/payPractitionerSubmission';
const VALIDATE_APPLICATION_URL = BASE_API_PATH + 'ppppIntegration/validateClaim';

class ApiService {
  validateApplication(token, jsonPayload) {
    return this._sendPostRequest(VALIDATE_APPLICATION_URL, token, jsonPayload);
  }

  submitPayPatientApplication(token, formState) {
    const jsonPayload = {...formState};
    return this._sendPostRequest(SUBMIT_PAY_PATIENT_APPLICATION_URL, token, jsonPayload);
  }

  submitPayPractitionerApplication(token, formState) {
    const jsonPayload = {...formState};
    return this._sendPostRequest(SUBMIT_PAY_PRACTITIONER_APPLICATION_URL, token, jsonPayload);
  }

  _sendPostRequest(url, token, jsonPayload) {
    const headers = this._getHeaders(token);
    return axios.post(url, jsonPayload, { headers });
  }

  _getHeaders(token) {
    return {
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization": "Bearer " + token
    }
  }
}

export default new ApiService();
