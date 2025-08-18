<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Pay Practitioner Claim</h1>
        <hr class="mt-0" />

        <div
          v-if="isCSR"
          class="section-container p-3 mb-5"
        >
          <a name="plan-reference-number"></a>
          <DigitInput
            id="plan-reference-number"
            v-model="planReferenceNumber"
            label="Plan Reference Number: (required)"
            cypress-id="PRN"
            :is-required-asterisk-shown="true"
            maxlength="10"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.planReferenceNumber)"
          />
          <div
            v-if="v$.planReferenceNumber.$dirty && v$.planReferenceNumber.required.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Plan Reference Number is required.
          </div>
          <div
            v-if="
              v$.planReferenceNumber.$dirty &&
              !v$.planReferenceNumber.required.$invalid &&
              v$.planReferenceNumber.intValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Plan Reference Number must be an integer.
          </div>
          <div
            v-if="
              v$.planReferenceNumber.$dirty &&
              !v$.planReferenceNumber.required.$invalid &&
              v$.planReferenceNumber.positiveNumberValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Plan Reference Number must be a positive number.
          </div>
          <div
            v-if="
              v$.planReferenceNumber.$dirty &&
              !v$.planReferenceNumber.required.$invalid &&
              v$.planReferenceNumber.minLength.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Plan Reference Number must be 10 digits long.
          </div>
        </div>

        <a name="patient"></a>
        <h2>Patient Information</h2>
        <div class="section-container p-3">
          <PhnInput
            id="phn"
            v-model="phn"
            label="Personal Health Number (PHN):"
            cypress-id="PHN"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.phn)"
          />
          <div
            v-if="v$.phn.$dirty && v$.phn.required.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Personal Health Number (PHN) is required.
          </div>
          <div
            v-if="
              v$.phn.$dirty &&
              !v$.phn.required.$invalid &&
              (v$.phn.phnValidator.$invalid || v$.phn.phnNineValidator.$invalid)
            "
            class="text-danger"
            aria-live="assertive"
          >
            Personal Health Number (PHN) must be a valid British Columbia PHN.
          </div>
          <DigitInput
            id="dependent-number"
            v-model="dependentNumber"
            :label="'Dependant' + (isCSR ? '' : ' (optional)') + ':'"
            class-name="mt-3"
            maxlength="2"
            :input-style="extraSmallStyles"
            @blur="handleBlurField(v$.dependentNumber)"
          />
          <div
            v-if="v$.dependentNumber.$dirty && v$.dependentNumber.intValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Dependant must be an integer.
          </div>
          <div
            v-if="v$.dependentNumber.$dirty && v$.dependentNumber.positiveNumberValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Dependant must be a positive number.
          </div>
          <div
            v-if="
              v$.dependentNumber.$dirty &&
              !v$.dependentNumber.intValidator.$invalid &&
              !v$.dependentNumber.positiveNumberValidator.$invalid &&
              v$.dependentNumber.dependentNumberValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Dependant must be 00 or 66 for this PHN.
          </div>
          <InputComponent
            id="first-name"
            v-model="firstName"
            label="Patient Legal First Name:"
            cypress-id="patientFirstName"
            class-name="mt-3"
            maxlength="12"
            :input-style="mediumStyles"
            @blur="handleBlurField(v$.firstName)"
          />
          <div
            v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Patient Legal First Name is required.
          </div>
          <div
            v-if="
              v$.firstName.$dirty &&
              !v$.firstName.required.$invalid &&
              v$.firstName.nameValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Patient Legal First Name must begin with a letter and cannot include special characters
            except hyphens, periods, apostrophes and blank characters.
          </div>
          <InputComponent
            id="middle-initial"
            v-model="middleInitial"
            :label="'Second Name Initial' + (isCSR ? '' : ' (optional)') + ':'"
            class-name="mt-3"
            maxlength="1"
            :input-style="extraSmallStyles"
            @blur="handleBlurField(v$.middleInitial)"
          />
          <div
            v-if="v$.middleInitial.$dirty && v$.middleInitial.nameInitialValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Second name initial must be a letter.
          </div>
          <InputComponent
            id="last-name"
            v-model="lastName"
            label="Patient Legal Last Name:"
            cypress-id="patientLastName"
            class-name="mt-3"
            maxlength="18"
            :input-style="mediumStyles"
            @blur="handleBlurField(v$.lastName)"
          />
          <div
            v-if="v$.lastName.$dirty && v$.lastName.required.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Patient Legal Last Name is required.
          </div>
          <div
            v-if="
              v$.lastName.$dirty &&
              !v$.lastName.required.$invalid &&
              v$.lastName.nameValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Patient Legal Last Name must begin with a letter and cannot include special characters
            except hyphens, periods, apostrophes and blank characters.
          </div>
          <DateInput
            id="birth-date"
            v-model="birthDate"
            :label="
              'Patient Birth Date' + (dependentNumber === '66' && !isCSR ? ' (optional)' : '') + ':'
            "
            cypress-id="patientBirthDate"
            class-name="mt-3"
            @blur="handleBlurField(v$.birthDate)"
            @process-date="handleProcessBirthDate($event)"
          />
          <div
            v-if="v$.birthDate.$dirty && v$.birthDate.birthDateValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Patient Birth Date must be valid.
          </div>
          <div
            v-if="
              v$.birthDate.$dirty &&
              !v$.birthDate.birthDateValidator.$invalid &&
              v$.birthDate.distantPastValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Patient Birth Date must be valid.
          </div>
          <div
            v-if="
              v$.birthDate.$dirty &&
              dependentNumber !== '66' &&
              !v$.birthDate.birthDateValidator.$invalid &&
              v$.birthDate.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Patient Birth Date is required.
          </div>
          <div
            v-if="v$.birthDate.$dirty && v$.birthDate.birthDatePastValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Patient Birth Date cannot be in the future.
          </div>
        </div>

        <a name="vehicle-accident"></a>
        <div class="section-container p-3 mt-5">
          <RadioComponent
            v-model="isVehicleAccident"
            label="Is this claim related to a motor vehicle accident?"
            cypress-id="motorVehicleAccident"
            :items="isVehicleAccidentOptions"
            @blur="handleBlurField(v$.isVehicleAccident)"
          />
          <div
            v-if="v$.isVehicleAccident.$dirty && v$.isVehicleAccident.required.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Answer to question is required.
          </div>
          <InputComponent
            id="vehicle-accident-claim-number"
            v-model="vehicleAccidentClaimNumber"
            :label="'Motor Vehicle Accident Claim Number' + (isCSR ? '' : ' (optional)') + ':'"
            maxlength="8"
            :is-upper-case-forced="true"
            class="mt-3"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.vehicleAccidentClaimNumber)"
          />
          <div
            v-if="
              v$.vehicleAccidentClaimNumber.$dirty &&
              (v$.vehicleAccidentClaimNumber.motorVehicleAccidentClaimNumberValidator.$invalid ||
                v$.vehicleAccidentClaimNumber.motorVehicleAccidentClaimNumberMaskValidator
                  .$invalid ||
                v$.vehicleAccidentClaimNumber.alphanumericValidator.$invalid)
            "
            class="text-danger"
            aria-live="assertive"
          >
            Motor Vehicle Accident Claim Number must be valid.
          </div>
        </div>

        <a name="claim-info"></a>
        <div class="section-container p-3 mt-5">
          <DigitInput
            id="plan-reference-number-of-original-claim"
            v-model="planReferenceNumberOfOriginalClaim"
            :label="'Plan Reference Number of Original Claim' + (isCSR ? '' : ' (optional)') + ':'"
            maxlength="10"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.planReferenceNumberOfOriginalClaim)"
          />
          <div
            v-if="
              v$.planReferenceNumberOfOriginalClaim.$dirty &&
              v$.planReferenceNumberOfOriginalClaim.intValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Motor Vehicle Accident Claim Number must be an integer.
          </div>
          <div
            v-if="
              v$.planReferenceNumberOfOriginalClaim.$dirty &&
              v$.planReferenceNumberOfOriginalClaim.positiveNumberValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Motor Vehicle Accident Claim Number must be a positive number.
          </div>
        </div>

        <div
          v-for="(claim, index) in medicalServiceClaims"
          :key="'medical-service-claim-' + index"
        >
          <a :name="'medical-service-claim-' + index"></a>
          <h2 class="mt-5">{{ getMedicalServiceClaimTitle(index) }}</h2>
          <div class="section-container p-3">
            <MedicalServiceClaimsFormItem
              v-model:service-date="claim.serviceDate"
              v-model:service-date-data="claim.serviceDateData"
              v-model:number-of-services="claim.numberOfServices"
              v-model:service-clarification-code="claim.serviceClarificationCode"
              v-model:fee-item="claim.feeItem"
              v-model:amount-billed="claim.amountBilled"
              v-model:called-start-time="claim.calledStartTime"
              v-model:rendered-finish-time="claim.renderedFinishTime"
              v-model:diagnostic-code="claim.diagnosticCode"
              v-model:location-of-service="claim.locationOfService"
              v-model:correspondence-attached="claim.correspondenceAttached"
              v-model:submission-code="claim.submissionCode"
              v-model:notes="claim.notes"
              v-model:medical-service-claims-fee-item-validation-error="
                medicalServiceClaimsFeeItemValidationError[index]
              "
              :index="index"
            />
          </div>
        </div>

        <div
          v-for="(claim, index) in hospitalVisitClaims"
          :key="'hospital-visit-claim' + index"
        >
          <a :name="'hospital-visit-claim-' + index"></a>
          <h2 class="mt-5">{{ getHospitalVisitClaimTitle(index) }}</h2>
          <div class="section-container p-3">
            <HospitalVisitClaimsFormItem
              v-model:month="claim.month"
              v-model:day-from="claim.dayFrom"
              v-model:day-to="claim.dayTo"
              v-model:year="claim.year"
              v-model:number-of-services="claim.numberOfServices"
              v-model:service-clarification-code="claim.serviceClarificationCode"
              v-model:fee-item="claim.feeItem"
              v-model:amount-billed="claim.amountBilled"
              v-model:diagnostic-code="claim.diagnosticCode"
              v-model:location-of-service="claim.locationOfService"
              v-model:correspondence-attached="claim.correspondenceAttached"
              v-model:submission-code="claim.submissionCode"
              v-model:notes="claim.notes"
              v-model:hospital-visit-claims-fee-item-validation-error="
                hospitalVisitClaimsFeeItemValidationError[index]
              "
              :index="index"
            />
          </div>
        </div>

        <a name="practitioner"></a>
        <h2 class="mt-5">Practitioner Information</h2>
        <div class="section-container p-3">
          <div class="tip-box-container float-md-right mb-3 border">
            <TipBox>
              <p>
                To confirm that the Medical Practitioner is active, the following fields will
                automatically be validated against Medical Services Plan records:
              </p>
              <ul>
                <li>First name</li>
                <li>Last name</li>
                <li>Medical Services Plan Practitioner Number</li>
              </ul>
            </TipBox>
          </div>
          <InputComponent
            id="practitioner-last-name"
            v-model="practitionerLastName"
            label="Practitioner Last Name:"
            cypress-id="practitionerLastName"
            maxlength="35"
            :input-style="mediumStyles"
            @blur="handleBlurField(v$.practitionerLastName)"
            @input="handleInputPractitioner()"
          />
          <div
            v-if="v$.practitionerLastName.$dirty && v$.practitionerLastName.required.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner Last Name is required.
          </div>
          <div
            v-if="
              v$.practitionerLastName.$dirty &&
              !v$.practitionerLastName.required.$invalid &&
              v$.practitionerLastName.nameValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner Last Name must begin with a letter and cannot include special characters
            except hyphens, periods, apostrophes and blank characters.
          </div>
          <div
            v-if="isPractitionerErrorShown"
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner information does not match our records.
          </div>
          <InputComponent
            id="practitioner-first-name"
            v-model="practitionerFirstName"
            label="Practitioner First Name:"
            cypress-id="practitionerFirstName"
            maxlength="15"
            class="mt-3"
            :input-style="mediumStyles"
            @blur="handleBlurField(v$.practitionerFirstName)"
            @input="handleInputPractitioner()"
          />
          <div
            v-if="v$.practitionerFirstName.$dirty && v$.practitionerFirstName.required.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner First Name is required.
          </div>
          <div
            v-if="
              v$.practitionerFirstName.$dirty &&
              !v$.practitionerFirstName.required.$invalid &&
              v$.practitionerFirstName.nameValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner First Name must begin with a letter and cannot include special characters
            except hyphens, periods, apostrophes and blank characters.
          </div>
          <div
            v-if="isPractitionerErrorShown"
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner information does not match our records.
          </div>
          <!-- Using PractitionerNumberInput because it has the same character format. -->
          <PractitionerNumberInput
            id="payment-number"
            v-model="practitionerPaymentNumber"
            label="Payment Number:"
            cypress-id="paymentNumber"
            class="mt-3"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.practitionerPaymentNumber)"
          />
          <div
            v-if="
              v$.practitionerPaymentNumber.$dirty && v$.practitionerPaymentNumber.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Payment number is required.
          </div>
          <div
            v-if="
              v$.practitionerPaymentNumber.$dirty &&
              !v$.practitionerPaymentNumber.required.$invalid &&
              v$.practitionerPaymentNumber.minLength.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Payment number must not be less than 5 characters.
          </div>
          <PractitionerNumberInput
            id="practitioner-number"
            v-model="practitionerPractitionerNumber"
            label="Practitioner Number:"
            cypress-id="practitionerNumber"
            class="mt-3"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.practitionerPractitionerNumber)"
            @input="handleInputPractitioner()"
          />
          <div
            v-if="
              v$.practitionerPractitionerNumber.$dirty &&
              v$.practitionerPractitionerNumber.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner number is required.
          </div>
          <div
            v-if="
              v$.practitionerPractitionerNumber.$dirty &&
              !v$.practitionerPractitionerNumber.required.$invalid &&
              v$.practitionerPractitionerNumber.minLength.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner number must not be less than 5 characters.
          </div>
          <div
            v-if="isPractitionerErrorShown"
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner information does not match our records.
          </div>
          <InputComponent
            id="specialty-code"
            v-model="practitionerSpecialtyCode"
            :label="'Specialty Code' + (isCSR ? '' : ' (optional)') + ':'"
            class="mt-3"
            maxlength="2"
            :input-style="extraSmallStyles"
            @blur="handleBlurField(v$.practitionerSpecialtyCode)"
          />
          <div
            v-if="
              v$.practitionerSpecialtyCode.$dirty &&
              v$.practitionerSpecialtyCode.alphanumericValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Specialty Code must be alphanumeric.
          </div>
          <div
            v-if="
              v$.practitionerSpecialtyCode.$dirty && v$.practitionerSpecialtyCode.minLength.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Specialty Code cannot be less than 2 characters.
          </div>
          <div
            v-if="
              v$.practitionerSpecialtyCode.$dirty &&
              !v$.practitionerSpecialtyCode.minLength.$invalid &&
              !v$.practitionerSpecialtyCode.alphanumericValidator.$invalid &&
              v$.practitionerSpecialtyCode.specialtyCodeValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Specialty Code is invalid.
          </div>
          <FacilityNumberInput
            id="facility-number"
            v-model="practitionerFacilityNumber"
            :label="'Facility Number' + (isCSR ? '' : ' (optional)') + ':'"
            class="mt-3"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.practitionerFacilityNumber)"
          />
          <div
            v-if="
              v$.practitionerFacilityNumber.$dirty &&
              v$.practitionerFacilityNumber.minLength.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Facility number must not be less than 5 characters.
          </div>
          <DigitInput
            id="coverage-pre-authorization-number"
            v-model="coveragePreAuthNumber"
            :label="'Coverage Pre-Authorization Number' + (isCSR ? '' : ' (optional)') + ':'"
            class="mt-3"
            maxlength="4"
            :input-style="smallStyles"
            @blur="handleBlurField(v$.coveragePreAuthNumber)"
          />
          <div
            v-if="v$.coveragePreAuthNumber.$dirty && v$.coveragePreAuthNumber.minLength.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Coverage Pre-Authorization Number cannot be less than 4 characters.
          </div>
          <div
            v-if="v$.coveragePreAuthNumber.$dirty && v$.coveragePreAuthNumber.intValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Coverage Pre-Authorization Number must be an integer.
          </div>
          <div
            v-if="
              v$.coveragePreAuthNumber.$dirty &&
              v$.coveragePreAuthNumber.positiveNumberValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Coverage Pre-Authorization Number must be a positive number.
          </div>
        </div>

        <a name="referred-by"></a>
        <h2 class="mt-5">Referred By</h2>
        <div class="section-container p-3">
          <PractitionerNumberInput
            id="referred-by-practitioner-number"
            v-model="referredByPractitionerNumber"
            :label="
              'Referred By Practitioner Number' +
              (isReferredByRequired || isCSR ? '' : ' (optional)') +
              ':'
            "
            :input-style="smallStyles"
            @blur="handleBlurField(v$.referredByPractitionerNumber)"
          />
          <div
            v-if="
              isReferredByRequired &&
              v$.referredByPractitionerNumber.$dirty &&
              v$.referredByPractitionerNumber.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner number is required.
          </div>
          <div
            v-if="
              v$.referredByPractitionerNumber.$dirty &&
              v$.referredByPractitionerNumber.minLength.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner number must not be less than 5 characters.
          </div>
          <InputComponent
            id="referred-by-last-name"
            v-model="referredByLastName"
            :label="
              'Referred By Practitioner Last Name' +
              (isReferredByRequired || isCSR ? '' : ' (optional)') +
              ':'
            "
            maxlength="18"
            class="mt-3"
            :input-style="mediumStyles"
            @blur="handleBlurField(v$.referredByLastName)"
          />
          <div
            v-if="
              isReferredByRequired &&
              v$.referredByLastName.$dirty &&
              v$.referredByLastName.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Last name is required.
          </div>
          <div
            v-if="v$.referredByLastName.$dirty && v$.referredByLastName.nameValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Last name must begin with a letter and cannot include special characters except hyphens,
            periods, apostrophes and blank characters.
          </div>
          <InputComponent
            id="referred-by-first-name-initial"
            v-model="referredByFirstNameInitial"
            :label="
              'Referred By Practitioner First Name Initial' +
              (isReferredByRequired || isCSR ? '' : ' (optional)') +
              ':'
            "
            maxlength="1"
            class="mt-3"
            :input-style="extraSmallStyles"
            @blur="handleBlurField(v$.referredByFirstNameInitial)"
          />
          <div
            v-if="
              isReferredByRequired &&
              v$.referredByFirstNameInitial.$dirty &&
              v$.referredByFirstNameInitial.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            First Name Initial is required.
          </div>
          <div
            v-if="
              v$.referredByFirstNameInitial.$dirty &&
              v$.referredByFirstNameInitial.alphaValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            First Name Initial must only contain an alphabetic character.
          </div>
        </div>

        <a name="referred-to"></a>
        <h2 class="mt-5">Referred To</h2>
        <div class="section-container p-3">
          <PractitionerNumberInput
            id="referred-to-practitioner-number"
            v-model="referredToPractitionerNumber"
            :label="
              'Referred To Practitioner Number' +
              (isReferredToRequired || isCSR ? '' : ' (optional)') +
              ':'
            "
            :input-style="smallStyles"
            @blur="handleBlurField(v$.referredToPractitionerNumber)"
          />
          <div
            v-if="
              isReferredToRequired &&
              v$.referredToPractitionerNumber.$dirty &&
              v$.referredToPractitionerNumber.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner number is required.
          </div>
          <div
            v-if="
              v$.referredToPractitionerNumber.$dirty &&
              v$.referredToPractitionerNumber.minLength.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Practitioner number must not be less than 5 characters.
          </div>
          <InputComponent
            id="referred-to-last-name"
            v-model="referredToLastName"
            :label="
              'Referred To Practitioner Last Name' +
              (isReferredToRequired || isCSR ? '' : ' (optional)') +
              ':'
            "
            maxlength="18"
            class="mt-3"
            :input-style="mediumStyles"
            @blur="handleBlurField(v$.referredToLastName)"
          />
          <div
            v-if="
              isReferredToRequired &&
              v$.referredToLastName.$dirty &&
              v$.referredToLastName.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            Last name is required.
          </div>
          <div
            v-if="v$.referredToLastName.$dirty && v$.referredToLastName.nameValidator.$invalid"
            class="text-danger"
            aria-live="assertive"
          >
            Last name must begin with a letter and cannot include special characters except hyphens,
            periods, apostrophes and blank characters.
          </div>
          <InputComponent
            id="referred-to-first-name-initial"
            v-model="referredToFirstNameInitial"
            :label="
              'Referred To Practitioner First Name Initial' +
              (isReferredToRequired || isCSR ? '' : ' (optional)') +
              ':'
            "
            maxlength="1"
            class="mt-3"
            :input-style="extraSmallStyles"
            @blur="handleBlurField(v$.referredToFirstNameInitial)"
          />
          <div
            v-if="
              isReferredToRequired &&
              v$.referredToFirstNameInitial.$dirty &&
              v$.referredToFirstNameInitial.required.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            First Name Initial is required.
          </div>
          <div
            v-if="
              v$.referredToFirstNameInitial.$dirty &&
              v$.referredToFirstNameInitial.alphaValidator.$invalid
            "
            class="text-danger"
            aria-live="assertive"
          >
            First Name Initial must only contain an alphabetic character.
          </div>
        </div>
        <div
          v-if="isSystemUnavailable"
          class="text-danger my-4"
        >
          Unable to continue, system unavailable. Please try again later.
        </div>
      </div>
    </PageContent>
    <PromptModal
      v-if="isValidationModalShown"
      title="Warning"
      @yes="validationModalYesHandler()"
      @no="validationModalNoHandler()"
    >
      <p>The following items do not match our records:</p>
      <ul v-if="validationWarningList.length > 0">
        <li
          v-for="(item, index) in validationWarningList"
          :key="index"
          class="text-danger validation-warning-item"
        >
          {{ item }}
        </li>
      </ul>
      <p>Do you wish to continue?</p>
    </PromptModal>
    <ContinueBar
      cypress-id="continueBar"
      :has-loader="isValidating"
      @continue="validateFields()"
    />
  </div>
</template>

<script>
import pageStateService from "@/services/page-state-service";
import apiService from "@/services/api-service";
import { payPractitionerRoutes, isPastPath } from "@/router/routes";
import { scrollTo, scrollToError, getTopScrollPosition } from "@/helpers/scroll";
import { getConvertedPath, isCSR } from "@/helpers/url";
import {
  birthDateValidator,
  motorVehicleAccidentClaimNumberMaskValidator,
  specialtyCodeValidator,
  phnNineValidator,
} from "@/helpers/validators";
import { extraSmallStyles, smallStyles, mediumStyles } from "@/constants/input-styles";
import PageContent from "@/components/PageContent.vue";
import TipBox from "@/components/TipBox.vue";
import MedicalServiceClaimsFormItem from "@/components/MedicalServiceClaimsFormItem.vue";
import HospitalVisitClaimsFormItem from "@/components/HospitalVisitClaimsFormItem.vue";
import {
  MODULE_NAME as formModule,
  SET_PLAN_REFERENCE_NUMBER,
  SET_PHN,
  SET_DEPENDENT_NUMBER,
  SET_FIRST_NAME,
  SET_MIDDLE_INITIAL,
  SET_LAST_NAME,
  SET_BIRTH_DATE,
  SET_IS_VEHICLE_ACCIDENT,
  SET_VEHICLE_ACCIDENT_CLAIM_NUMBER,
  SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM,
  SET_COVERAGE_PRE_AUTH_NUMBER,
  SET_HOSPITAL_VISIT_CLAIMS,
  SET_MEDICAL_SERVICE_CLAIMS,
  SET_PRACTITIONER_LAST_NAME,
  SET_PRACTITIONER_FIRST_NAME,
  SET_PRACTITIONER_PAYMENT_NUMBER,
  SET_PRACTITIONER_PRACTITIONER_NUMBER,
  SET_PRACTITIONER_SPECIALTY_CODE,
  SET_REFERRED_BY_LAST_NAME,
  SET_REFERRED_BY_FIRST_NAME_INITIAL,
  SET_REFERRED_BY_PRACTITIONER_NUMBER,
  SET_REFERRED_TO_LAST_NAME,
  SET_REFERRED_TO_FIRST_NAME_INITIAL,
  SET_REFERRED_TO_PRACTITIONER_NUMBER,
  SET_PRACTITIONER_FACILITY_NUMBER,
} from "@/store/modules/pay-practitioner-form";
import logService from "@/services/log-service";
import { required, requiredIf, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {
  DateInput,
  DigitInput,
  FacilityNumberInput,
  InputComponent,
  PhnInput,
  PractitionerNumberInput,
  PromptModal,
  RadioComponent,
  alphanumericValidator,
  alphaValidator,
  cloneDeep,
  distantPastValidator,
  intValidator,
  motorVehicleAccidentClaimNumberValidator,
  padLeadingZeros,
  pastDateValidator,
  positiveNumberValidator,
  optionalValidator,
  phnValidator,
  ContinueBar
} from "common-lib-vue";
import { isSameDay, startOfToday } from "date-fns";

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
  if (phn && phn[0] === "9" && !(value === "00" || value === "66")) {
    return false;
  }
  return true;
};

const birthDatePastValidator = (value) => {
  return pastDateValidator(value) || isSameDay(value, startOfToday());
};

const MAX_MEDICAL_SERVICE_CLAIMS = 4;
const MAX_HOSPITAL_VISIT_CLAIMS = 2;

export default {
  name: "MainFormPage",
  components: {
    ContinueBar,
    DateInput,
    DigitInput,
    FacilityNumberInput,
    HospitalVisitClaimsFormItem,
    InputComponent: InputComponent,
    MedicalServiceClaimsFormItem,
    PageContent,
    PhnInput,
    PractitionerNumberInput,
    PromptModal,
    RadioComponent,
    TipBox,
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (pageStateService.isPageComplete(to.path) || isPastPath(to.path, from.path)) {
      this.saveData();
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      const toPath = getConvertedPath(
        this.$router.currentRoute.value.path,
        payPractitionerRoutes.MAIN_FORM_PAGE.path
      );
      next({
        path: toPath,
        replace: true,
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data: () => {
    return {
      isPageLoaded: false,
      isValidationModalShown: false,

      isValidating: false,
      isSystemUnavailable: false,
      isPractitionerErrorShown: false,
      medicalServiceClaimsFeeItemValidationError: [],
      hospitalVisitClaimsFeeItemValidationError: [],
      addressOwnerOptions: [
        {
          id: "address-owner-practitioner",
          label: "Practitioner",
          value: "PRACTITIONER",
        },
        {
          id: "address-owner-patient",
          label: "Patient",
          value: "PATIENT",
        },
      ],
      isVehicleAccidentOptions: [
        {
          id: "is-vehicle-accident-y",
          label: "Yes",
          value: "Y",
        },
        {
          id: "is-vehicle-accident-n",
          label: "No",
          value: "N",
        },
      ],
      extraSmallStyles,
      smallStyles,
      mediumStyles,

      planReferenceNumber: null,

      phn: null,
      dependentNumber: null,
      firstName: null,
      middleInitial: null,
      lastName: null,
      birthDate: null,
      birthDateData: null,

      isVehicleAccident: null,
      vehicleAccidentClaimNumber: null,
      planReferenceNumberOfOriginalClaim: null,
      coveragePreAuthNumber: null,
      procedureOrOperation: null,

      medicalServiceClaims: [],
      hospitalVisitClaims: [],

      practitionerLastName: null,
      practitionerFirstName: null,
      practitionerPaymentNumber: null,
      practitionerPractitionerNumber: null,
      practitionerFacilityNumber: null,
      practitionerSpecialtyCode: null,

      referredByFirstNameInitial: null,
      referredByLastName: null,
      referredByPractitionerNumber: null,

      referredToLastName: null,
      referredToFirstNameInitial: null,
      referredToPractitionerNumber: null,
    };
  },
  computed: {
    isReferredByRequired() {
      return (
        (!!this.referredByFirstNameInitial ||
          !!this.referredByLastName ||
          !!this.referredByPractitionerNumber) &&
        !isCSR(this.$router.currentRoute.value.path)
      );
    },
    isReferredToRequired() {
      return (
        (!!this.referredToFirstNameInitial ||
          !!this.referredToLastName ||
          !!this.referredToPractitionerNumber ||
          this.isContainingNoChargeFeeItem()) &&
        !isCSR(this.$router.currentRoute.value.path)
      );
    },
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
    },
    validationWarningList() {
      const result = [];
      result.push("Placeholder field name");
      return result;
    },
  },
  created() {
    this.planReferenceNumber = this.$store.state.payPractitionerForm.planReferenceNumber;

    this.phn = this.$store.state.payPractitionerForm.phn;
    this.dependentNumber = this.$store.state.payPractitionerForm.dependentNumber;
    this.firstName = this.$store.state.payPractitionerForm.firstName;
    this.middleInitial = this.$store.state.payPractitionerForm.middleInitial;
    this.lastName = this.$store.state.payPractitionerForm.lastName;
    this.birthDate = this.$store.state.payPractitionerForm.birthDate;

    this.isVehicleAccident = this.$store.state.payPractitionerForm.isVehicleAccident;
    this.vehicleAccidentClaimNumber =
      this.$store.state.payPractitionerForm.vehicleAccidentClaimNumber;
    this.planReferenceNumberOfOriginalClaim =
      this.$store.state.payPractitionerForm.planReferenceNumberOfOriginalClaim;
    this.coveragePreAuthNumber = this.$store.state.payPractitionerForm.coveragePreAuthNumber;
    this.procedureOrOperation = this.$store.state.payPractitionerForm.procedureOrOperation;

    this.medicalServiceClaims = this.$store.state.payPractitionerForm.medicalServiceClaims
      ? cloneDeep(this.$store.state.payPractitionerForm.medicalServiceClaims)
      : [];
    this.hospitalVisitClaims = this.$store.state.payPractitionerForm.hospitalVisitClaims
      ? cloneDeep(this.$store.state.payPractitionerForm.hospitalVisitClaims)
      : [];

    this.practitionerLastName = this.$store.state.payPractitionerForm.practitionerLastName;
    this.practitionerFirstName = this.$store.state.payPractitionerForm.practitionerFirstName;
    this.practitionerPaymentNumber =
      this.$store.state.payPractitionerForm.practitionerPaymentNumber;
    this.practitionerPractitionerNumber =
      this.$store.state.payPractitionerForm.practitionerPractitionerNumber;
    this.practitionerFacilityNumber =
      this.$store.state.payPractitionerForm.practitionerFacilityNumber;
    this.practitionerSpecialtyCode =
      this.$store.state.payPractitionerForm.practitionerSpecialtyCode;

    this.referredByFirstNameInitial =
      this.$store.state.payPractitionerForm.referredByFirstNameInitial;
    this.referredByLastName = this.$store.state.payPractitionerForm.referredByLastName;
    this.referredByPractitionerNumber =
      this.$store.state.payPractitionerForm.referredByPractitionerNumber;

    this.referredToLastName = this.$store.state.payPractitionerForm.referredToLastName;
    this.referredToFirstNameInitial =
      this.$store.state.payPractitionerForm.referredToFirstNameInitial;
    this.referredToPractitionerNumber =
      this.$store.state.payPractitionerForm.referredToPractitionerNumber;

    for (let i = 0; i < MAX_MEDICAL_SERVICE_CLAIMS; i++) {
      this.medicalServiceClaimsFeeItemValidationError.push(false);
    }
    for (let i = 0; i < MAX_HOSPITAL_VISIT_CLAIMS; i++) {
      this.hospitalVisitClaimsFeeItemValidationError.push(false);
    }

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    logService.logNavigation(
      this.$store.state.payPractitionerForm.applicationUuid,
      payPractitionerRoutes.MAIN_FORM_PAGE.path,
      payPractitionerRoutes.MAIN_FORM_PAGE.title
    );
  },
  validations() {
    const isCSRRoute = isCSR(this.$router.currentRoute.value.path);
    const alwaysValidValidator = () => {
      return true;
    };
    const validations = {
      planReferenceNumber: {},
      phn: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        phnValidator: optionalValidator(phnValidator),
        phnNineValidator: optionalValidator(phnNineValidator),
      },
      dependentNumber: {
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        dependentNumberValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : dependentNumberValidator
        ),
      },
      firstName: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        nameValidator: optionalValidator(nameValidator),
      },
      middleInitial: {
        nameInitialValidator: optionalValidator(nameInitialValidator),
      },
      lastName: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        nameValidator: optionalValidator(nameValidator),
      },
      birthDate: {
        required: requiredIf(() => {
          return !isCSR(this.$router.currentRoute.value.path) && this.dependentNumber !== "66";
        }),
        birthDatePastValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : birthDatePastValidator
        ),
        birthDateValidator,
        distantPastValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : distantPastValidator
        ),
      },
      isVehicleAccident: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
      },
      vehicleAccidentClaimNumber: {
        alphanumericValidator: optionalValidator(alphanumericValidator),
        motorVehicleAccidentClaimNumberValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : motorVehicleAccidentClaimNumberValidator
        ),
        motorVehicleAccidentClaimNumberMaskValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : motorVehicleAccidentClaimNumberMaskValidator
        ),
      },
      planReferenceNumberOfOriginalClaim: {
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
      },
      practitionerLastName: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        nameValidator: optionalValidator(nameValidator),
      },
      practitionerFirstName: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        nameValidator: optionalValidator(nameValidator),
      },
      practitionerPaymentNumber: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        minLength: minLength(5),
      },
      practitionerPractitionerNumber: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        minLength: minLength(5),
      },
      practitionerFacilityNumber: {
        minLength: isCSRRoute ? alwaysValidValidator : minLength(5),
      },
      practitionerSpecialtyCode: {
        alphanumericValidator: optionalValidator(alphanumericValidator),
        minLength: isCSRRoute ? alwaysValidValidator : minLength(2),
        specialtyCodeValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : specialtyCodeValidator
        ),
      },
      coveragePreAuthNumber: {
        minLength: isCSRRoute || !this.coveragePreAuthNumber ? alwaysValidValidator : minLength(4),
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
      },
      referredByFirstNameInitial: {
        alphaValidator: optionalValidator(alphaValidator),
      },
      referredByLastName: {
        nameValidator: optionalValidator(nameValidator),
      },
      referredByPractitionerNumber: {
        minLength: !this.referredByPractitionerNumber ? alwaysValidValidator : minLength(5),
      },
      referredToFirstNameInitial: {
        alphaValidator: optionalValidator(alphaValidator),
      },
      referredToLastName: {
        nameValidator: optionalValidator(nameValidator),
      },
      referredToPractitionerNumber: {
        minLength: !this.referredToPractitionerNumber ? alwaysValidValidator : minLength(5),
      },
    };
    if (this.dependentNumber !== "66" && !isCSR(this.$router.currentRoute.value.path)) {
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
    handleInputPractitioner() {
      this.isPractitionerErrorShown = false;
    },
    validateFields() {
      // If no dependent number is given, then default to "00".
      if (!this.dependentNumber) {
        this.dependentNumber = "00";
      }
      // Iterate over all "Service" claims.
      for (let i = 0; i < this.medicalServiceClaims.length; i++) {
        // Pad Fee Items with leading zeros.
        if (this.medicalServiceClaims[i].feeItem) {
          this.medicalServiceClaims[i].feeItem = padLeadingZeros(
            this.medicalServiceClaims[i].feeItem,
            5
          );
        }

        // Set default "numberOfServices" to 00
        if (!this.medicalServiceClaims[i].numberOfServices) {
          this.medicalServiceClaims[i].numberOfServices = "00";
        }

        // Set default "calledStartTime" to "00:00".
        if (
          !this.medicalServiceClaims[i].calledStartTime ||
          (!this.medicalServiceClaims[i].calledStartTime.hour &&
            !this.medicalServiceClaims[i].calledStartTime.minute)
        ) {
          this.medicalServiceClaims[i].calledStartTime = {
            hour: "00",
            minute: "00",
            time: "00:00",
          };
        }
        // Set default "renderedFinishTime" to "00:00".
        if (
          !this.medicalServiceClaims[i].renderedFinishTime ||
          (!this.medicalServiceClaims[i].renderedFinishTime.hour &&
            !this.medicalServiceClaims[i].renderedFinishTime.minute)
        ) {
          this.medicalServiceClaims[i].renderedFinishTime = {
            hour: "00",
            minute: "00",
            time: "00:00",
          };
        }
      }
      // Iterate over all "Hospital Visit" claims.
      for (let i = 0; i < this.hospitalVisitClaims.length; i++) {
        // Pad Fee Items with leading zeros.
        if (this.hospitalVisitClaims[i].feeItem) {
          this.hospitalVisitClaims[i].feeItem = padLeadingZeros(
            this.hospitalVisitClaims[i].feeItem,
            5
          );
        }

        // Set default "numberOfServices" to 00
        if (!this.hospitalVisitClaims[i].numberOfServices) {
          this.hospitalVisitClaims[i].numberOfServices = "00";
        }
      }

      this.v$.$touch();
      if (this.v$.$invalid) {
        scrollToError();
        return;
      }

      this.isValidating = true;
      this.isSystemUnavailable = false;
      this.isPractitionerErrorShown = false;
      for (let i = 0; i < this.medicalServiceClaimsFeeItemValidationError.length; i++) {
        this.medicalServiceClaimsFeeItemValidationError[i] = false;
      }

      const token = this.$store.state.payPractitionerForm.captchaToken;
      const applicationUuid = this.$store.state.payPractitionerForm.applicationUuid;

      if (!isCSR(this.$router.currentRoute.value.path)) {
        // Do server-side validation.
        apiService
          .validateApplication(token, {
            applicationUuid: applicationUuid,
            practitionerFirstName: this.practitionerFirstName || "",
            practitionerLastName: this.practitionerLastName || "",
            practitionerNumber: this.practitionerPractitionerNumber || "",
            serviceFeeItem1:
              this.medicalServiceClaims[0] && this.medicalServiceClaims[0].feeItem
                ? this.medicalServiceClaims[0].feeItem
                : "",
            serviceFeeItem2:
              this.medicalServiceClaims[1] && this.medicalServiceClaims[1].feeItem
                ? this.medicalServiceClaims[1].feeItem
                : "",
            serviceFeeItem3:
              this.medicalServiceClaims[2] && this.medicalServiceClaims[2].feeItem
                ? this.medicalServiceClaims[2].feeItem
                : "",
            serviceFeeItem4:
              this.medicalServiceClaims[3] && this.medicalServiceClaims[3].feeItem
                ? this.medicalServiceClaims[3].feeItem
                : "",
            serviceLocationCode1: "",
            serviceLocationCode2: "",
            serviceLocationCode3: "",
            serviceLocationCode4: "",
            hospitalFeeItem1:
              this.hospitalVisitClaims[0] && this.hospitalVisitClaims[0].feeItem
                ? this.hospitalVisitClaims[0].feeItem
                : "",
            hospitalFeeItem2:
              this.hospitalVisitClaims[1] && this.hospitalVisitClaims[1].feeItem
                ? this.hospitalVisitClaims[1].feeItem
                : "",
            hospitalLocationCode1: "",
            hospitalLocationCode2: "",
          })
          .then((response) => {
            const responseData = response.data;
            const returnCode = response.data.returnCode;
            let containsErrors = false;
            let containsWarnings = false;

            this.isValidating = false;

            switch (returnCode) {
              case "0": // Valid payload data.
                this.navigateToNextPage();
                break;
              case "1": // Invalid payload data.
                if (
                  responseData.practitionerFirstName === "N" ||
                  responseData.practitionerLastName === "N" ||
                  responseData.practitionerNumber === "N"
                ) {
                  this.isPractitionerErrorShown = true;
                  containsErrors = true;
                }
                for (let i = 0; i < MAX_MEDICAL_SERVICE_CLAIMS; i++) {
                  if (responseData["serviceFeeItem" + (i + 1)] === "N") {
                    this.medicalServiceClaimsFeeItemValidationError[i] = true;
                    containsErrors = true;
                  }
                }
                for (let i = 0; i < MAX_HOSPITAL_VISIT_CLAIMS; i++) {
                  if (responseData["hospitalFeeItem" + (i + 1)] === "N") {
                    this.hospitalVisitClaimsFeeItemValidationError[i] = true;
                    containsErrors = true;
                  }
                }
                if (containsErrors) {
                  scrollToError();
                } else if (containsWarnings) {
                  this.isValidationModalShown = true;
                }
                break;
              default: // An error occurred.
                this.isSystemUnavailable = true;
                scrollToError();
                break;
            }
          })
          .catch(() => {
            this.isValidating = false;
            this.isSystemUnavailable = true;
            scrollToError();
          });
      } else {
        this.navigateToNextPage();
      }
    },
    validationModalYesHandler() {
      this.navigateToNextPage();
    },
    validationModalNoHandler() {
      this.isValidationModalShown = false;
    },
    navigateToNextPage() {
      // Navigate to next path.
      const toPath = getConvertedPath(
        this.$router.currentRoute.value.path,
        payPractitionerRoutes.REVIEW_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    },
    saveData() {
      this.$store.dispatch(formModule + "/" + SET_PLAN_REFERENCE_NUMBER, this.planReferenceNumber);

      this.$store.dispatch(formModule + "/" + SET_PHN, this.phn);
      this.$store.dispatch(formModule + "/" + SET_DEPENDENT_NUMBER, this.dependentNumber);
      this.$store.dispatch(formModule + "/" + SET_FIRST_NAME, this.firstName);
      this.$store.dispatch(formModule + "/" + SET_MIDDLE_INITIAL, this.middleInitial);
      this.$store.dispatch(formModule + "/" + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(formModule + "/" + SET_BIRTH_DATE, this.birthDate);

      this.$store.dispatch(formModule + "/" + SET_IS_VEHICLE_ACCIDENT, this.isVehicleAccident);
      this.$store.dispatch(
        formModule + "/" + SET_VEHICLE_ACCIDENT_CLAIM_NUMBER,
        this.vehicleAccidentClaimNumber
      );

      this.$store.dispatch(
        formModule + "/" + SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM,
        this.planReferenceNumberOfOriginalClaim
      );

      this.$store.dispatch(
        formModule + "/" + SET_MEDICAL_SERVICE_CLAIMS,
        this.medicalServiceClaims
      );
      this.$store.dispatch(formModule + "/" + SET_HOSPITAL_VISIT_CLAIMS, this.hospitalVisitClaims);

      this.$store.dispatch(
        formModule + "/" + SET_PRACTITIONER_LAST_NAME,
        this.practitionerLastName
      );
      this.$store.dispatch(
        formModule + "/" + SET_PRACTITIONER_FIRST_NAME,
        this.practitionerFirstName
      );
      this.$store.dispatch(
        formModule + "/" + SET_PRACTITIONER_PAYMENT_NUMBER,
        this.practitionerPaymentNumber
      );
      this.$store.dispatch(
        formModule + "/" + SET_PRACTITIONER_PRACTITIONER_NUMBER,
        this.practitionerPractitionerNumber
      );
      this.$store.dispatch(
        formModule + "/" + SET_PRACTITIONER_FACILITY_NUMBER,
        this.practitionerFacilityNumber
      );
      this.$store.dispatch(
        formModule + "/" + SET_PRACTITIONER_SPECIALTY_CODE,
        this.practitionerSpecialtyCode
      );
      this.$store.dispatch(
        formModule + "/" + SET_COVERAGE_PRE_AUTH_NUMBER,
        this.coveragePreAuthNumber
      );

      this.$store.dispatch(
        formModule + "/" + SET_REFERRED_BY_FIRST_NAME_INITIAL,
        this.referredByFirstNameInitial
      );
      this.$store.dispatch(formModule + "/" + SET_REFERRED_BY_LAST_NAME, this.referredByLastName);
      this.$store.dispatch(
        formModule + "/" + SET_REFERRED_BY_PRACTITIONER_NUMBER,
        this.referredByPractitionerNumber
      );

      this.$store.dispatch(formModule + "/" + SET_REFERRED_TO_LAST_NAME, this.referredToLastName);
      this.$store.dispatch(
        formModule + "/" + SET_REFERRED_TO_FIRST_NAME_INITIAL,
        this.referredToFirstNameInitial
      );
      this.$store.dispatch(
        formModule + "/" + SET_REFERRED_TO_PRACTITIONER_NUMBER,
        this.referredToPractitionerNumber
      );
    },
    getMedicalServiceClaimTitle(index) {
      if (this.medicalServiceClaims && this.medicalServiceClaims.length > 1) {
        return `Service (${index + 1} of ${this.medicalServiceClaims.length})`;
      }
      return "Service";
    },
    getHospitalVisitClaimTitle(index) {
      if (this.hospitalVisitClaims && this.hospitalVisitClaims.length > 1) {
        return `Hospital Visit (${index + 1} of ${this.hospitalVisitClaims.length})`;
      }
      return "Hospital Visit";
    },
    isContainingNoChargeFeeItem() {
      for (let i = 0; i < this.medicalServiceClaims.length; i++) {
        if (this.medicalServiceClaims[i].feeItem === "03333") {
          return true;
        }
      }
      for (let i = 0; i < this.hospitalVisitClaims.length; i++) {
        if (this.hospitalVisitClaims[i].feeItem === "03333") {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
.validation-warning-item {
  font-size: 1rem;
}
.section-container {
  background-color: #eee;
}
@media only screen and (min-width: 768px) {
  .tip-box-container {
    max-width: 300px;
  }
}
</style>
