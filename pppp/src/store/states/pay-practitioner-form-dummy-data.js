export default {
  medicalServiceClaimsCount: '1',
  hospitalVisitClaimsCount: '1',

  phn: '9999 999 998',
  dependentNumber: '66',
  firstName: 'Bob',
  middleInitial: 'H',
  lastName: 'Smith',
  birthDate: new Date(),

  isVehicleAccident: 'Y',
  vehicleAccidentClaimNumber: 'A0000001',
  planReferenceNumberOfOriginalClaim: '321',
  coveragePreAuthNumber: '22',
  procedureOrOperation: 'Triple bypass',

  medicalServiceClaims: [
    {
      serviceDate: new Date(),
      numberOfServices: '1',
      serviceClarificationCode: 'A1',
      feeItem: '03333',
      amountBilled: '0.00',
      calledStartTime: {
        hour: '08',
        minute: '08'
      },
      renderedFinishTime: {
        hour: '16',
        minute: '06'
      },
      diagnosticCode: 'DC',
      locationOfService: 'A',
      correspondenceAttached: 'C',
      submissionCode: 'I',
      notes: 'Notes here.',
    }
  ],
  
  hospitalVisitClaims: [
    {
      month: '12',
      dayFrom: '24',
      dayTo: '26',
      year: '2020',
      numberOfServices: '1',
      serviceClarificationCode: 'A1',
      feeItem: '03333',
      amountBilled: '0.00',
      diagnosticCode: 'DC',
      locationOfService: 'A',
      correspondenceAttached: 'C',
      submissionCode: 'I',
      notes: 'Notes here.',
    }
  ],

  practitionerLastName: 'Doe',
  practitionerFirstName: 'J',
  practitionerPaymentNumber: 'A1234',
  practitionerPractitionerNumber: '22274',
  practitionerFacilityNumber: '12345',
  practitionerSpecialtyCode: 'A1',

  referredByFirstName: 'R',
  referredByLastName: 'McDonald',
  referredByPractitionerNumber: '22271',

  referredToFirstName: 'C',
  referredToLastName: 'Lee',
  referredToPractitionerNumber: '22272',
};
