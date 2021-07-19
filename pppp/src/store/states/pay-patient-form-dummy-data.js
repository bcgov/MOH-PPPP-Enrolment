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
  vehicleAccidentClaimNumber: 'A0000001',
  correspondenceAttached: 'C',
  submissionCode: 'I',
  planReferenceNumberOfOriginalClaim: '321',
  diagnosisOrAreaOfTreatment: 'Chicken Pox',

  medicalServiceClaims: [
    {
      serviceDate: new Date(),
      numberOfServices: '1',
      serviceClarificationCode: '1C',
      feeItem: 'item',
      amountBilled: '1.00',
      calledStartTime: {
        hour: '08',
        minute: '01'
      },
      renderedFinishTime: {
        hour: '16',
        minute: '05'
      },
      diagnosticCode: 'DC',
      locationOfService: 'A',
      notes: 'Notes here.',
    }
  ],

  practitionerLastName: 'Doe',
  practitionerFirstName: 'J',
  practitionerPaymentNumber: 'A0001',
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
