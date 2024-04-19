<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Pay Patient Claim</h1>
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
                v-model='dependentNumber'
                maxlength='2'
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
                v-model='firstName'
                maxlength='12'
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
                v-model='middleInitial'
                maxlength='1'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.middleInitial)' />
          <div class="text-danger"
              v-if="v$.middleInitial.$dirty && v$.middleInitial.nameInitialValidator.$invalid"
              aria-live="assertive">Second name initial must be a letter.</div>
          <InputComponent label='Patient Legal Last Name:'
                id='last-name'
                cypressId="patientLastName"
                className='mt-3'
                v-model='lastName'
                maxlength='18'
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
              aria-live="assertive">This field is required.</div>
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
                v-model='planReferenceNumberOfOriginalClaim'
                maxlength='10'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.planReferenceNumberOfOriginalClaim)'/>
          <div class="text-danger"
              v-if="v$.planReferenceNumberOfOriginalClaim.$dirty && v$.planReferenceNumberOfOriginalClaim.intValidator.$invalid"
              aria-live="assertive">Plan Reference Number of Original Claim must be an integer.</div>
          <div class="text-danger"
              v-if="v$.planReferenceNumberOfOriginalClaim.$dirty && v$.planReferenceNumberOfOriginalClaim.positiveNumberValidator.$invalid"
              aria-live="assertive">Plan Reference Number of Original Claim must be a positive number.</div>
        </div>

        <div
          v-for="(claim, index) in medicalServiceClaims"
          :key="index"
        >
          <a :name='"medical-service-claim-" + index'></a>
          <h2 class="mt-5">{{getMedicalServiceClaimTitle(index)}}</h2>
          <div class="section-container p-3">
            <MedicalServiceClaimsFormItem
              :index="index"
              v-model:serviceDate="claim.serviceDate"
              v-model:serviceDateData="claim.serviceDateData"
              v-model:numberOfServices="claim.numberOfServices"
              v-model:feeItem="claim.feeItem"
              v-model:amountBilled="claim.amountBilled"
              v-model:calledStartTime="claim.calledStartTime"
              v-model:renderedFinishTime="claim.renderedFinishTime"
              v-model:diagnosticCode="claim.diagnosticCode"
              v-model:locationOfService="claim.locationOfService"
              v-model:serviceClarificationCode="claim.serviceClarificationCode"
              v-model:correspondenceAttached="claim.correspondenceAttached"
              v-model:submissionCode="claim.submissionCode"
              v-model:notes="claim.notes"
              v-model:medicalServiceClaimsFeeItemValidationError="medicalServiceClaimsFeeItemValidationError[index]"
            />
          </div>
        </div>

        <a name='mailing-address'></a>
        <h2 class="mt-5">Payment Mailing Address</h2>
        <div class="section-container p-3">
          <Radio label='Whose address is this?'
                cypressId="addressOwner"
                v-model='addressOwner'
                :items='addressOwnerOptions'
                @blur='handleBlurField(v$.addressOwner)' />
          <div class="text-danger"
              v-if="v$.addressOwner.$dirty && v$.addressOwner.required.$invalid"
              aria-live="assertive">This field is required.</div>
          <InputComponent 
                :label='"Apartment / Unit" + (isCSR ? "" : " (optional)") + ":"'
                id='unit-number'
                className='mt-3'
                v-model='unitNumber'
                maxlength='6'
                :inputStyle='smallStyles' />
          <InputComponent 
                :label='"Street Number" + (isCSR ? "" : " (optional)") + ":"'
                id='street-number'
                className='mt-3'
                v-model='streetNumber'
                maxlength='6'
                :inputStyle='smallStyles' />
          <InputComponent label='Street Name:'
                id='street-name'
                cypressId="streetName"
                className='mt-3'
                v-model='streetName'
                maxlength='24'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.streetName)' />
          <div class="text-danger"
              v-if="v$.streetName.$dirty && v$.streetName.required.$invalid"
              aria-live="assertive">Street Name is required.</div>
          <InputComponent label='City:'
                id='city'
                cypressId="cityName"
                className='mt-3'
                v-model='city'
                maxlength='22'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.city)' />
          <div class="text-danger"
              v-if="v$.city.$dirty && v$.city.required.$invalid"
              aria-live="assertive">City is required.</div>
          <div class='my-3'>Province:</div>
          <p><strong>British Columbia</strong></p>
          <PostalCodeInput label='Postal Code:'
                id='postal-code'
                cypressId="postalCode"
                className='mt-3'
                v-model='postalCode'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.postalCode)' />
          <div class="text-danger"
              v-if="v$.postalCode.$dirty && v$.postalCode.required.$invalid"
              aria-live="assertive">Postal Code is required.</div>
          <div class="text-danger"
              v-if="v$.postalCode.$dirty && !v$.postalCode.required.$invalid && v$.postalCode.bcPostalCodeValidator.$invalid"
              aria-live="assertive">Must be a valid BC postal code.</div>
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
                v-model='practitionerLastName'
                maxlength='35'
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
                v-model='practitionerFirstName'
                maxlength='15'
                class='mt-3'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.practitionerFirstName)'
                @input='handleInputPractitioner()' />
          <div class="text-danger"
              v-if="v$.practitionerFirstName.$dirty && v$.practitionerFirstName.required.$invalid"
              aria-live="assertive">Practitioner First Name is required.</div>
          <div class="text-danger"
              v-if="v$.practitionerFirstName.$dirty && !v$.practitionerFirstName.required.$invalid && v$.practitionerFirstName.nameValidator.$invalid"
              aria-live="assertive">Practitioner First Name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <div class="text-danger"
              v-if="isPractitionerErrorShown"
              aria-live="assertive">Practitioner information does not match our records.</div>
          <!-- Using PractitionerNumberInput because payment number has the same format as a practitioner number -->
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
                v-model='practitionerSpecialtyCode'
                maxlength='2'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.practitionerSpecialtyCode)'/>
          <div class="text-danger"
              v-if="v$.practitionerSpecialtyCode.$dirty
                && v$.practitionerSpecialtyCode.alphanumericValidator.$invalid"
              aria-live="assertive">Specialty Code must be alphanumeric.</div>
          <div class="text-danger"
              v-if="v$.practitionerSpecialtyCode.$dirty
                && v$.practitionerSpecialtyCode.minLengthValue.$invalid"
              aria-live="assertive">Specialty Code cannot be less than 2 characters.</div>
          <div class="text-danger"
              v-if="v$.practitionerSpecialtyCode.$dirty
                && !v$.practitionerSpecialtyCode.minLengthValue.$invalid
                && !v$.practitionerSpecialtyCode.alphanumericValidator.$invalid
                && v$.practitionerSpecialtyCode.specialtyCodeValidator.$invalid"
              aria-live="assertive">Specialty Code is invalid.</div>
          <FacilityNumberInput 
                :label='"Facility Number" + (isCSR ? "" : " (optional)") + ":"'
                id='facility-number'
                class='mt-3'
                v-model='practitionerFacilityNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.practitionerFacilityNumber)'/>
          <div class="text-danger"
              v-if="v$.practitionerFacilityNumber.$dirty && v$.practitionerFacilityNumber.minLength.$invalid"
              aria-live="assertive">Facility number must not be less than 5 characters.</div>
        </div>

        <a name='referred-by'></a>
        <h2 class="mt-5">Referred By</h2>
        <div class="section-container p-3">
          <PractitionerNumberInput 
                :label='"Referred By Practitioner Number" + ((isReferredByRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-by-practitioner-number'
                v-model='referredByPractitionerNumber'
                :inputStyle='smallStyles'
                @blur='handleBlurField(v$.referredByPractitionerNumber)'/>
          <div class="text-danger"
              v-if="isReferredByRequired && v$.referredByPractitionerNumber.$dirty && v$.referredByPractitionerNumber.required.$invalid"
              aria-live="assertive">Practitioner number is required.</div>
          <div class="text-danger"
              v-if="v$.referredByPractitionerNumber.$dirty && v$.referredByPractitionerNumber.minLength.$invalid"
              aria-live="assertive">Practitioner number must not be less than 5 characters.</div>
          <InputComponent 
                :label='"Referred By Practitioner Last Name" + ((isReferredByRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-by-last-name'
                v-model='referredByLastName'
                maxlength='18'
                class='mt-3'
                :inputStyle='mediumStyles'
                @blur='handleBlurField(v$.referredByLastName)'/>
          <div class="text-danger"
              v-if="isReferredByRequired && v$.referredByLastName.$dirty && v$.referredByLastName.required.$invalid"
              aria-live="assertive">Last name is required.</div>
          <div class="text-danger"
              v-if="v$.referredByLastName.$dirty && v$.referredByLastName.nameValidator.$invalid"
              aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <InputComponent 
                :label='"Referred By Practitioner First Name Initial" + ((isReferredByRequired || isCSR ) ? "" : " (optional)") + ":"'
                id='referred-by-first-name-initial'
                v-model='referredByFirstNameInitial'
                maxlength='1'
                class='mt-3'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.referredByFirstNameInitial)'/>
          <div class="text-danger"
              v-if="isReferredByRequired && v$.referredByFirstNameInitial.$dirty && v$.referredByFirstNameInitial.required.$invalid"
              aria-live="assertive">First Name Initial is required.</div>
          <div class="text-danger"
              v-if="v$.referredByFirstNameInitial.$dirty && v$.referredByFirstNameInitial.alphaValidator.$invalid"
              aria-live="assertive">First Name Initial must only be an alphabetic character.</div>
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
                v-model='referredToLastName'
                maxlength='18'
                class='mt-3'
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
                v-model='referredToFirstNameInitial'
                maxlength='1'
                class='mt-3'
                :inputStyle='extraSmallStyles'
                @blur='handleBlurField(v$.referredToFirstNameInitial)'/>
          <div class="text-danger"
              v-if="isReferredToRequired && v$.referredToFirstNameInitial.$dirty && v$.referredToFirstNameInitial.required.$invalid"
              aria-live="assertive">First Name Initial is required.</div>
          <div class="text-danger"
              v-if="v$.referredToFirstNameInitial.$dirty && v$.referredToFirstNameInitial.alphaValidator.$invalid"
              aria-live="assertive">First Name Initial must only be an alphabetic character.</div>
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
  motorVehicleAccidentClaimNumberMaskValidator,
  serviceDateValidator,
  serviceDateCutOffValidator,
  serviceLocationCodeValidator,
  specialtyCodeValidator,
  submissionCodeValidator,
  validateIf,
  phnNineValidator
} from '@/helpers/validators';
import {
  extraSmallStyles,
  smallStyles,
  mediumStyles,
} from '@/constants/input-styles';
import ContinueBar from '@/components/ContinueBar.vue';
import PageContent from '@/components/PageContent.vue';
import TipBox from '@/components/TipBox.vue';
import MedicalServiceClaimsFormItem from '@/components/MedicalServiceClaimsFormItem.vue';
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
import { required, requiredIf, maxLength, minLength } from '@vuelidate/validators/dist/raw.esm';
import useVuelidate from '@vuelidate/core';
import {
  DateInput,
  DigitInput,
  FacilityNumberInput,
  Input,
  // NumberInput,
  PhnInput,
  PostalCodeInput,
  PractitionerNumberInput,
  PromptModal,
  Radio,
  // Select,
  // Textarea,
  // TimeInput,
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

const MAX_MEDICAL_SERVICE_CLAIMS = 4;

export default {
  name: 'MainFormPage',
  components: {
    ContinueBar,
    DateInput,
    DigitInput,
    FacilityNumberInput,
    InputComponent: Input,
    MedicalServiceClaimsFormItem,
    // NumberInput,
    PageContent,
    PhnInput,
    PostalCodeInput,
    PractitionerNumberInput,
    PromptModal,
    Radio,
    // Select,
    // Textarea,
    // TimeInput,
    TipBox,
  },
  data: () => {
    return {
      isPageLoaded: false,
      isValidating: false,
      isValidationModalShown: false,
      isSystemUnavailable: false,
      isPractitionerErrorShown: false,
      medicalServiceClaimsFeeItemValidationError: [],
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
  setup() {
    return {
      v$: useVuelidate(),
      v: useVuelidate(),
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

    for (let i=0; i<MAX_MEDICAL_SERVICE_CLAIMS; i++) {
      this.medicalServiceClaimsFeeItemValidationError.push(false);
    }

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
      addressOwner: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
      },
      streetName: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
      },
      city: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
      },
      postalCode: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        bcPostalCodeValidator,
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
        minLengthValue: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), minLength(2))),
        specialtyCodeValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), specialtyCodeValidator)),
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
    handleInputPractitioner() {
      this.isPractitionerErrorShown = false;
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

      this.v$.$touch();
      if (this.v$.$invalid) {
        scrollToError();
        return;
      }

      this.isValidating = true;
      this.isSystemUnavailable = false;
      this.isPractitionerErrorShown = false;
      for (let i=0; i<this.medicalServiceClaimsFeeItemValidationError.length; i++) {
        this.medicalServiceClaimsFeeItemValidationError[i] = false;
      }

      const token = this.$store.state.payPatientForm.captchaToken;
      const applicationUuid = this.$store.state.payPatientForm.applicationUuid;

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
          hospitalFeeItem1: '',
          hospitalFeeItem2: '',
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
        payPatientRoutes.REVIEW_PAGE.path
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
    },
    getMedicalServiceClaimTitle(index) {
      if (this.medicalServiceClaims && this.medicalServiceClaims.length > 1) {
        return `Service (${index + 1} of ${this.medicalServiceClaims.length})`;
      }
      return 'Service';
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
    medicalServiceClaimsValidations() {
      return {
        serviceDate: {
          required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
          serviceDateValidator: optionalValidator(serviceDateValidator),
          serviceDateFutureValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), serviceDateFutureValidator)),
          distantPastValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), distantPastValidator)),
          serviceDateCutOffValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), serviceDateCutOffValidator)),
        },
        numberOfServices: {
          required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
          intValidator: optionalValidator(intValidator),
          positiveNumberValidator: optionalValidator(positiveNumberValidator),
          nonZeroNumberValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), nonZeroNumberValidator)),
        },
        feeItem: {
          required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
          intValidator: optionalValidator(intValidator),
          positiveNumberValidator: optionalValidator(positiveNumberValidator),
        },
        amountBilled: {
          required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
          dollarNumberValidator: optionalValidator(dollarNumberValidator),
          positiveNumberValidator: optionalValidator(positiveNumberValidator),
          amountBilledZeroValidator: optionalValidator(amountBilledZeroValidator),
        },
        calledStartTime: {
          partialTimeValidator: optionalValidator(partialTimeValidator),
        },
        renderedFinishTime: {
          partialTimeValidator: optionalValidator(partialTimeValidator),
        },
        diagnosticCode: {
          required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
          alphanumericValidator: optionalValidator(alphanumericValidator),
          diagnosticCodeValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), diagnosticCodeValidator)),
        },
        locationOfService: {
          required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
          serviceLocationCodeValidator: validateIf(!isCSR(this.$router.currentRoute.value.path), serviceLocationCodeValidator),
        },
        serviceClarificationCode: {
          clarificationCodeValidator: optionalValidator(clarificationCodeValidator(isCSR(this.$router.currentRoute.value.path))),
        },
        submissionCode: {
          submissionCodeValidator: validateIf(!isCSR(this.$router.currentRoute.value.path), submissionCodeValidator),
        },
        notes: {
          maxLength: maxLength(400),
        },
      };
    }
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
@media only screen and (min-width: 768px) {
  .tip-box-container {
    max-width: 300px;
  }
}
</style>
