export default {
  claimCount: '1',
  
  phn: '9999 999 998',
  dependentNumber: '66',
  firstName: 'Bob',
  middleInitial: 'H',
  lastName: 'Smith',
  birthDate: new Date('2000-01-01'),

  addressOwner: 'PATIENT',
  unitNumber: '123',
  streetNumber: '321',
  streetName: 'Fake St.',
  city: 'Victoria',
  postalCode: 'V8V 8V8',

  isVehicleAccident: 'Y',
  vehicleAccidentClaimNumber: '1',
  correspondenceAttached: 'Yes',
  submissionCode: '123',
  planReferenceNumberOfOriginalClaim: '321',
  diagnosisOrAreaOfTreatment: 'Chicken Pox',

  medicalServiceClaims: [
    {
      serviceDate: new Date(),
      numberOfServices: '1',
      serviceClarificationCode: '1C',
      feeItem: 'item',
      amountBilled: '1.00',
      calledStartTime: '08:00',
      renderedFinishTime: '16:00',
      diagnosticCode: 'DC',
      locationOfService: 'A',
      notes: 'Notes here.',
    }
  ],

  practitionerLastNameOrClinicName: 'Doe',
  practitionerFirstNameInitial: 'J',
  practitionerPaymentNumber: 'A0001',
  practitionerPractitionerNumber: '22274',
  practitionerFacilityNumber: '12345',
  practitionerSpecialtyCode: '321',

  referredByLastName: 'McDonald',
  referredByFirstNameInitial: 'R',
  referredByPractitionerNumber: '22271',

  referredToLastName: 'Lee',
  referredToFirstNameInitial: 'C',
  referredToPractitionerNumber: '22272',
};
