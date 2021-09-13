<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <div class="row align-items-end">
          <div class="col-md-7">
            <h1>Pay Patient Claim</h1>
          </div>
          <div class="col-md-5">
            <p class="text-right"><span class="required-asterisk">*</span> Required Information</p>
          </div>
        </div>
        <hr class="mt-0"/>

        <div v-if='isCSR'
            class="section-container p-3 mb-5">
          <a name='plan-reference-number'></a>
          <DigitInput label='Plan Reference Number:'
                id='plan-reference-number'
                v-model='planReferenceNumber'
                maxlength='10'
                :isRequiredAsteriskShown='true'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.planReferenceNumber)' />
          <div class="text-danger"
              v-if="$v.planReferenceNumber.$dirty && !$v.planReferenceNumber.required"
              aria-live="assertive">Plan Reference Number is required.</div>
          <div class="text-danger"
              v-if="$v.planReferenceNumber.$dirty && $v.planReferenceNumber.required &&!$v.planReferenceNumber.intValidator"
              aria-live="assertive">Plan Reference Number must be an integer.</div>
          <div class="text-danger"
              v-if="$v.planReferenceNumber.$dirty && $v.planReferenceNumber.required && !$v.planReferenceNumber.positiveNumberValidator"
              aria-live="assertive">Plan Reference Number must be a positive number.</div>
          <div class="text-danger"
              v-if="$v.planReferenceNumber.$dirty && $v.planReferenceNumber.required && !$v.planReferenceNumber.minLength"
              aria-live="assertive">Plan Reference Number must be 10 digits long.</div>
        </div>

        <a name='patient'></a>
        <h2>Patient Information</h2>
        <div class="section-container p-3">
          <PhnInput label='Personal Health Number (PHN):'
                id='phn'
                v-model='phn'
                :isRequiredAsteriskShown='true'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.phn)' />
          <div class="text-danger"
              v-if="$v.phn.$dirty && !$v.phn.required"
              aria-live="assertive">Personal Health Number (PHN) is required.</div>
          <div class="text-danger"
              v-if="$v.phn.$dirty && $v.phn.required && !$v.phn.phnValidator"
              aria-live="assertive">Personal Health Number (PHN) must be valid.</div>
          <DigitInput label='Dependant:'
                id='dependent-number'
                className='mt-3'
                v-model='dependentNumber'
                maxlength='2'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField($v.dependentNumber)' />
          <div class="text-danger"
              v-if="$v.dependentNumber.$dirty && !$v.dependentNumber.intValidator"
              aria-live="assertive">Dependant must be an integer.</div>
          <div class="text-danger"
              v-if="$v.dependentNumber.$dirty && !$v.dependentNumber.positiveNumberValidator"
              aria-live="assertive">Dependant must be a positive number.</div>
          <div class="text-danger"
              v-if="$v.dependentNumber.$dirty && $v.dependentNumber.intValidator && $v.dependentNumber.positiveNumberValidator && !$v.dependentNumber.dependentNumberValidator"
              aria-live="assertive">Dependant must be 00 or 66 for this PHN.</div>
          <Input label='Patient Legal First Name:'
                id='first-name'
                className='mt-3'
                v-model='firstName'
                maxlength='12'
                :isRequiredAsteriskShown='true'
                :inputStyle='mediumStyles'
                @blur='handleBlurField($v.firstName)' />
          <div class="text-danger"
              v-if="$v.firstName.$dirty && !$v.firstName.required"
              aria-live="assertive">Patient Legal First Name is required.</div>
          <div class="text-danger"
              v-if="$v.firstName.$dirty && $v.firstName.required && !$v.firstName.nameValidator"
              aria-live="assertive">Patient Legal First Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <Input label='Second Name Initial:'
                id='middle-initial'
                className='mt-3'
                v-model='middleInitial'
                maxlength='1'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField($v.middleInitial)' />
          <div class="text-danger"
              v-if="$v.middleInitial.$dirty && !$v.middleInitial.nameInitialValidator"
              aria-live="assertive">Second name initial must be a letter.</div>
          <Input label='Patient Legal Last Name:'
                id='last-name'
                className='mt-3'
                v-model='lastName'
                maxlength='18'
                :isRequiredAsteriskShown='true'
                :inputStyle='mediumStyles'
                @blur='handleBlurField($v.lastName)' />
          <div class="text-danger"
              v-if="$v.lastName.$dirty && !$v.lastName.required"
              aria-live="assertive">Patient Legal Last Name is required.</div>
          <div class="text-danger"
              v-if="$v.lastName.$dirty && $v.lastName.required && !$v.lastName.nameValidator"
              aria-live="assertive">Patient Legal Last Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <DateInput label='Patient Birth Date:'
                id='birth-date'
                className='mt-3'
                v-model='birthDate'
                :isRequiredAsteriskShown="dependentNumber !== '66'"
                @blur='handleBlurField($v.birthDate)'
                @processDate='handleProcessBirthDate($event)' />
          <div class="text-danger"
              v-if="$v.birthDate.$dirty && !$v.birthDate.birthDateValidator"
              aria-live="assertive">Patient Birth Date must be valid.</div>
          <div class="text-danger"
              v-if="$v.birthDate.$dirty
                && $v.birthDate.birthDateValidator
                && !$v.birthDate.distantPastValidator"
              aria-live="assertive">Patient Birth Date must be valid.</div>
          <div class="text-danger"
              v-if="$v.birthDate.$dirty
                && dependentNumber !== '66'
                && $v.birthDate.birthDateValidator
                && !$v.birthDate.required"
              aria-live="assertive">Patient Birth Date is required.</div>
          <div class="text-danger"
              v-if="$v.birthDate.$dirty && !$v.birthDate.birthDatePastValidator"
              aria-live="assertive">Patient Birth Date cannot be in the future.</div>
        </div>
        
        <a name='vehicle-accident'></a>
        <div class="section-container p-3 mt-5">
          <Radio label='Is this claim related to a motor vehicle accident?'
                v-model='isVehicleAccident'
                :items='isVehicleAccidentOptions'
                :isRequiredAsteriskShown='true'
                @blur='handleBlurField($v.isVehicleAccident)' />
          <div class="text-danger"
              v-if="$v.isVehicleAccident.$dirty && !$v.isVehicleAccident.required"
              aria-live="assertive">This field is required.</div>
          <MotorVehicleAccidentClaimNumberInput
                label='Motor Vehicle Accident Claim Number:'
                id='vehicle-accident-claim-number'
                class='mt-3'
                v-model='vehicleAccidentClaimNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.vehicleAccidentClaimNumber)' />
          <div class="text-danger"
              v-if="$v.vehicleAccidentClaimNumber.$dirty && !$v.vehicleAccidentClaimNumber.motorVehicleAccidentClaimNumberValidator"
              aria-live="assertive">Motor Vehicle Accident Claim Number must be valid.</div>
        </div> 

        <a name='claim-info'></a>
        <div class="section-container p-3 mt-5">
          <DigitInput label='Plan Reference Number of Original Claim:'
                id='plan-reference-number-of-original-claim'
                v-model='planReferenceNumberOfOriginalClaim'
                maxlength='10'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.planReferenceNumberOfOriginalClaim)'/>
          <div class="text-danger"
              v-if="$v.planReferenceNumberOfOriginalClaim.$dirty && !$v.planReferenceNumberOfOriginalClaim.intValidator"
              aria-live="assertive">Plan Reference Number of Original Claim must be an integer.</div>
          <div class="text-danger"
              v-if="$v.planReferenceNumberOfOriginalClaim.$dirty && !$v.planReferenceNumberOfOriginalClaim.positiveNumberValidator"
              aria-live="assertive">Plan Reference Number of Original Claim must be a positive number.</div>
        </div>

        <div v-for="(claim, index) in medicalServiceClaims"
            :key="index"
            :set="v = $v.medicalServiceClaims.$each[index]">
          <a :name='"medical-service-claim-" + index'></a>
          <h2 class="mt-5">{{getMedicalServiceClaimTitle(index)}}</h2>
          <div class="section-container p-3">
            <DateInput label='Service Date:'
                      :id="'service-date' + index"
                      v-model='claim.serviceDate'
                      :isRequiredAsteriskShown='true'
                      @blur='handleBlurField($v.medicalServiceClaims.$each[index].serviceDate)'
                      @processDate='handleProcessServiceDate($event, index)' />
            <div class="text-danger"
                v-if="v.serviceDate.$dirty && !v.serviceDate.serviceDateValidator"
                aria-live="assertive">Service Date must be a valid date.</div>
            <div class="text-danger"
                v-if="v.serviceDate.$dirty
                  && v.serviceDate.serviceDateValidator
                  && !v.serviceDate.required"
                aria-live="assertive">Service Date is required.</div>
            <div class="text-danger"
                v-if="v.serviceDate.$dirty
                  && v.serviceDate.required
                  && !v.serviceDate.serviceDateFutureValidator"
                aria-live="assertive">{{getServiceDateFutureErrorMessage(claim.feeItem)}}</div>
            <div class="text-danger"
                v-if="v.serviceDate.$dirty
                  && v.serviceDate.required
                  && v.serviceDate.serviceDateFutureValidator
                  && !v.serviceDate.distantPastValidator"
                aria-live="assertive">Service Date is too far in the past.</div>
            <DigitInput label='Number of Services:'
                  :id='"number-of-services-" + index'
                  class='mt-3'
                  v-model='claim.numberOfServices'
                  maxlength='2'
                  :isRequiredAsteriskShown='true'
                  :inputStyle='extraSmallStyles'
                  @blur='handleBlurField($v.medicalServiceClaims.$each[index].numberOfServices)' />
            <div class="text-danger"
                v-if="v.numberOfServices.$dirty && !v.numberOfServices.required"
                aria-live="assertive">Number of Services is required.</div>
            <div class="text-danger"
                v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.intValidator"
                aria-live="assertive">Number of Services must be an integer.</div>
            <div class="text-danger"
                v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.positiveNumberValidator"
                aria-live="assertive">Number of Services must be greater than 0.</div>
            <div class="text-danger"
                v-if="v.numberOfServices.$dirty
                  && v.numberOfServices.required
                  && v.numberOfServices.positiveNumberValidator
                  && !v.numberOfServices.nonZeroNumberValidator"
                aria-live="assertive">Number of Services must be greater than 0.</div>
                 
            <Input label='Service Clarification Code:'
                  :id='"service-clarification-code-" + index'
                  class='mt-3'
                  v-model='claim.serviceClarificationCode'
                  maxlength='2'
                  :isUpperCaseForced='true'
                  :inputStyle='extraSmallStyles'
                  @blur='handleBlurField($v.medicalServiceClaims.$each[index].serviceClarificationCode)' />
            <div class="text-danger"
                v-if="v.serviceClarificationCode.$dirty && !v.serviceClarificationCode.clarificationCodeValidator"
                aria-live="assertive">Service Clarification Code is invalid.</div>  
            <DigitInput label='Fee Item:'
                  :id='"fee-item-" + index'
                  class='mt-3'
                  v-model='claim.feeItem'
                  maxlength='5'
                  :isRequiredAsteriskShown='true'
                  :inputStyle='smallStyles'
                  @blur='handleBlurField($v.medicalServiceClaims.$each[index].feeItem)' />
            <div class="text-danger"
                v-if="v.feeItem.$dirty && !v.feeItem.required"
                aria-live="assertive">Fee Item is required.</div>
            <div class="text-danger"
                v-if="v.feeItem.$dirty && v.feeItem.required && !v.feeItem.intValidator"
                aria-live="assertive">Fee Item must be an integer.</div>
            <div class="text-danger"
                v-if="v.feeItem.$dirty && v.feeItem.required && !v.feeItem.positiveNumberValidator"
                aria-live="assertive">Fee Item must be a positive number.</div>
            <NumberInput label='Amount Billed:'
                  :id='"amount-billed-" + index'
                  class='mt-3'
                  v-model='claim.amountBilled'
                  maxlength='7'
                  :isRequiredAsteriskShown='true'
                  :inputStyle='smallStyles'
                  @blur='handleBlurField($v.medicalServiceClaims.$each[index].amountBilled)' />
            <div class="text-danger"
                v-if="v.amountBilled.$dirty && !v.amountBilled.required"
                aria-live="assertive">Amount billed is required.</div>
            <div class="text-danger"
                v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.dollarNumberValidator"
                aria-live="assertive">Amount billed must be a dollar amount. Example: 10.00</div>
            <div class="text-danger"
                v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.positiveNumberValidator"
                aria-live="assertive">Amount billed must be a positive number.</div> 
            <div class="text-danger"
                v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.amountBilledZeroValidator"
                aria-live="assertive">Amount billed must be zero if Fee item is '03333'.</div>
            <TimeInput label='Called Start Time:'
                      :id='"called-start-time-" + index'
                      className='mt-3'
                      v-model='claim.calledStartTime'
                      :isHourTwoDigits='true'
                      @blur='handleBlurField($v.medicalServiceClaims.$each[index].calledStartTime)' />
            <div class="text-danger"
                v-if="v.calledStartTime.$dirty && !v.calledStartTime.partialTimeValidator"
                aria-live="assertive">Called start time must be an exact value.</div>
            <TimeInput label='Rendered Finish Time:'
                      :id='"rendered-finish-time-" + index'
                      className='mt-3'
                      v-model='claim.renderedFinishTime'
                      :isHourTwoDigits='true'
                      @blur='handleBlurField($v.medicalServiceClaims.$each[index].renderedFinishTime)' />
            <div class="text-danger"
                v-if="v.renderedFinishTime.$dirty && !v.renderedFinishTime.partialTimeValidator"
                aria-live="assertive">Rendered finish time must be an exact value.</div>
            <Input label='Diagnostic Code:'
                  :id='"diagnostic-code-" + index'
                  class='mt-3'
                  v-model='claim.diagnosticCode'
                  maxlength='5'
                  :isRequiredAsteriskShown='true'
                  :inputStyle='smallStyles'
                  @blur='handleBlurField($v.medicalServiceClaims.$each[index].diagnosticCode)' />
            <div class="text-danger"
                v-if="v.diagnosticCode.$dirty && !v.diagnosticCode.required"
                aria-live="assertive">Diagnostic code is required.</div>
            <div class="text-danger"
                v-if="v.diagnosticCode.$dirty && v.diagnosticCode.required && !v.diagnosticCode.diagnosticCodeValidator"
                aria-live="assertive">Diagnostic code must be valid.</div>
            <Select label='Service Location Code:'
                  :id='"location-of-service-" + index'
                  class='mt-3'
                  v-model='claim.locationOfService'
                  :options='serviceLocationOptions'
                  :isRequiredAsteriskShown='true'
                  :inputStyle='extraLargeStyles'
                  @blur='handleBlurField($v.medicalServiceClaims.$each[index].locationOfService)' />
            <div class="text-danger"
                v-if="v.locationOfService.$dirty && !v.locationOfService.required"
                aria-live="assertive">Service location code is required.</div>
            <Select label='Correspondence Attached:'
                :id='"correspondence-attached-" + index'
                class='mt-3'
                v-model='claim.correspondenceAttached'
                :options='correspondenceAttachedOptions'
                defaultOptionLabel='None'
                :inputStyle='largeStyles' />
            <Select label='Submission Code:'
                :id='"submission-code-" + index'
                class='mt-3'
                v-model='claim.submissionCode'
                defaultOptionLabel='None'
                :options='submissionCodeOptions'
                :isRequiredAsteriskShown='isSubmissionCodeRequired(index)'
                :inputStyle='largeStyles'
                @blur='handleBlurField($v.medicalServiceClaims.$each[index].submissionCode)' />
            <div class="text-danger"
                v-if="v.submissionCode.$dirty && isSubmissionCodeRequired(index) && !v.submissionCode.submissionCodeValidator"
                aria-live="assertive">Submission code is required.</div>
            <Textarea label='Notes/Additional Information:'
                  :id='"notes-" + index'
                  class='mt-3'
                  v-model='claim.notes'
                  :remainingCharsMaxlength='400'
                  :isRemainingCharsShown='true'
                  :inputStyle='textareaStyle' />
          </div>
        </div>

        <a name='mailing-address'></a>
        <h2 class="mt-5">Payment Mailing Address</h2>
        <div class="section-container p-3">
          <Radio label='Whose address is this?'
                v-model='addressOwner'
                :items='addressOwnerOptions'
                :isRequiredAsteriskShown='true'
                @blur='handleBlurField($v.addressOwner)' />
          <div class="text-danger"
              v-if="$v.addressOwner.$dirty && !$v.addressOwner.required"
              aria-live="assertive">This field is required.</div>
          <Input label='Apartment / Unit:'
                id='unit-number'
                className='mt-3'
                v-model='unitNumber'
                maxlength='6'
                :inputStyle='smallStyles' />
          <Input label='Street Number:'
                id='street-number'
                className='mt-3'
                v-model='streetNumber'
                maxlength='6'
                :inputStyle='smallStyles' />
          <Input label='Street Name:'
                id='street-name'
                className='mt-3'
                v-model='streetName'
                maxlength='24'
                :isRequiredAsteriskShown='true'
                :inputStyle='mediumStyles'
                @blur='handleBlurField($v.streetName)' />
          <div class="text-danger"
              v-if="$v.streetName.$dirty && !$v.streetName.required"
              aria-live="assertive">Street Name is required.</div>
          <Input label='City:'
                id='city'
                className='mt-3'
                v-model='city'
                maxlength='22'
                :isRequiredAsteriskShown='true'
                :inputStyle='mediumStyles'
                @blur='handleBlurField($v.city)' />
          <div class="text-danger"
              v-if="$v.city.$dirty && !$v.city.required"
              aria-live="assertive">City is required.</div>
          <div class='my-3'>Province:</div>
          <p><strong>British Columbia</strong></p>
          <PostalCodeInput label='Postal Code:'
                id='postal-code'
                className='mt-3'
                v-model='postalCode'
                :isRequiredAsteriskShown='true'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.postalCode)' />
          <div class="text-danger"
              v-if="$v.postalCode.$dirty && !$v.postalCode.required"
              aria-live="assertive">Postal Code is required.</div>
          <div class="text-danger"
              v-if="$v.postalCode.$dirty && $v.postalCode.required && !$v.postalCode.bcPostalCodeValidator"
              aria-live="assertive">Must be a valid BC postal code.</div>
        </div>

        <a name='practitioner'></a>
        <h2 class="mt-5">Practitioner Information</h2>
        <div class="section-container p-3">
          <Input label='Practitioner Last Name:'
                id='practitioner-last-name'
                v-model='practitionerLastName'
                maxlength='35'
                :inputStyle='mediumStyles'
                :isRequiredAsteriskShown='true'
                @blur='handleBlurField($v.practitionerLastName)' />
          <div class="text-danger"
              v-if="$v.practitionerLastName.$dirty && !$v.practitionerLastName.required"
              aria-live="assertive">Practitioner Last Name is required.</div>
          <div class="text-danger"
              v-if="$v.practitionerLastName.$dirty && $v.practitionerLastName.required && !$v.practitionerLastName.nameValidator"
              aria-live="assertive">Practitioner Last Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <Input label='Practitioner First Name:'
                id='practitioner-first-name'
                v-model='practitionerFirstName'
                maxlength='15'
                class='mt-3'
                :inputStyle='mediumStyles'
                :isRequiredAsteriskShown='true'
                @blur='handleBlurField($v.practitionerFirstName)' />
          <div class="text-danger"
              v-if="$v.practitionerFirstName.$dirty && !$v.practitionerFirstName.required"
              aria-live="assertive">Practitioner First Name is required.</div>
          <div class="text-danger"
              v-if="$v.practitionerFirstName.$dirty && $v.practitionerFirstName.required && !$v.practitionerFirstName.nameValidator"
              aria-live="assertive">Practitioner First Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <!-- Using PractitionerNumberInput because payment number has the same format as a practitioner number -->
          <PractitionerNumberInput label='Payment Number:'
                id='payment-number'
                class='mt-3'
                v-model='practitionerPaymentNumber'
                :isRequiredAsteriskShown='true'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.practitionerPaymentNumber)'/>
          <div class="text-danger"
              v-if="$v.practitionerPaymentNumber.$dirty && !$v.practitionerPaymentNumber.required"
              aria-live="assertive">Payment number is required.</div>
          <div class="text-danger"
              v-if="$v.practitionerPaymentNumber.$dirty && $v.practitionerPaymentNumber.required && !$v.practitionerPaymentNumber.minLength"
              aria-live="assertive">Payment number must not be less than 5 characters.</div>
          <PractitionerNumberInput label='Practitioner Number:'
                id='practitioner-number'
                class='mt-3'
                v-model='practitionerPractitionerNumber'
                :isRequiredAsteriskShown='true'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.practitionerPractitionerNumber)'/>
          <div class="text-danger"
              v-if="$v.practitionerPractitionerNumber.$dirty && !$v.practitionerPractitionerNumber.required"
              aria-live="assertive">Practitioner number is required.</div>
          <div class="text-danger"
              v-if="$v.practitionerPractitionerNumber.$dirty && $v.practitionerPractitionerNumber.required && !$v.practitionerPractitionerNumber.minLength"
              aria-live="assertive">Practitioner number must not be less than 5 characters.</div>
          <Input label='Specialty Code:'
                id='specialty-code'
                class='mt-3'
                v-model='practitionerSpecialtyCode'
                maxlength='2'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField($v.practitionerSpecialtyCode)'/>
          <div class="text-danger"
              v-if="$v.practitionerSpecialtyCode.$dirty && !$v.practitionerSpecialtyCode.alphanumericValidator"
              aria-live="assertive">Specialty code must be alphanumeric.</div>
          <FacilityNumberInput label='Facility Number:'
                id='facility-number'
                class='mt-3'
                v-model='practitionerFacilityNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.practitionerFacilityNumber)'/>
          <div class="text-danger"
              v-if="$v.practitionerFacilityNumber.$dirty && !$v.practitionerFacilityNumber.minLength"
              aria-live="assertive">Facility number must not be less than 5 characters.</div>
        </div>

        <a name='referred-by'></a>
        <h2 class="mt-5">Referred By</h2>
        <div class="section-container p-3">
          <PractitionerNumberInput label='Referred By Practitioner Number:'
                id='referred-by-practitioner-number'
                v-model='referredByPractitionerNumber'
                :isRequiredAsteriskShown='isReferredByRequired'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.referredByPractitionerNumber)'/>
          <div class="text-danger"
              v-if="isReferredByRequired && $v.referredByPractitionerNumber.$dirty && !$v.referredByPractitionerNumber.required"
              aria-live="assertive">Practitioner number is required.</div>
          <div class="text-danger"
              v-if="$v.referredByPractitionerNumber.$dirty && !$v.referredByPractitionerNumber.minLength"
              aria-live="assertive">Practitioner number must not be less than 5 characters.</div>
          <Input label='Referred By Practitioner Last Name:'
                id='referred-by-last-name'
                v-model='referredByLastName'
                maxlength='18'
                class='mt-3'
                :isRequiredAsteriskShown='isReferredByRequired'
                :inputStyle='mediumStyles'
                @blur='handleBlurField($v.referredByLastName)'/>
          <div class="text-danger"
              v-if="isReferredByRequired && $v.referredByLastName.$dirty && !$v.referredByLastName.required"
              aria-live="assertive">Last name is required.</div>
          <div class="text-danger"
              v-if="$v.referredByLastName.$dirty && !$v.referredByLastName.nameValidator"
              aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <Input label='Referred By Practitioner First Name Initial:'
                id='referred-by-first-name-initial'
                v-model='referredByFirstNameInitial'
                maxlength='1'
                class='mt-3'
                :isRequiredAsteriskShown='isReferredByRequired'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField($v.referredByFirstNameInitial)'/>
          <div class="text-danger"
              v-if="isReferredByRequired && $v.referredByFirstNameInitial.$dirty && !$v.referredByFirstNameInitial.required"
              aria-live="assertive">First Name Initial is required.</div>
          <div class="text-danger"
              v-if="$v.referredByFirstNameInitial.$dirty && !$v.referredByFirstNameInitial.alphaValidator"
              aria-live="assertive">First Name Initial must only be an alphabetic character.</div>
        </div>

        <a name='referred-to'></a>
        <h2 class="mt-5">Referred To</h2>
        <div class="section-container p-3">
          <PractitionerNumberInput label='Referred To Practitioner Number:'
                id='referred-to-practitioner-number'
                v-model='referredToPractitionerNumber'
                :isRequiredAsteriskShown='isReferredToRequired'
                :inputStyle='smallStyles'
                @blur='handleBlurField($v.referredToPractitionerNumber)'/>
          <div class="text-danger"
              v-if="isReferredToRequired && $v.referredToPractitionerNumber.$dirty && !$v.referredToPractitionerNumber.required"
              aria-live="assertive">Practitioner number is required.</div>
          <div class="text-danger"
              v-if="$v.referredToPractitionerNumber.$dirty && !$v.referredToPractitionerNumber.minLength"
              aria-live="assertive">Practitioner number must not be less than 5 characters.</div>
          <Input label='Referred To Practitioner Last Name:'
                id='referred-to-last-name'
                v-model='referredToLastName'
                maxlength='18'
                class='mt-3'
                :isRequiredAsteriskShown='isReferredToRequired'
                :inputStyle='mediumStyles'
                @blur='handleBlurField($v.referredToLastName)'/>
          <div class="text-danger"
              v-if="isReferredToRequired && $v.referredToLastName.$dirty && !$v.referredToLastName.required"
              aria-live="assertive">Last name is required.</div>
          <div class="text-danger"
              v-if="$v.referredToLastName.$dirty && !$v.referredToLastName.nameValidator"
              aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <Input label='Referred To Practitioner First Name Initial:'
                id='referred-to-first-name-initial'
                v-model='referredToFirstNameInitial'
                maxlength='1'
                class='mt-3'
                :isRequiredAsteriskShown='isReferredToRequired'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField($v.referredToFirstNameInitial)'/>
          <div class="text-danger"
              v-if="isReferredToRequired && $v.referredToFirstNameInitial.$dirty && !$v.referredToFirstNameInitial.required"
              aria-live="assertive">First Name Initial is required.</div>
          <div class="text-danger"
              v-if="$v.referredToFirstNameInitial.$dirty && !$v.referredToFirstNameInitial.alphaValidator"
              aria-live="assertive">First Name Initial must only be an alphabetic character.</div>
        </div>
      </div>
    </PageContent>
    <PromptModal v-if='isValidationModalShown'
                title='Warning'
                @yes='validationModalYesHandler()'
                @no='validationModalNoHandler()'>
      <p>The following items do not match our records:</p>
      <ul v-if="validationWarningList.length > 0">
        <li v-for="(item, index) in validationWarningList"
            :key="index"
            class="text-danger validation-warning-item">{{item}}</li>
      </ul>
      <p>Do you wish to continue?</p>
    </PromptModal>
    <ContinueBar @continue="validateFields()"
                :hasLoader="isValidating" />
  </div>
</template>

<script>
import pageStateService from '@/services/page-state-service';
import apiService from '@/services/api-service';
import {
  payPatientRoutes,
  isPastPath,
} from '@/router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition
} from '@/helpers/scroll';
import {
  getConvertedPath,
  isCSR,
} from '@/helpers/url';
import {
  birthDateValidator,
  clarificationCodeValidator,
  diagnosticCodeValidator,
  serviceDateValidator,
  submissionCodeValidator,
} from '@/helpers/validators';
import {
  selectOptionsSubmissionCode,
  selectOptionsCorrespondenceAttached,
  selectOptionsServiceLocation,
} from '@/constants/select-options';
import {
  extraSmallStyles,
  smallStyles,
  mediumStyles,
  largeStyles,
  extraLargeStyles,
} from '@/constants/input-styles';
import ContinueBar from '@/components/ContinueBar.vue';
import PageContent from '@/components/PageContent.vue';
import {
  MODULE_NAME as formModule,
  SET_PLAN_REFERENCE_NUMBER,
  SET_PHN,
  SET_DEPENDENT_NUMBER,
  SET_FIRST_NAME,
  SET_MIDDLE_INITIAL,
  SET_LAST_NAME,
  SET_BIRTH_DATE,
  SET_ADDRESS_OWNER,
  SET_UNIT_NUMBER,
  SET_STREET_NUMBER,
  SET_STREET_NAME,
  SET_CITY,
  SET_POSTAL_CODE,
  SET_IS_VEHICLE_ACCIDENT,
  SET_VEHICLE_ACCIDENT_CLAIM_NUMBER,
  SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM,
  SET_MEDICAL_SERVICE_CLAIMS,
  SET_PRACTITIONER_LAST_NAME,
  SET_PRACTITIONER_FIRST_NAME,
  SET_PRACTITIONER_PAYMENT_NUMBER,
  SET_PRACTITIONER_PRACTITIONER_NUMBER,
  SET_PRACTITIONER_FACILITY_NUMBER,
  SET_PRACTITIONER_SPECIALTY_CODE,
  SET_REFERRED_BY_LAST_NAME,
  SET_REFERRED_BY_FIRST_NAME_INITIAL,
  SET_REFERRED_BY_PRACTITIONER_NUMBER,
  SET_REFERRED_TO_LAST_NAME,
  SET_REFERRED_TO_FIRST_NAME_INITIAL,
  SET_REFERRED_TO_PRACTITIONER_NUMBER,
} from '@/store/modules/pay-patient-form';
import logService from '@/services/log-service';
import { required, maxLength, minLength } from 'vuelidate/lib/validators';
import {
  DateInput,
  DigitInput,
  FacilityNumberInput,
  Input,
  MotorVehicleAccidentClaimNumberInput,
  NumberInput,
  PhnInput,
  PostalCodeInput,
  PractitionerNumberInput,
  PromptModal,
  Radio,
  Select,
  Textarea,
  TimeInput,
  alphanumericValidator,
  alphaValidator,
  cloneDeep,
  distantPastValidator,
  dollarNumberValidator,
  intValidator,
  motorVehicleAccidentClaimNumberValidator,
  nonZeroNumberValidator,
  optionalValidator,
  padLeadingZeros,
  pastDateValidator,
  phnValidator,
  positiveNumberValidator,
} from 'common-lib-vue';
import {
  startOfToday,
  addDays,
  isBefore,
  isSameDay,
  subDays,
} from 'date-fns';

const bcPostalCodeValidator = (value) => {
  if (value && value !== '') {
    const criteria = RegExp('^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$');
    return criteria.test(value);
  }
  return true;
};

const nameValidator = (value) => {
  const criteria = /^[a-zA-Z][a-zA-Z-.' ]*$/;
  return criteria.test(value);
};

const nameInitialValidator = (value) => {
  const criteria = /^[a-zA-Z]*$/;
  return criteria.test(value);
};

const dependentNumberValidator = (value, vm) => {
  const phn = vm.phn;
  if (phn && phn[0] === '9' && !(value === '00' || value === '66')) {
    return false;
  }
  return true;
};

const birthDatePastValidator = (value) => {
  return pastDateValidator(value) || isSameDay(value, startOfToday());
};

const amountBilledZeroValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  const parsedValue = parseFloat(value);
  if (feeItem && feeItem === '03333' && parsedValue !== 0) {
    return false;
  }
  return true;
};

const serviceDateFutureValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  if (!value) {
    return false;
  }
  if (feeItem === '03333') {
    const future90Days = addDays(startOfToday(), 91); // Add 1 day to include today's date.
    return isBefore(value, future90Days);
  }
  return isBefore(value, addDays(startOfToday(), 1)); // Add 1 day to include today's date.
};

const partialTimeValidator = (value) => {
  if ((value.hour && !value.minute)
    || (!value.hour && value.minute)) {
    return false;
  }
  return true;
};

export default {
  name: 'MainFormPage',
  components: {
    ContinueBar,
    DateInput,
    DigitInput,
    FacilityNumberInput,
    Input,
    MotorVehicleAccidentClaimNumberInput,
    NumberInput,
    PageContent,
    PhnInput,
    PostalCodeInput,
    PractitionerNumberInput,
    PromptModal,
    Radio,
    Select,
    Textarea,
    TimeInput,
  },
  data: () => {
    return {
      isPageLoaded: false,
      isValidating: false,
      isValidationModalShown: false,
      addressOwnerOptions: [
        {
          id: 'address-owner-practitioner',
          label: 'Practitioner',
          value: 'PRACTITIONER',
        },
        {
          id: 'address-owner-patient',
          label: 'Patient',
          value: 'PATIENT',
        }
      ],
      isVehicleAccidentOptions: [
        {
          id: 'is-vehicle-accident-y',
          label: 'Yes',
          value: 'Y',
        },
        {
          id: 'is-vehicle-accident-n',
          label: 'No',
          value: 'N',
        }
      ],
      correspondenceAttachedOptions: selectOptionsCorrespondenceAttached,
      submissionCodeOptions: selectOptionsSubmissionCode,
      serviceLocationOptions: selectOptionsServiceLocation,
      extraSmallStyles,
      smallStyles,
      mediumStyles,
      largeStyles,
      extraLargeStyles,
      textareaStyle: {
        height: '150px'
      },

      planReferenceNumber: null,
      phn: null,
      dependentNumber: null,
      firstName: null,
      middleInitial: null,
      lastName: null,
      birthDate: null,
      birthDateData: null,

      addressOwner: null,
      unitNumber: null,
      streetNumber: null,
      streetName: null,
      city: null,
      postalCode: null,

      isVehicleAccident: null,
      vehicleAccidentClaimNumber: null,

      planReferenceNumberOfOriginalClaim: null,

      medicalServiceClaims: [],

      practitionerLastName: null,
      practitionerFirstName: null,
      practitionerPaymentNumber: null,
      practitionerPractitionerNumber: null,
      practitionerFacilityNumber: null,
      practitionerSpecialtyCode: null,

      referredByFirstNameInitial: null,
      referredByLastName: null,
      referredByPractitionerNumber: null,

      referredToFirstNameInitial: null,
      referredToLastName: null,
      referredToPractitionerNumber: null,
    };
  },
  created() {
    this.planReferenceNumber = this.$store.state.payPatientForm.planReferenceNumber;

    this.phn = this.$store.state.payPatientForm.phn;
    this.dependentNumber = this.$store.state.payPatientForm.dependentNumber;
    this.firstName = this.$store.state.payPatientForm.firstName;
    this.middleInitial = this.$store.state.payPatientForm.middleInitial;
    this.lastName = this.$store.state.payPatientForm.lastName;
    this.birthDate = this.$store.state.payPatientForm.birthDate;

    this.addressOwner = this.$store.state.payPatientForm.addressOwner;
    this.unitNumber = this.$store.state.payPatientForm.unitNumber;
    this.streetNumber = this.$store.state.payPatientForm.streetNumber;
    this.streetName = this.$store.state.payPatientForm.streetName;
    this.city = this.$store.state.payPatientForm.city;
    this.postalCode = this.$store.state.payPatientForm.postalCode;

    this.isVehicleAccident = this.$store.state.payPatientForm.isVehicleAccident;
    this.vehicleAccidentClaimNumber = this.$store.state.payPatientForm.vehicleAccidentClaimNumber;

    this.planReferenceNumberOfOriginalClaim = this.$store.state.payPatientForm.planReferenceNumberOfOriginalClaim;

    this.medicalServiceClaims = this.$store.state.payPatientForm.medicalServiceClaims ? cloneDeep(this.$store.state.payPatientForm.medicalServiceClaims) : [];

    this.practitionerLastName = this.$store.state.payPatientForm.practitionerLastName;
    this.practitionerFirstName = this.$store.state.payPatientForm.practitionerFirstName;
    this.practitionerPaymentNumber = this.$store.state.payPatientForm.practitionerPaymentNumber;
    this.practitionerPractitionerNumber = this.$store.state.payPatientForm.practitionerPractitionerNumber;
    this.practitionerFacilityNumber = this.$store.state.payPatientForm.practitionerFacilityNumber;
    this.practitionerSpecialtyCode = this.$store.state.payPatientForm.practitionerSpecialtyCode;

    this.referredByFirstNameInitial = this.$store.state.payPatientForm.referredByFirstNameInitial;
    this.referredByLastName = this.$store.state.payPatientForm.referredByLastName;
    this.referredByPractitionerNumber = this.$store.state.payPatientForm.referredByPractitionerNumber;

    this.referredToFirstNameInitial = this.$store.state.payPatientForm.referredToFirstNameInitial;
    this.referredToLastName = this.$store.state.payPatientForm.referredToLastName;
    this.referredToPractitionerNumber = this.$store.state.payPatientForm.referredToPractitionerNumber;

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    logService.logNavigation(
      this.$store.state.payPatientForm.applicationUuid,
      payPatientRoutes.MAIN_FORM_PAGE.path,
      payPatientRoutes.MAIN_FORM_PAGE.title
    );
  },
  validations() {
    const validations = {
      planReferenceNumber: {},
      phn: {
        required,
        phnValidator,
      },
      dependentNumber: {
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        dependentNumberValidator: optionalValidator(dependentNumberValidator),
      },
      firstName: {
        required,
        nameValidator,
      },
      middleInitial: {
        nameInitialValidator: optionalValidator(nameInitialValidator),
      },
      lastName: {
        required,
        nameValidator,
      },
      birthDate: {
        birthDatePastValidator: optionalValidator(birthDatePastValidator),
        birthDateValidator,
        distantPastValidator: optionalValidator(distantPastValidator),
      },
      addressOwner: {
        required,
      },
      streetName: {
        required,
      },
      city: {
        required,
      },
      postalCode: {
        required,
        bcPostalCodeValidator,
      },
      isVehicleAccident: {
        required,
      },
      vehicleAccidentClaimNumber: {
        motorVehicleAccidentClaimNumberValidator: optionalValidator(motorVehicleAccidentClaimNumberValidator),
      },
      planReferenceNumberOfOriginalClaim: {
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
      },
      medicalServiceClaims: {
        $each: {
          serviceDate: {
            required,
            serviceDateValidator,
            serviceDateFutureValidator,
            distantPastValidator,
          },
          numberOfServices: {
            required,
            intValidator,
            positiveNumberValidator,
            nonZeroNumberValidator,
          },
          feeItem: {
            required,
            intValidator,
            positiveNumberValidator,
          },
          amountBilled: {
            required,
            dollarNumberValidator,
            positiveNumberValidator,
            amountBilledZeroValidator,
          },
          calledStartTime: {
            partialTimeValidator: optionalValidator(partialTimeValidator),
          },
          renderedFinishTime: {
            partialTimeValidator: optionalValidator(partialTimeValidator),
          },
          diagnosticCode: {
            required,
            diagnosticCodeValidator,
          },
          locationOfService: {
            required,
          },
          serviceClarificationCode: {
            clarificationCodeValidator: optionalValidator(clarificationCodeValidator),
          },
          submissionCode: {
            submissionCodeValidator,
          },
          notes: {
            maxLength: maxLength(400),
          },
        }
      },
      practitionerLastName: {
        required,
        nameValidator,
      },
      practitionerFirstName: {
        required,
        nameValidator,
      },
      practitionerPaymentNumber: {
        required,
        minLength: minLength(5),
      },
      practitionerPractitionerNumber: {
        required,
        minLength: minLength(5),
      },
      practitionerFacilityNumber: {
        minLength: optionalValidator(minLength(5)),
      },
      practitionerSpecialtyCode: {
        alphanumericValidator: optionalValidator(alphanumericValidator),
      },
      referredByFirstNameInitial: {
        alphaValidator: optionalValidator(alphaValidator),
      },
      referredByLastName: {
        nameValidator: optionalValidator(nameValidator),
      },
      referredByPractitionerNumber: {
        minLength: optionalValidator(minLength(5)),
      },
      referredToFirstNameInitial: {
        alphaValidator: optionalValidator(alphaValidator),
      },
      referredToLastName: {
        nameValidator: optionalValidator(nameValidator),
      },
      referredToPractitionerNumber: {
        minLength: optionalValidator(minLength(5)),
      },
    };
    if (this.dependentNumber !== '66') {
      validations.birthDate.required = required;
    }
    if (this.isReferredByRequired) {
      validations.referredByFirstNameInitial.required = required;
      validations.referredByLastName.required = required;
      validations.referredByPractitionerNumber.required = required;
    }
    if (this.isReferredToRequired) {
      validations.referredToFirstNameInitial.required = required;
      validations.referredToLastName.required = required;
      validations.referredToPractitionerNumber.required = required;
    }
    if (this.isCSR) {
      validations.planReferenceNumber = {
        required,
        intValidator,
        positiveNumberValidator,
        minLength: minLength(10),
      };
    }
    return validations;
  },
  methods: {
    handleBlurField(validation) {
      if (validation) {
        validation.$touch();
      }
    },
    handleProcessBirthDate(data) {
      this.birthDateData = data;
    },
    handleProcessServiceDate(data, claimIndex) {
      this.medicalServiceClaims[claimIndex].serviceDateData = data;
    },
    validateFields() {
      // If no dependent number is given, then default to "00".
      if (!this.dependentNumber) {
        this.dependentNumber = '00';
      }
      
      for (let i=0; i<this.medicalServiceClaims.length; i++) {
        // Pad Fee Items with leading zeros.
        if (this.medicalServiceClaims[i].feeItem) {
          this.medicalServiceClaims[i].feeItem = padLeadingZeros(this.medicalServiceClaims[i].feeItem, 5);
        }
        // Set default "calledStartTime" to "00:00".
        if (!this.medicalServiceClaims[i].calledStartTime
          || (
            !this.medicalServiceClaims[i].calledStartTime.hour &&
            !this.medicalServiceClaims[i].calledStartTime.minute
          )
        ) {
          this.medicalServiceClaims[i].calledStartTime = {
            hour: '00',
            minute: '00',
            time: '00:00'
          };
        }
        // Set default "renderedFinishTime" to "00:00".
        if (!this.medicalServiceClaims[i].renderedFinishTime
          || (
            !this.medicalServiceClaims[i].renderedFinishTime.hour &&
            !this.medicalServiceClaims[i].renderedFinishTime.minute
          )
        ) {
          this.medicalServiceClaims[i].renderedFinishTime = {
            hour: '00',
            minute: '00',
            time: '00:00'
          };
        }
      }

      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      this.isValidating = true;

      const token = this.$store.state.payPatientForm.captchaToken;
      const applicationUuid = this.$store.state.payPatientForm.applicationUuid;
      
      // Do server-side validation.
      apiService.validateApplication(token, {
        applicationUuid: applicationUuid,
        practitionerFirstName: this.practitionerFirstName || '',
        practitionerLastName: this.practitionerLastName || '',
        practitionerNumber: this.practitionerPractitionerNumber || '',
        serviceFeeItem1: this.medicalServiceClaims[0] && this.medicalServiceClaims[0].feeItem ? this.medicalServiceClaims[0].feeItem : '',
        serviceFeeItem2: this.medicalServiceClaims[1] && this.medicalServiceClaims[1].feeItem ? this.medicalServiceClaims[1].feeItem : '',
        serviceFeeItem3: this.medicalServiceClaims[2] && this.medicalServiceClaims[2].feeItem ? this.medicalServiceClaims[2].feeItem : '',
        serviceFeeItem4: this.medicalServiceClaims[3] && this.medicalServiceClaims[3].feeItem ? this.medicalServiceClaims[3].feeItem : '',
        serviceLocationCode1: this.medicalServiceClaims[0] && this.medicalServiceClaims[0].locationOfService ? this.medicalServiceClaims[0].locationOfService : '',
        serviceLocationCode2: this.medicalServiceClaims[1] && this.medicalServiceClaims[1].locationOfService ? this.medicalServiceClaims[1].locationOfService : '',
        serviceLocationCode3: this.medicalServiceClaims[2] && this.medicalServiceClaims[2].locationOfService ? this.medicalServiceClaims[2].locationOfService : '',
        serviceLocationCode4: this.medicalServiceClaims[3] && this.medicalServiceClaims[3].locationOfService ? this.medicalServiceClaims[3].locationOfService : '',
        hospitalFeeItem1: '',
        hospitalFeeItem2: '',
        hospitalLocationCode1: '',
        hospitalLocationCode2: ''
      }).then((response) => {
        console.log('Response:', response);
        this.isValidating = false;
        this.isValidationModalShown = true;
      }).catch(() => {
        this.isValidating = false;
        this.isValidationModalShown = true;
      });
      // this.isValidationModalShown = true;

      // this.navigateToNextPage();
    },
    validationModalYesHandler() {
      this.navigateToNextPage();
    },
    validationModalNoHandler() {
      this.isValidationModalShown = false;
    },
    navigateToNextPage() {
      this.$store.dispatch(formModule + '/' + SET_PLAN_REFERENCE_NUMBER, this.planReferenceNumber);

      this.$store.dispatch(formModule + '/' + SET_PHN, this.phn);
      this.$store.dispatch(formModule + '/' + SET_DEPENDENT_NUMBER, this.dependentNumber);
      this.$store.dispatch(formModule + '/' + SET_FIRST_NAME, this.firstName);
      this.$store.dispatch(formModule + '/' + SET_MIDDLE_INITIAL, this.middleInitial);
      this.$store.dispatch(formModule + '/' + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(formModule + '/' + SET_BIRTH_DATE, this.birthDate);

      this.$store.dispatch(formModule + '/' + SET_ADDRESS_OWNER, this.addressOwner);
      this.$store.dispatch(formModule + '/' + SET_UNIT_NUMBER, this.unitNumber);
      this.$store.dispatch(formModule + '/' + SET_STREET_NUMBER, this.streetNumber);
      this.$store.dispatch(formModule + '/' + SET_STREET_NAME, this.streetName);
      this.$store.dispatch(formModule + '/' + SET_CITY, this.city);
      this.$store.dispatch(formModule + '/' + SET_POSTAL_CODE, this.postalCode);

      this.$store.dispatch(formModule + '/' + SET_IS_VEHICLE_ACCIDENT, this.isVehicleAccident);
      this.$store.dispatch(formModule + '/' + SET_VEHICLE_ACCIDENT_CLAIM_NUMBER, this.vehicleAccidentClaimNumber);

      this.$store.dispatch(formModule + '/' + SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM, this.planReferenceNumberOfOriginalClaim);

      this.$store.dispatch(formModule + '/' + SET_MEDICAL_SERVICE_CLAIMS, this.medicalServiceClaims);

      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_LAST_NAME, this.practitionerLastName);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_FIRST_NAME, this.practitionerFirstName);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PAYMENT_NUMBER, this.practitionerPaymentNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PRACTITIONER_NUMBER, this.practitionerPractitionerNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_FACILITY_NUMBER, this.practitionerFacilityNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_SPECIALTY_CODE, this.practitionerSpecialtyCode);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_FIRST_NAME_INITIAL, this.referredByFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_LAST_NAME, this.referredByLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_PRACTITIONER_NUMBER, this.referredByPractitionerNumber);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_FIRST_NAME_INITIAL, this.referredToFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_LAST_NAME, this.referredToLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_PRACTITIONER_NUMBER, this.referredToPractitionerNumber);

      // Navigate to next path.
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPatientRoutes.REVIEW_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    },
    getMedicalServiceClaimTitle(index) {
      if (this.medicalServiceClaims && this.medicalServiceClaims.length > 1) {
        return `Service (${index + 1} of ${this.medicalServiceClaims.length})`;
      }
      return 'Service';
    },
    getServiceDateFutureErrorMessage(feeItem) {
      if (feeItem === '03333') {
        return 'Service date cannot be more than 90 days in the future.';
      }
      return 'Service date cannot be in the future.';
    },
    isSubmissionCodeRequired(index) {
      const past90Days = subDays(startOfToday(), 90);
      let serviceDate = this.medicalServiceClaims[index].serviceDate;
      if (!serviceDate) {
        return false;
      }
      return isBefore(serviceDate, past90Days);
    },
  },
  computed: {
    isReferredByRequired() {
      return !!this.referredByFirstNameInitial
          || !!this.referredByLastName
          || !!this.referredByPractitionerNumber;
    },
    isReferredToRequired() {
      return !!this.referredToFirstNameInitial
          || !!this.referredToLastName
          || !!this.referredToPractitionerNumber
          || this.isContainingNoChargeFeeItem;
    },
    isContainingNoChargeFeeItem() {
      for (let i=0; i<this.medicalServiceClaims.length; i++) {
        if (this.medicalServiceClaims[i].feeItem === '03333') {
          return true;
        }
      }
      return false;
    },
    isCSR() {
      return isCSR(this.$router.currentRoute.path);
    },
    validationWarningList() {
      const result = [];
      result.push('Placeholder field name');
      return result;
    },
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (pageStateService.isPageComplete(to.path) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPatientRoutes.MAIN_FORM_PAGE.path
      );
      next({
        path: toPath,
        replace: true
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>

<style scoped>
.validation-warning-item {
  font-size: 1rem;
}
.section-container {
  background-color: #EEE;
}
</style>
