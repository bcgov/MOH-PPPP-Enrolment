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
  vehicleAccidentClaimNumber: '1',
  correspondenceAttached: 'Yes',
  submissionCode: '123',
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
      calledStartTime: '08:00',
      renderedFinishTime: '16:00',
      diagnosticCode: 'DC',
      locationOfService: 'Hospital',
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
      locationOfService: 'Hospital',
      notes: 'Notes here.',
    }
  ],

  practitionerLastNameOrClinicName: 'Doe',
  practitionerFirstNameInitial: 'J',
  practitionerPaymentNumber: 'A1234',
  practitionerPractitionerNumber: '22274',
  practitionerFacilityNumber: '12345',
  practitionerSpecialtyCode: 'A1',

  referredByLastName: 'McDonald',
  referredByFirstNameInitial: 'R',
  referredByPractitionerNumber: '22271',

  referredToLastName: 'Lee',
  referredToFirstNameInitial: 'C',
  referredToPractitionerNumber: '22272',
};
