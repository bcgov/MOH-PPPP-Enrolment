<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Pay Practitioner Claim</h1>
        <hr class="mt-0"/>

        <div v-if='isCSR'
            class="section-container p-3 mb-5">
          <a name='plan-reference-number'></a>
          <DigitInput label='Plan Reference Number: (required)'
                id='plan-reference-number'
                cypressId="PRN"
                :isRequiredAsteriskShown='true'
                v-model='planReferenceNumber'
                maxlength='10'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.planReferenceNumber)' />
          <div class="text-danger"
              v-if="v$.planReferenceNumber.$dirty && v$.planReferenceNumber.required.$invalid"
              aria-live="assertive">Plan Reference Number is required.</div>
          <div class="text-danger"
              v-if="v$.planReferenceNumber.$dirty && !v$.planReferenceNumber.required.$invalid && v$.planReferenceNumber.intValidator.$invalid"
              aria-live="assertive">Plan Reference Number must be an integer.</div>
          <div class="text-danger"
              v-if="v$.planReferenceNumber.$dirty && !v$.planReferenceNumber.required.$invalid && v$.planReferenceNumber.positiveNumberValidator.$invalid"
              aria-live="assertive">Plan Reference Number must be a positive number.</div>
          <div class="text-danger"
              v-if="v$.planReferenceNumber.$dirty && !v$.planReferenceNumber.required.$invalid && v$.planReferenceNumber.minLength.$invalid"
              aria-live="assertive">Plan Reference Number must be 10 digits long.</div>
        </div>

        <a name='patient'></a>
        <h2>Patient Information</h2>
        <div class="section-container p-3">
          <PhnInput label='Personal Health Number (PHN):'
                id='phn'
                cypressId="PHN"
                v-model='phn'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.phn)' />
          <div class="text-danger"
              v-if="v$.phn.$dirty && v$.phn.required.$invalid"
              aria-live="assertive">Personal Health Number (PHN) is required.</div>
          <div class="text-danger"
              v-if="v$.phn.$dirty && !v$.phn.required.$invalid && (v$.phn.phnValidator.$invalid || v$.phn.phnNineValidator.$invalid)"
              aria-live="assertive">Personal Health Number (PHN) must be a valid British Columbia PHN.</div>
          <DigitInput 
                :label='"Dependant" + (isCSR ? "" : " (optional)") + ":"'
                id='dependent-number'
                className='mt-3'
                maxlength="2"
                v-model='dependentNumber'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.dependentNumber)' />
          <div class="text-danger"
              v-if="v$.dependentNumber.$dirty && v$.dependentNumber.intValidator.$invalid"
              aria-live="assertive">Dependant must be an integer.</div>
          <div class="text-danger"
              v-if="v$.dependentNumber.$dirty && v$.dependentNumber.positiveNumberValidator.$invalid"
              aria-live="assertive">Dependant must be a positive number.</div>
          <div class="text-danger"
              v-if="v$.dependentNumber.$dirty && !v$.dependentNumber.intValidator.$invalid && !v$.dependentNumber.positiveNumberValidator.$invalid && v$.dependentNumber.dependentNumberValidator.$invalid"
              aria-live="assertive">Dependant must be 00 or 66 for this PHN.</div>
          <InputComponent label='Patient Legal First Name:'
                id='first-name'
                cypressId="patientFirstName"
                className='mt-3'
                maxlength="12"
                v-model='firstName'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.firstName)' />
          <div class="text-danger"
              v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
              aria-live="assertive">Patient Legal First Name is required.</div>
          <div class="text-danger"
              v-if="v$.firstName.$dirty && !v$.firstName.required.$invalid && v$.firstName.nameValidator.$invalid"
              aria-live="assertive">Patient Legal First Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <InputComponent 
                :label='"Second Name Initial" + (isCSR ? "" : " (optional)") + ":"'
                id='middle-initial'
                className='mt-3'
                maxlength="1"
                v-model='middleInitial'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.middleInitial)' />
          <div class="text-danger"
              v-if="v$.middleInitial.$dirty && v$.middleInitial.nameInitialValidator.$invalid"
              aria-live="assertive">Second name initial must be a letter.</div>
          <InputComponent label='Patient Legal Last Name:'
                id='last-name'
                cypressId="patientLastName"
                className='mt-3'
                maxlength="18"
                v-model='lastName'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.lastName)' />
          <div class="text-danger"
              v-if="v$.lastName.$dirty && v$.lastName.required.$invalid"
              aria-live="assertive">Patient Legal Last Name is required.</div>
          <div class="text-danger"
              v-if="v$.lastName.$dirty && !v$.lastName.required.$invalid && v$.lastName.nameValidator.$invalid"
              aria-live="assertive">Patient Legal Last Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <DateInput :label='"Patient Birth Date" + ((dependentNumber === "66" && !isCSR) ? " (optional)" : "") + ":"'
                id='birth-date'
                cypressId="patientBirthDate"
                className='mt-3'
                v-model='birthDate'
                @blur='handleBlurField(v$.birthDate)'
                @processDate='handleProcessBirthDate($event)' />
          <div class="text-danger"
              v-if="v$.birthDate.$dirty && v$.birthDate.birthDateValidator.$invalid"
              aria-live="assertive">Patient Birth Date must be valid.</div>
          <div class="text-danger"
              v-if="v$.birthDate.$dirty
                && !v$.birthDate.birthDateValidator.$invalid
                && v$.birthDate.distantPastValidator.$invalid"
              aria-live="assertive">Patient Birth Date must be valid.</div>
          <div class="text-danger"
              v-if="v$.birthDate.$dirty
                && dependentNumber !== '66'
                && !v$.birthDate.birthDateValidator.$invalid
                && v$.birthDate.required.$invalid"
              aria-live="assertive">Patient Birth Date is required.</div>
          <div class="text-danger"
              v-if="v$.birthDate.$dirty && v$.birthDate.birthDatePastValidator.$invalid"
              aria-live="assertive">Patient Birth Date cannot be in the future.</div>
        </div>

        <a name='vehicle-accident'></a>
        <div class="section-container p-3 mt-5">
          <Radio label='Is this claim related to a motor vehicle accident?'
                v-model='isVehicleAccident'
                cypressId="motorVehicleAccident"
                :items='isVehicleAccidentOptions'
                @blur='handleBlurField(v$.isVehicleAccident)' />
          <div class="text-danger"
              v-if="v$.isVehicleAccident.$dirty && v$.isVehicleAccident.required.$invalid"
              aria-live="assertive">Answer to question is required.</div>
          <InputComponent
                :label='"Motor Vehicle Accident Claim Number" + (isCSR ? "" : " (optional)") + ":"'                
                id='vehicle-accident-claim-number'
                maxlength='8'
                :isUpperCaseForced="true"
                class='mt-3'
                v-model='vehicleAccidentClaimNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.vehicleAccidentClaimNumber)' />
          <div class="text-danger"
              v-if="v$.vehicleAccidentClaimNumber.$dirty 
              && (
                v$.vehicleAccidentClaimNumber.motorVehicleAccidentClaimNumberValidator.$invalid
                ||
                v$.vehicleAccidentClaimNumber.motorVehicleAccidentClaimNumberMaskValidator.$invalid
                ||
                v$.vehicleAccidentClaimNumber.alphanumericValidator.$invalid
              )"
              aria-live="assertive">Motor Vehicle Accident Claim Number must be valid.</div>
        </div>

        <a name='claim-info'></a>
        <div class="section-container p-3 mt-5">
          <DigitInput 
                :label='"Plan Reference Number of Original Claim" + (isCSR ? "" : " (optional)") + ":"'
                id='plan-reference-number-of-original-claim'
                maxlength="10"
                v-model='planReferenceNumberOfOriginalClaim'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.planReferenceNumberOfOriginalClaim)'/>
          <div class="text-danger"
              v-if="v$.planReferenceNumberOfOriginalClaim.$dirty && v$.planReferenceNumberOfOriginalClaim.intValidator.$invalid"
              aria-live="assertive">Motor Vehicle Accident Claim Number must be an integer.</div>
          <div class="text-danger"
              v-if="v$.planReferenceNumberOfOriginalClaim.$dirty && v$.planReferenceNumberOfOriginalClaim.positiveNumberValidator.$invalid"
              aria-live="assertive">Motor Vehicle Accident Claim Number must be a positive number.</div>
        </div>

        <div v-for="(claim, index) in medicalServiceClaims"
            :key="'medical-service-claim-' + index">
          <a :name='"medical-service-claim-" + index'></a>
          <h2 class="mt-5">{{getMedicalServiceClaimTitle(index)}}</h2>
          <div class="section-container p-3">
            <MedicalServiceClaimsFormItem
              :index="index"
              v-model:serviceDate="claim.serviceDate"
              v-model:serviceDateData="claim.serviceDateData"
              v-model:numberOfServices="claim.numberOfServices"
              v-model:serviceClarificationCode="claim.serviceClarificationCode"
              v-model:feeItem="claim.feeItem"
              v-model:amountBilled="claim.amountBilled"
              v-model:calledStartTime="claim.calledStartTime"
              v-model:renderedFinishTime="claim.renderedFinishTime"
              v-model:diagnosticCode="claim.diagnosticCode"
              v-model:locationOfService="claim.locationOfService"
              v-model:correspondenceAttached="claim.correspondenceAttached"
              v-model:submissionCode="claim.submissionCode"
              v-model:notes="claim.notes"
              v-model:medicalServiceClaimsFeeItemValidationError="medicalServiceClaimsFeeItemValidationError[index]"
            />
          </div>
        </div>
        
        <div v-for="(claim, index) in hospitalVisitClaims"
            :key="'hospital-visit-claim' + index">
          <a :name='"hospital-visit-claim-" + index'></a>
          <h2 class="mt-5">{{getHospitalVisitClaimTitle(index)}}</h2>
          <div class="section-container p-3">
            <!-- <HospitalVisitClaimsFormItem /> -->
          </div>
        </div>

        <a name='practitioner'></a>
        <h2 class="mt-5">Practitioner Information</h2>
        <div class="section-container p-3">
          <div class="tip-box-container float-md-right mb-3 border">
            <TipBox>
              <p>To confirm that the Medical Practitioner is active, the following fields will automatically be validated against Medical Services Plan records:</p>
              <ul>
                <li>First name</li>
                <li>Last name</li>
                <li>Medical Services Plan Practitioner Number</li>
              </ul>
            </TipBox>
          </div>
          <InputComponent label='Practitioner Last Name:'
                id='practitioner-last-name'
                cypressId="practitionerLastName"
                maxlength="35"
                v-model='practitionerLastName'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.practitionerLastName)'
                @input='handleInputPractitioner()' />
          <div class="text-danger"
              v-if="v$.practitionerLastName.$dirty && v$.practitionerLastName.required.$invalid"
              aria-live="assertive">Practitioner Last Name is required.</div>
          <div class="text-danger"
              v-if="v$.practitionerLastName.$dirty && !v$.practitionerLastName.required.$invalid && v$.practitionerLastName.nameValidator.$invalid"
              aria-live="assertive">Practitioner Last Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <div class="text-danger"
              v-if="isPractitionerErrorShown"
              aria-live="assertive">Practitioner information does not match our records.</div>
          <InputComponent label='Practitioner First Name:'
                id='practitioner-first-name'
                cypressId="practitionerFirstName"
                maxlength="15"
                class='mt-3'
                v-model='practitionerFirstName'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.practitionerFirstName)'
                @input='handleInputPractitioner()'/>
          <div class="text-danger"
              v-if="v$.practitionerFirstName.$dirty && v$.practitionerFirstName.required.$invalid"
              aria-live="assertive">Practitioner First Name is required.</div>
          <div class="text-danger"
              v-if="v$.practitionerFirstName.$dirty && !v$.practitionerFirstName.required.$invalid && v$.practitionerFirstName.nameValidator.$invalid"
              aria-live="assertive">Practitioner First Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <div class="text-danger"
              v-if="isPractitionerErrorShown"
              aria-live="assertive">Practitioner information does not match our records.</div>
          <!-- Using PractitionerNumberInput because it has the same character format. -->
          <PractitionerNumberInput label='Payment Number:'
                id='payment-number'
                cypressId="paymentNumber"
                class='mt-3'
                v-model='practitionerPaymentNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.practitionerPaymentNumber)'/>
          <div class="text-danger"
              v-if="v$.practitionerPaymentNumber.$dirty && v$.practitionerPaymentNumber.required.$invalid"
              aria-live="assertive">Payment number is required.</div>
          <div class="text-danger"
              v-if="v$.practitionerPaymentNumber.$dirty && !v$.practitionerPaymentNumber.required.$invalid && v$.practitionerPaymentNumber.minLength.$invalid"
              aria-live="assertive">Payment number must not be less than 5 characters.</div>
          <PractitionerNumberInput label='Practitioner Number:'
                id='practitioner-number'
                cypressId="practitionerNumber"
                class='mt-3'
                v-model='practitionerPractitionerNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.practitionerPractitionerNumber)'
                @input='handleInputPractitioner()'/>
          <div class="text-danger"
              v-if="v$.practitionerPractitionerNumber.$dirty && v$.practitionerPractitionerNumber.required.$invalid"
              aria-live="assertive">Practitioner number is required.</div>
          <div class="text-danger"
              v-if="v$.practitionerPractitionerNumber.$dirty && !v$.practitionerPractitionerNumber.required.$invalid && v$.practitionerPractitionerNumber.minLength.$invalid"
              aria-live="assertive">Practitioner number must not be less than 5 characters.</div>
          <div class="text-danger"
              v-if="isPractitionerErrorShown"
              aria-live="assertive">Practitioner information does not match our records.</div>
          <InputComponent 
                :label='"Specialty Code" + (isCSR ? "" : " (optional)") + ":"'
                id='specialty-code'
                class='mt-3'
                maxlength="2"
                v-model='practitionerSpecialtyCode'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.practitionerSpecialtyCode)'/>
          <div class="text-danger"
              v-if="v$.practitionerSpecialtyCode.$dirty
                && v$.practitionerSpecialtyCode.alphanumericValidator.$invalid"
              aria-live="assertive">Specialty Code must be alphanumeric.</div>
          <div class="text-danger"
              v-if="v$.practitionerSpecialtyCode.$dirty
                && v$.practitionerSpecialtyCode.minLength.$invalid"
              aria-live="assertive">Specialty Code cannot be less than 2 characters.</div>
          <div class="text-danger"
              v-if="v$.practitionerSpecialtyCode.$dirty
                && !v$.practitionerSpecialtyCode.minLength.$invalid
                && !v$.practitionerSpecialtyCode.alphanumericValidator.$invalid
                && v$.practitionerSpecialtyCode.specialtyCodeValidator.$invalid"
              aria-live="assertive">Specialty Code is invalid.</div>
          <FacilityNumberInput 
                :label='"Facility Number" + (isCSR ? "" : " (optional)") + ":"'
                id='facility-number'
                class='mt-3'
                v-model='practitionerFacilityNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.practitionerFacilityNumber)' />
          <div class="text-danger"
              v-if="v$.practitionerFacilityNumber.$dirty && v$.practitionerFacilityNumber.minLength.$invalid"
              aria-live="assertive">Facility number must not be less than 5 characters.</div>
          <DigitInput 
                :label='"Coverage Pre-Authorization Number" + (isCSR ? "" : " (optional)") + ":"'
                id='coverage-pre-authorization-number'
                class='mt-3'
                maxlength="4"
                v-model='coveragePreAuthNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.coveragePreAuthNumber)' />
          <div class="text-danger"
              v-if="v$.coveragePreAuthNumber.$dirty && v$.coveragePreAuthNumber.minLength.$invalid"
              aria-live="assertive">Coverage Pre-Authorization Number cannot be less than 4 characters.</div>
          <div class="text-danger"
              v-if="v$.coveragePreAuthNumber.$dirty && v$.coveragePreAuthNumber.intValidator.$invalid"
              aria-live="assertive">Coverage Pre-Authorization Number must be an integer.</div>
          <div class="text-danger"
              v-if="v$.coveragePreAuthNumber.$dirty && v$.coveragePreAuthNumber.positiveNumberValidator.$invalid"
              aria-live="assertive">Coverage Pre-Authorization Number must be a positive number.</div>
        </div>

        <a name='referred-by'></a>
        <h2 class="mt-5">Referred By</h2>
        <div class="section-container p-3">
          <PractitionerNumberInput :label='"Referred By Practitioner Number" + ((isReferredByRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-by-practitioner-number'
                v-model='referredByPractitionerNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.referredByPractitionerNumber)' />
          <div class="text-danger"
              v-if="isReferredByRequired && v$.referredByPractitionerNumber.$dirty && v$.referredByPractitionerNumber.required.$invalid"
              aria-live="assertive">Practitioner number is required.</div>
          <div class="text-danger"
              v-if="v$.referredByPractitionerNumber.$dirty && v$.referredByPractitionerNumber.minLength.$invalid"
              aria-live="assertive">Practitioner number must not be less than 5 characters.</div>
          <InputComponent :label='"Referred By Practitioner Last Name" + ((isReferredByRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-by-last-name'
                maxlength="18"
                class='mt-3'
                v-model='referredByLastName'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.referredByLastName)' />
          <div class="text-danger"
              v-if="isReferredByRequired && v$.referredByLastName.$dirty && v$.referredByLastName.required.$invalid"
              aria-live="assertive">Last name is required.</div>
          <div class="text-danger"
              v-if="v$.referredByLastName.$dirty && v$.referredByLastName.nameValidator.$invalid"
              aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <InputComponent :label='"Referred By Practitioner First Name Initial" + ((isReferredByRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-by-first-name-initial'
                maxlength="1"
                class='mt-3'
                v-model='referredByFirstNameInitial'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.referredByFirstNameInitial)' />
          <div class="text-danger"
              v-if="isReferredByRequired && v$.referredByFirstNameInitial.$dirty && v$.referredByFirstNameInitial.required.$invalid"
              aria-live="assertive">First Name Initial is required.</div>
          <div class="text-danger"
              v-if="v$.referredByFirstNameInitial.$dirty && v$.referredByFirstNameInitial.alphaValidator.$invalid"
              aria-live="assertive">First Name Initial must only contain an alphabetic character.</div>
        </div>

        <a name='referred-to'></a>
        <h2 class="mt-5">Referred To</h2>
        <div class="section-container p-3">
          <PractitionerNumberInput :label='"Referred To Practitioner Number" + ((isReferredToRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-to-practitioner-number'
                v-model='referredToPractitionerNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.referredToPractitionerNumber)'/>
          <div class="text-danger"
              v-if="isReferredToRequired && v$.referredToPractitionerNumber.$dirty && v$.referredToPractitionerNumber.required.$invalid"
              aria-live="assertive">Practitioner number is required.</div>
          <div class="text-danger"
              v-if="v$.referredToPractitionerNumber.$dirty && v$.referredToPractitionerNumber.minLength.$invalid"
              aria-live="assertive">Practitioner number must not be less than 5 characters.</div>
          <InputComponent :label='"Referred To Practitioner Last Name" + ((isReferredToRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-to-last-name'
                maxlength="18"
                class='mt-3'
                v-model='referredToLastName'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.referredToLastName)'/>
          <div class="text-danger"
              v-if="isReferredToRequired && v$.referredToLastName.$dirty && v$.referredToLastName.required.$invalid"
              aria-live="assertive">Last name is required.</div>
          <div class="text-danger"
              v-if="v$.referredToLastName.$dirty && v$.referredToLastName.nameValidator.$invalid"
              aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <InputComponent :label='"Referred To Practitioner First Name Initial" + ((isReferredToRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-to-first-name-initial'
                maxlength="1"
                class='mt-3'
                v-model='referredToFirstNameInitial'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.referredToFirstNameInitial)'/>
          <div class="text-danger"
              v-if="isReferredToRequired && v$.referredToFirstNameInitial.$dirty && v$.referredToFirstNameInitial.required.$invalid"
              aria-live="assertive">First Name Initial is required.</div>
          <div class="text-danger"
              v-if="v$.referredToFirstNameInitial.$dirty && v$.referredToFirstNameInitial.alphaValidator.$invalid"
              aria-live="assertive">First Name Initial must only contain an alphabetic character.</div>
        </div>
        <div v-if="isSystemUnavailable"
            class="text-danger my-4">Unable to continue, system unavailable. Please try again later.</div>
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
                :hasLoader='isValidating'/>
  </div>
</template>

<script>
import pageStateService from '@/services/page-state-service';
import apiService from '@/services/api-service';
import {
  payPractitionerRoutes,
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
  motorVehicleAccidentClaimNumberMaskValidator,
  specialtyCodeValidator,
  validateIf,
  phnNineValidator
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
} from '@/constants/input-styles';
import ContinueBar from '@/components/ContinueBar.vue';
import PageContent from '@/components/PageContent.vue';
import TipBox from '@/components/TipBox.vue';
import MedicalServiceClaimsFormItem from '@/views/pay-practitioner/MedicalServiceClaimsFormItem.vue';
// import HospitalVisitClaimsFormItem from '@/views/pay-practitioner/HospitalVisitClaimsFormItem.vue';
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
  SET_PRACTITIONER_FACILITY_NUMBER
} from '@/store/modules/pay-practitioner-form';
import logService from '@/services/log-service';
import { required, requiredIf, minLength } from '@vuelidate/validators/dist/raw.esm';
import useVuelidate from '@vuelidate/core';
import {
  DateInput,
  DigitInput,
  FacilityNumberInput,
  Input,
  PhnInput,
  PractitionerNumberInput,
  PromptModal,
  Radio,
  alphanumericValidator,
  alphaValidator,
  cloneDeep,
  distantPastValidator,
  getISODateString,
  intValidator,
  isValidISODateString,
  motorVehicleAccidentClaimNumberValidator,
  padLeadingZeros,
  pastDateValidator,
  positiveNumberValidator,
  optionalValidator,
  phnValidator,
  selectOptionsMonths,
} from 'common-lib-vue';
import {
  isSameDay,
  startOfToday,
  subDays,
  isBefore,
  parseISO,
  isValid,
} from 'date-fns';

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

const MAX_MEDICAL_SERVICE_CLAIMS = 4;
const MAX_HOSPITAL_VISIT_CLAIMS = 2;

export default {
  name: 'MainFormPage',
  components: {
    ContinueBar,
    DateInput,
    DigitInput,
    FacilityNumberInput,
    // HospitalVisitClaimsFormItem,
    InputComponent: Input,
    MedicalServiceClaimsFormItem,
    PageContent,
    PhnInput,
    PractitionerNumberInput,
    PromptModal,
    Radio,
    TipBox,
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
      monthOptions: selectOptionsMonths,
      correspondenceAttachedOptions: selectOptionsCorrespondenceAttached,
      submissionCodeOptions: selectOptionsSubmissionCode,
      serviceLocationOptions: selectOptionsServiceLocation,
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
  setup () {
    return {
      v$: useVuelidate(),
    };
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
    this.vehicleAccidentClaimNumber = this.$store.state.payPractitionerForm.vehicleAccidentClaimNumber;
    this.planReferenceNumberOfOriginalClaim = this.$store.state.payPractitionerForm.planReferenceNumberOfOriginalClaim;
    this.coveragePreAuthNumber = this.$store.state.payPractitionerForm.coveragePreAuthNumber;
    this.procedureOrOperation = this.$store.state.payPractitionerForm.procedureOrOperation;

    this.medicalServiceClaims = this.$store.state.payPractitionerForm.medicalServiceClaims ? cloneDeep(this.$store.state.payPractitionerForm.medicalServiceClaims) : [];
    this.hospitalVisitClaims = this.$store.state.payPractitionerForm.hospitalVisitClaims ? cloneDeep(this.$store.state.payPractitionerForm.hospitalVisitClaims) : [];

    this.practitionerLastName = this.$store.state.payPractitionerForm.practitionerLastName;
    this.practitionerFirstName = this.$store.state.payPractitionerForm.practitionerFirstName;
    this.practitionerPaymentNumber = this.$store.state.payPractitionerForm.practitionerPaymentNumber;
    this.practitionerPractitionerNumber = this.$store.state.payPractitionerForm.practitionerPractitionerNumber;
    this.practitionerFacilityNumber = this.$store.state.payPractitionerForm.practitionerFacilityNumber;
    this.practitionerSpecialtyCode = this.$store.state.payPractitionerForm.practitionerSpecialtyCode;

    this.referredByFirstNameInitial = this.$store.state.payPractitionerForm.referredByFirstNameInitial;
    this.referredByLastName = this.$store.state.payPractitionerForm.referredByLastName;
    this.referredByPractitionerNumber = this.$store.state.payPractitionerForm.referredByPractitionerNumber;

    this.referredToLastName = this.$store.state.payPractitionerForm.referredToLastName;
    this.referredToFirstNameInitial = this.$store.state.payPractitionerForm.referredToFirstNameInitial;
    this.referredToPractitionerNumber = this.$store.state.payPractitionerForm.referredToPractitionerNumber;

    for (let i=0; i<MAX_MEDICAL_SERVICE_CLAIMS; i++) {
      this.medicalServiceClaimsFeeItemValidationError.push(false);
    }
    for (let i=0; i<MAX_HOSPITAL_VISIT_CLAIMS; i++) {
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
        dependentNumberValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), dependentNumberValidator)),
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
          return !isCSR(this.$router.currentRoute.value.path)
              && this.dependentNumber !== '66';
        }),
        birthDatePastValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), birthDatePastValidator)),
        birthDateValidator,
        distantPastValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), distantPastValidator)),
      },
      isVehicleAccident: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
      },
      vehicleAccidentClaimNumber: {
        alphanumericValidator: optionalValidator(alphanumericValidator),
        motorVehicleAccidentClaimNumberValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), motorVehicleAccidentClaimNumberValidator)),
        motorVehicleAccidentClaimNumberMaskValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), motorVehicleAccidentClaimNumberMaskValidator)),
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
        minLength: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), minLength(5))),
      },
      practitionerSpecialtyCode: {
        alphanumericValidator: optionalValidator(alphanumericValidator),
        minLength: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), minLength(2))),
        specialtyCodeValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), specialtyCodeValidator)),
      },
      coveragePreAuthNumber: {
        minLength: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), minLength(4))),
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
    if (this.dependentNumber !== '66' && !isCSR(this.$router.currentRoute.value.path)) {
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
    handleInputHospitalVisitFeeItem(index) {
      this.hospitalVisitClaimsFeeItemValidationError[index] = false;
    },
    validateFields() {
      // If no dependent number is given, then default to "00".
      if (!this.dependentNumber) {
        this.dependentNumber = '00';
      }
      // Iterate over all "Service" claims.
      for (let i=0; i<this.medicalServiceClaims.length; i++) {
        // Pad Fee Items with leading zeros.
        if (this.medicalServiceClaims[i].feeItem) {
          this.medicalServiceClaims[i].feeItem = padLeadingZeros(this.medicalServiceClaims[i].feeItem, 5);
        }

        // Set default "numberOfServices" to 00 
        if (!this.medicalServiceClaims[i].numberOfServices) {
          this.medicalServiceClaims[i].numberOfServices = '00';
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
      // Iterate over all "Hospital Visit" claims.
      for (let i=0; i<this.hospitalVisitClaims.length; i++) {
        // Pad Fee Items with leading zeros.
        if (this.hospitalVisitClaims[i].feeItem) {
          this.hospitalVisitClaims[i].feeItem = padLeadingZeros(this.hospitalVisitClaims[i].feeItem, 5);
        }

        // Set default "numberOfServices" to 00 
        if (!this.hospitalVisitClaims[i].numberOfServices) {
          this.hospitalVisitClaims[i].numberOfServices = '00';
        }
      }
      
      this.v$.$touch();
      if (this.v$.$invalid) {
        console.log('invalid form:', this.v$);
        scrollToError();
        return;
      }

      this.isValidating = true;
      this.isSystemUnavailable = false;
      this.isPractitionerErrorShown = false;
      for (let i=0; i<this.medicalServiceClaimsFeeItemValidationError.length; i++) {
        this.medicalServiceClaimsFeeItemValidationError[i] = false;
      }

      const token = this.$store.state.payPractitionerForm.captchaToken;
      const applicationUuid = this.$store.state.payPractitionerForm.applicationUuid;
      
      if (!isCSR(this.$router.currentRoute.value.path)) {
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
          serviceLocationCode1: '',
          serviceLocationCode2: '',
          serviceLocationCode3: '',
          serviceLocationCode4: '',
          hospitalFeeItem1: this.hospitalVisitClaims[0] && this.hospitalVisitClaims[0].feeItem ? this.hospitalVisitClaims[0].feeItem : '',
          hospitalFeeItem2: this.hospitalVisitClaims[1] && this.hospitalVisitClaims[1].feeItem ? this.hospitalVisitClaims[1].feeItem : '',
          hospitalLocationCode1: '',
          hospitalLocationCode2: ''
        }).then((response) => {
          const responseData = response.data;
          const returnCode = response.data.returnCode;
          let containsErrors = false;
          let containsWarnings = false;

          this.isValidating = false;

          switch (returnCode) {
            case '0': // Valid payload data.
              this.navigateToNextPage();
              break;
            case '1': // Invalid payload data.
              if ( responseData.practitionerFirstName === 'N'
                || responseData.practitionerLastName === 'N'
                || responseData.practitionerNumber === 'N') {
                this.isPractitionerErrorShown = true;
                containsErrors = true;
              }
              for (let i=0; i<MAX_MEDICAL_SERVICE_CLAIMS; i++) {
                if (responseData['serviceFeeItem' + (i+1)] === 'N') {
                  this.medicalServiceClaimsFeeItemValidationError[i] = true;
                  containsErrors = true;
                }
              }
              for (let i=0; i<MAX_HOSPITAL_VISIT_CLAIMS; i++) {
                if (responseData['hospitalFeeItem' + (i+1)] === 'N') {
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
        }).catch(() => {
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
      this.$store.dispatch(formModule + '/' + SET_PLAN_REFERENCE_NUMBER, this.planReferenceNumber);

      this.$store.dispatch(formModule + '/' + SET_PHN, this.phn);
      this.$store.dispatch(formModule + '/' + SET_DEPENDENT_NUMBER, this.dependentNumber);
      this.$store.dispatch(formModule + '/' + SET_FIRST_NAME, this.firstName);
      this.$store.dispatch(formModule + '/' + SET_MIDDLE_INITIAL, this.middleInitial);
      this.$store.dispatch(formModule + '/' + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(formModule + '/' + SET_BIRTH_DATE, this.birthDate);

      this.$store.dispatch(formModule + '/' + SET_IS_VEHICLE_ACCIDENT, this.isVehicleAccident);
      this.$store.dispatch(formModule + '/' + SET_VEHICLE_ACCIDENT_CLAIM_NUMBER, this.vehicleAccidentClaimNumber);

      this.$store.dispatch(formModule + '/' + SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM, this.planReferenceNumberOfOriginalClaim);

      this.$store.dispatch(formModule + '/' + SET_MEDICAL_SERVICE_CLAIMS, this.medicalServiceClaims);
      this.$store.dispatch(formModule + '/' + SET_HOSPITAL_VISIT_CLAIMS, this.hospitalVisitClaims);

      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_LAST_NAME, this.practitionerLastName);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_FIRST_NAME, this.practitionerFirstName);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PAYMENT_NUMBER, this.practitionerPaymentNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PRACTITIONER_NUMBER, this.practitionerPractitionerNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_FACILITY_NUMBER, this.practitionerFacilityNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_SPECIALTY_CODE, this.practitionerSpecialtyCode);
      this.$store.dispatch(formModule + '/' + SET_COVERAGE_PRE_AUTH_NUMBER, this.coveragePreAuthNumber);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_FIRST_NAME_INITIAL, this.referredByFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_LAST_NAME, this.referredByLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_PRACTITIONER_NUMBER, this.referredByPractitionerNumber);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_LAST_NAME, this.referredToLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_FIRST_NAME_INITIAL, this.referredToFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_PRACTITIONER_NUMBER, this.referredToPractitionerNumber);
    },
    getMedicalServiceClaimTitle(index) {
      if (this.medicalServiceClaims && this.medicalServiceClaims.length > 1) {
        return `Service (${index + 1} of ${this.medicalServiceClaims.length})`;
      }
      return 'Service';
    },
    getHospitalVisitClaimTitle(index) {
      if (this.hospitalVisitClaims && this.hospitalVisitClaims.length > 1) {
        return `Hospital Visit (${index + 1} of ${this.hospitalVisitClaims.length})`;
      }
      return 'Hospital Visit';
    },
    isHospitalVisitSubmissionCodeRequired(index) {
      if (isCSR(this.$router.currentRoute.value.path)) {
        return false;
      }
      const past90Days = subDays(startOfToday(), 90);
      const ISODateStr = getISODateString(
        this.hospitalVisitClaims[index].year,
        this.hospitalVisitClaims[index].month,
        this.hospitalVisitClaims[index].dayFrom,
      );
      const serviceDate = parseISO(ISODateStr);
      if (!isValid(serviceDate) || !isValidISODateString(ISODateStr)) {
        return false;
      }
      return isBefore(serviceDate, past90Days);
    },
  },
  computed: {
    isReferredByRequired() {
      return (!!this.referredByFirstNameInitial || !!this.referredByLastName || !!this.referredByPractitionerNumber) 
      && !isCSR(this.$router.currentRoute.value.path);
    },
    isReferredToRequired() {
      return (!!this.referredToFirstNameInitial || !!this.referredToLastName 
      || !!this.referredToPractitionerNumber || this.isContainingNoChargeFeeItem) 
      && !isCSR(this.$router.currentRoute.value.path);
    },
    isContainingNoChargeFeeItem() {
      for (let i=0; i<this.medicalServiceClaims.length; i++) {
        if (this.medicalServiceClaims[i].feeItem === '03333') {
          return true;
        }
      }
      for (let i=0; i<this.hospitalVisitClaims.length; i++) {
        if (this.hospitalVisitClaims[i].feeItem === '03333') {
          return true;
        }
      }
      return false;
    },
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
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
    if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
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
@media only screen and (min-width: 768px) {
  .tip-box-container {
    max-width: 300px;
  }
}
</style>
