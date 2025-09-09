import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { formatISODate, stripSpaces } from "common-lib-vue";
import { isCSR } from "@/helpers/url";

const BASE_API_PATH = "/pppp/api/";
const SUBMIT_PAY_PATIENT_APPLICATION_URL = BASE_API_PATH + "payformsIntegration/patient";
const SUBMIT_PAY_PRACTITIONER_APPLICATION_URL = BASE_API_PATH + "payformsIntegration/practitioner";
const VALIDATE_APPLICATION_URL = BASE_API_PATH + "payformsIntegration/validateClaim";

class ApiService {
  validateApplication(token, jsonPayload) {
    const applicationUuid = jsonPayload.applicationUuid;
    jsonPayload.requestUuid = uuidv4();
    return this._sendPostRequest(
      `${VALIDATE_APPLICATION_URL}/${applicationUuid}`,
      token,
      jsonPayload
    );
  }

  filterSpecialChar(value) {
    // eslint says there are unnecessary escapes a few lines from now.
    // this is false. the escapes change the way the regex works and are important
    // eslint-disable-next-line
    const criteria = /[0-9a-zA-Z!@#\$%&\*\(\)\-_\+=\{\}\[\]\|:;'<>,\.\?\/~` ]/;
    let resultArray = [];

    if (!value || !value.length) {
      return value;
    }

    for (let i = 0; i < value.length; i++) {
      const subResult = criteria.test(value[i]);
      if (subResult) {
        resultArray.push(value[i]);
      }
    }
    const resultJoin = resultArray.join("");
    return resultJoin;
  }

  submitPayPatientApplication(token, formState) {
    const applicationUuid = formState.applicationUuid;
    const jsonPayload = {
      applicationUuid: applicationUuid,
      requestUuid: uuidv4(),
      submissionDate: formatISODate(formState.submissionDate) || "",
      isCSR: isCSR(window.location.pathname) ? "Y" : "N",
      payPatient: {
        claimCount: formState.claimCount,
        planReferenceNumber: formState.planReferenceNumber || "",
        phn: stripSpaces(formState.phn) || "",
        dependentNumber: formState.dependentNumber || "",
        firstName: formState.firstName || "",
        middleInitial: formState.middleInitial || "",
        lastName: formState.lastName || "",
        birthDate: formatISODate(formState.birthDate) || "",
        addressOwner: formState.addressOwner || "",
        unitNumber: this.filterSpecialChar(formState.unitNumber) || "",
        streetNumber: this.filterSpecialChar(formState.streetNumber) || "",
        streetName: this.filterSpecialChar(formState.streetName) || "",
        city: this.filterSpecialChar(formState.city) || "",
        postalCode: stripSpaces(formState.postalCode) || "",
        isVehicleAccident: formState.isVehicleAccident || "",
        vehicleAccidentClaimNumber: formState.vehicleAccidentClaimNumber || "",
        planReferenceNumberOfOriginalClaim: formState.planReferenceNumberOfOriginalClaim || "",
        medicalServiceClaims: [],
        practitionerLastName: formState.practitionerLastName || "",
        practitionerFirstName: formState.practitionerFirstName || "",
        practitionerPaymentNumber: formState.practitionerPaymentNumber || "",
        practitionerPractitionerNumber: formState.practitionerPractitionerNumber || "",
        practitionerFacilityNumber: formState.practitionerFacilityNumber || "",
        practitionerSpecialtyCode: formState.practitionerSpecialtyCode || "",
        referredByFirstNameInitial: formState.referredByFirstNameInitial || "",
        referredByLastName: formState.referredByLastName || "",
        referredByPractitionerNumber: formState.referredByPractitionerNumber || "",
        referredToFirstNameInitial: formState.referredToFirstNameInitial || "",
        referredToLastName: formState.referredToLastName || "",
        referredToPractitionerNumber: formState.referredToPractitionerNumber || "",
      },
    };
    for (let i = 0; i < formState.medicalServiceClaims.length; i++) {
      const claim = formState.medicalServiceClaims[i];
      jsonPayload.payPatient.medicalServiceClaims.push({
        serviceDate: formatISODate(claim.serviceDate) || "",
        numberOfServices: claim.numberOfServices || "",
        serviceClarificationCode: claim.serviceClarificationCode || "",
        feeItem: claim.feeItem || "",
        amountBilled: claim.amountBilled || "",
        calledStartTime:
          claim.calledStartTime && claim.calledStartTime.time ? claim.calledStartTime.time : "",
        renderedFinishTime:
          claim.renderedFinishTime && claim.renderedFinishTime.time
            ? claim.renderedFinishTime.time
            : "",
        diagnosticCode: claim.diagnosticCode || "",
        locationOfService: claim.locationOfService || "",
        correspondenceAttached: claim.correspondenceAttached || "",
        submissionCode: claim.submissionCode || "",
        notes: this.filterSpecialChar(claim.notes) || "",
      });
    }
    return this._sendPostRequest(
      `${SUBMIT_PAY_PATIENT_APPLICATION_URL}/${applicationUuid}`,
      token,
      jsonPayload
    );
  }

  submitPayPractitionerApplication(token, formState) {
    const applicationUuid = formState.applicationUuid;
    const jsonPayload = {
      applicationUuid: applicationUuid,
      requestUuid: uuidv4(),
      submissionDate: formatISODate(formState.submissionDate) || "",
      isCSR: isCSR(window.location.pathname) ? "Y" : "N",
      payPractitioner: {
        medicalServiceClaimsCount: formState.medicalServiceClaimsCount,
        hospitalVisitClaimsCount: formState.hospitalVisitClaimsCount,
        planReferenceNumber: formState.planReferenceNumber || "",
        phn: stripSpaces(formState.phn) || "",
        dependentNumber: formState.dependentNumber || "",
        firstName: formState.firstName || "",
        middleInitial: formState.middleInitial || "",
        lastName: formState.lastName || "",
        birthDate: formatISODate(formState.birthDate) || "",
        isVehicleAccident: formState.isVehicleAccident || "",
        vehicleAccidentClaimNumber: formState.vehicleAccidentClaimNumber || "",
        planReferenceNumberOfOriginalClaim: formState.planReferenceNumberOfOriginalClaim || "",
        coveragePreAuthNumber: formState.coveragePreAuthNumber || "",
        medicalServiceClaims: [],
        hospitalVisitClaims: [],
        practitionerLastName: formState.practitionerLastName || "",
        practitionerFirstName: formState.practitionerFirstName || "",
        practitionerPaymentNumber: formState.practitionerPaymentNumber || "",
        practitionerPractitionerNumber: formState.practitionerPractitionerNumber || "",
        practitionerFacilityNumber: formState.practitionerFacilityNumber || "",
        practitionerSpecialtyCode: formState.practitionerSpecialtyCode || "",
        referredByFirstNameInitial: formState.referredByFirstNameInitial || "",
        referredByLastName: formState.referredByLastName || "",
        referredByPractitionerNumber: formState.referredByPractitionerNumber || "",
        referredToFirstNameInitial: formState.referredToFirstNameInitial || "",
        referredToLastName: formState.referredToLastName || "",
        referredToPractitionerNumber: formState.referredToPractitionerNumber || "",
      },
    };
    for (let i = 0; i < formState.medicalServiceClaims.length; i++) {
      const claim = formState.medicalServiceClaims[i];
      jsonPayload.payPractitioner.medicalServiceClaims.push({
        serviceDate: formatISODate(claim.serviceDate) || "",
        numberOfServices: claim.numberOfServices || "",
        serviceClarificationCode: claim.serviceClarificationCode || "",
        feeItem: claim.feeItem || "",
        amountBilled: claim.amountBilled || "",
        calledStartTime:
          claim.calledStartTime && claim.calledStartTime.time ? claim.calledStartTime.time : "",
        renderedFinishTime:
          claim.renderedFinishTime && claim.renderedFinishTime.time
            ? claim.renderedFinishTime.time
            : "",
        diagnosticCode: claim.diagnosticCode || "",
        locationOfService: claim.locationOfService || "",
        correspondenceAttached: claim.correspondenceAttached || "",
        submissionCode: claim.submissionCode || "",
        notes: this.filterSpecialChar(claim.notes) || "",
      });
    }
    for (let i = 0; i < formState.hospitalVisitClaims.length; i++) {
      const claim = formState.hospitalVisitClaims[i];
      jsonPayload.payPractitioner.hospitalVisitClaims.push({
        month: claim.month || "",
        dayFrom: claim.dayFrom || "",
        dayTo: claim.dayTo || "",
        year: claim.year || "",
        numberOfServices: claim.numberOfServices || "",
        serviceClarificationCode: claim.serviceClarificationCode || "",
        feeItem: claim.feeItem || "",
        amountBilled: claim.amountBilled || "",
        diagnosticCode: claim.diagnosticCode || "",
        locationOfService: claim.locationOfService || "",
        correspondenceAttached: claim.correspondenceAttached || "",
        submissionCode: claim.submissionCode || "",
        notes: this.filterSpecialChar(claim.notes) || "",
      });
    }
    return this._sendPostRequest(
      `${SUBMIT_PAY_PRACTITIONER_APPLICATION_URL}/${applicationUuid}`,
      token,
      jsonPayload
    );
  }

  _sendPostRequest(url, token, jsonPayload) {
    const headers = this._getHeaders(token);
    return axios.post(url, jsonPayload, { headers });
  }

  _getHeaders(token) {
    return {
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization": "Bearer " + token,
    };
  }
}

export default new ApiService();
