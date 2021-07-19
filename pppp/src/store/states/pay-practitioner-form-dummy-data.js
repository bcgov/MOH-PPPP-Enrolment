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
  correspondenceAttached: 'C',
  submissionCode: 'I',
  planReferenceNumberOfOriginalClaim: '321',
  coveragePreAuthNumber: '22',
  procedureOrOperation: 'Triple bypass',

  medicalServiceClaims: [
    {
      serviceDate: new Date(),
      numberOfServices: '1',
      serviceClarificationCode: '1C',
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
      serviceClarificationCode: '1C',
      feeItem: '03333',
      amountBilled: '0.00',
      diagnosticCode: 'DC',
      locationOfService: 'A',
      notes: 'Notes here.',
    }
  ],

  practitionerLastName: 'Doe',
  practitionerFirstName: 'J',
  practitionerPaymentNumber: 'A1234',
  practitionerPractitionerNumber: '22274',
  practitionerFacilityNumber: '12345',
  practitionerSpecialtyCode: 'A1',

  referredByLastName: 'McDonald',
  referredByFirstName: 'R',
  referredByPractitionerNumber: '22271',

  referredToLastName: 'Lee',
  referredToFirstName: 'C',
  referredToPractitionerNumber: '22272',
};
