<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Pay Practitioner Claim</h1>
        <hr/>

        <h2>Patient</h2>
        <PhnInput label='Personal Health Number:'
              id='phn'
              className='mt-3'
              v-model='phn' />
        <div class="text-danger"
            v-if="$v.phn.$dirty && !$v.phn.required"
            aria-live="assertive">Personal Health Number is required.</div>
        <div class="text-danger"
            v-if="$v.phn.$dirty && $v.phn.required && !$v.phn.phnValidator"
            aria-live="assertive">Personal Health Number must be valid.</div>
        <NumberInput label='Dependant Number:'
              id='dependent-number'
              className='mt-3'
              maxlength="2"
              v-model='dependentNumber' />
        <div class="text-danger"
            v-if="$v.dependentNumber.$dirty && !$v.dependentNumber.intValidator"
            aria-live="assertive">Dependant number must be an integer.</div>
        <div class="text-danger"
            v-if="$v.dependentNumber.$dirty && !$v.dependentNumber.positiveNumberValidator"
            aria-live="assertive">Dependant number must be a positive number.</div>
        <Input label='Legal First Name:'
              id='first-name'
              className='mt-3'
              maxlength="12"
              v-model='firstName' />
        <div class="text-danger"
            v-if="$v.firstName.$dirty && !$v.firstName.required"
            aria-live="assertive">Legal First Name is required.</div>
        <div class="text-danger"
            v-if="$v.firstName.$dirty && $v.firstName.required && !$v.firstName.nameValidator"
            aria-live="assertive">First name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
        <Input label='Second Name Initial:'
              id='middle-initial'
              className='mt-3'
              maxlength="1"
              v-model='middleInitial' />
        <div class="text-danger"
            v-if="$v.middleInitial.$dirty && !$v.middleInitial.nameInitialValidator"
            aria-live="assertive">Second name initial must be a letter.</div>
        <Input label='Legal Last Name:'
              id='last-name'
              className='mt-3'
              maxlength="18"
              v-model='lastName' />
        <div class="text-danger"
            v-if="$v.lastName.$dirty && !$v.lastName.required"
            aria-live="assertive">Legal Last Name is required.</div>
        <div class="text-danger"
            v-if="$v.lastName.$dirty && $v.lastName.required && !$v.lastName.nameValidator"
            aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
        <DateInput label='Birth Date:'
              className='mt-3'
              v-model='birthDate' />
        <div class="text-danger"
            v-if="$v.birthDate.$dirty && !$v.birthDate.required"
            aria-live="assertive">Birth Date is required.</div>

        <hr class='mt-5'/>
        <Radio label='Is this claim related to a motor vehicle accident?'
              class='mt-3'
              v-model='isVehicleAccident'
              :items='isVehicleAccidentOptions' />
        <div class="text-danger"
            v-if="$v.isVehicleAccident.$dirty && !$v.isVehicleAccident.required"
            aria-live="assertive">This field is required.</div>
        <NumberInput label='Motor Vehicle Accident Claim Number:'
              id='vehicle-accident-claim-number'
              class='mt-3'
              maxlenght="8"
              v-model='vehicleAccidentClaimNumber'/>
        <div class="text-danger"
            v-if="$v.vehicleAccidentClaimNumber.$dirty && !$v.vehicleAccidentClaimNumber.intValidator"
            aria-live="assertive">Motor Vehicle Accident Claim Number must be an integer.</div>
        <div class="text-danger"
            v-if="$v.vehicleAccidentClaimNumber.$dirty && !$v.vehicleAccidentClaimNumber.positiveNumberValidator"
            aria-live="assertive">Motor Vehicle Accident Claim Number must be a positive number.</div>
        <Input label='Correspondence Attached:'
              id='correspondence-attached'
              class='mt-3'
              maxlength="1"
              v-model='correspondenceAttached'/>
        <Input label='Submission Code:'
              id='submission-code'
              class='mt-3'
              maxlength="1"
              v-model='submissionCode'/>
        <Input label='Plan Reference Number of Original Claim:'
              id='plan-reference-number-of-original-claim'
              class='mt-3'
              maxlength="10"
              v-model='planReferenceNumberOfOriginalClaim'/>
        <Input label='Coverage Pre-Authorization Number:'
              id='coverage-pre-authorization-number'
              class='mt-3'
              maxlength="4"
              v-model='coveragePreAuthNumber'/>
        <Input label='Procedure or Operation:'
              id='procedure-or-operation'
              class='mt-3'
              maxlength="256"
              v-model='procedureOrOperation'/>

        <div v-for="(claim, index) in medicalServiceClaims"
            :key="'medical-service-claim-' + index"
            :set="v = $v.medicalServiceClaims.$each[index]">
          <h2 class="mt-5">{{getMedicalServiceClaimTitle(index)}}</h2>
          <DateInput label='Service Date:'
                    className='mt-3'
                    v-model='claim.serviceDate' />
          <div class="text-danger"
              v-if="v.serviceDate.$dirty && !v.serviceDate.required"
              aria-live="assertive">Service date is required.</div>
          <NumberInput label='Number of Services:'
                :id='"number-of-services-" + index'
                class='mt-3'
                maxlength="2"
                v-model='claim.numberOfServices' />
          <div class="text-danger"
              v-if="v.numberOfServices.$dirty && !v.numberOfServices.required"
              aria-live="assertive">Number of services is required.</div>
          <div class="text-danger"
              v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.intValidator"
              aria-live="assertive">Number of Services must be an integer.</div>
          <div class="text-danger"
              v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.positiveNumberValidator"
              aria-live="assertive">Number of Services must be a positive number.</div>
          <Input label='Service Clarification Code:'
                :id='"service-clarification-code-" + index'
                class='mt-3'
                maxlength="1"
                v-model='claim.serviceClarificationCode' />
          <Input label='Fee Item:'
                :id='"fee-item-" + index'
                class='mt-3'
                maxlength="5"
                v-model='claim.feeItem' />
          <div class="text-danger"
              v-if="v.feeItem.$dirty && !v.feeItem.required"
              aria-live="assertive">Fee item is required.</div>
          <NumberInput label='Amount Billed:'
                :id='"amount-billed-" + index'
                class='mt-3'
                maxlength="7"
                v-model='claim.amountBilled' />
          <div class="text-danger"
              v-if="v.amountBilled.$dirty && !v.amountBilled.required"
              aria-live="assertive">Amount billed is required.</div>
          <div class="text-danger"
              v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.floatValidator"
              aria-live="assertive">Amount billed must be an decimal number.</div>
          <div class="text-danger"
              v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.positiveNumberValidator"
              aria-live="assertive">Amount billed must be a positive number.</div>  
          <TimeInput label='Called Start Time:'
                    :id='"called-start-time-" + index'
                    className='mt-3'
                    v-model='claim.calledStartTime' />
          <TimeInput label='Rendered Finish Time:'
                    :id='"rendered-finish-time-" + index'
                    className='mt-3'
                    v-model='claim.renderedFinishTime' />
          <Input label='Diagnostic Code:'
                :id='"diagnostic-code-" + index'
                class='mt-3'
                maxlength="5"
                v-model='claim.diagnosticCode' />
          <div class="text-danger"
              v-if="v.diagnosticCode.$dirty && !v.diagnosticCode.required"
              aria-live="assertive">Diagnostic code is required.</div>
          <Input label='Location of Service:'
                :id='"location-of-service-" + index'
                class='mt-3'
                maxlength="2"
                v-model='claim.locationOfService' />
          <Textarea label="Notes:"
            :id="'medical-notes-' + index"
            class="mt-3"
            v-model='claim.notes'
            :remainingCharsMaxlength='256'
            :isRemainingCharsShown="true"
            :inputStyle="textareaStyle" />
        </div>
        
        <div v-for="(claim, index) in hospitalVisitClaims"
            :key="'hospital-visit-claim' + index"
            :set="v = $v.hospitalVisitClaims.$each[index]">
          <h2 class="mt-5">{{getHospitalVisitClaimTitle(index)}}</h2>
          <NumberInput label='Month:'
                    className='mt-3'
                    maxlength="2"
                    v-model='claim.month' />
          <div class="text-danger"
              v-if="v.month.$dirty && !v.month.required"
              aria-live="assertive">Month is required.</div>
          <div class="text-danger"
            v-if="v.month.$dirty && v.month.required && !v.month.intValidator"
            aria-live="assertive">Month must be an integer.</div>
          <div class="text-danger"
            v-if="v.month.$dirty && v.month.required && !v.month.positiveNumberValidator"
            aria-live="assertive">Month must be a positive number.</div>
          <NumberInput label='Day From:'
                    className='mt-3'
                    maxlength="2"
                    v-model='claim.dayFrom' />
          <div class="text-danger"
              v-if="v.dayFrom.$dirty && !v.dayFrom.required"
              aria-live="assertive">Day From is required.</div>
          <div class="text-danger"
            v-if="v.dayFrom.$dirty && v.dayFrom.required && !v.dayFrom.intValidator"
            aria-live="assertive">Day from must be an integer.</div>
          <div class="text-danger"
            v-if="v.dayFrom.$dirty && v.dayFrom.required && !v.dayFrom.positiveNumberValidator"
            aria-live="assertive">Day from must be a positive number.</div>
          <NumberInput label='Day To:'
                    className='mt-3'
                    maxlength="2"
                    v-model='claim.dayTo' />
          <div class="text-danger"
            v-if="v.dayTo.$dirty && !v.dayTo.intValidator"
            aria-live="assertive">Day to must be an integer.</div>
          <div class="text-danger"
            v-if="v.dayTo.$dirty && !v.dayTo.positiveNumberValidator"
            aria-live="assertive">Day to must be a positive number.</div>
          <NumberInput label='Year:'
                    className='mt-3'
                    maxlength="4"
                    v-model='claim.year' />
          <div class="text-danger"
              v-if="v.year.$dirty && !v.year.required"
              aria-live="assertive">Year is required.</div>
          <div class="text-danger"
            v-if="v.year.$dirty && v.year.required && !v.year.intValidator"
            aria-live="assertive">Year must be an integer.</div>
          <div class="text-danger"
            v-if="v.year.$dirty && v.year.required && !v.year.positiveNumberValidator"
            aria-live="assertive">Year must be a positive number.</div>
          <NumberInput label='Number of Services:'
                :id='"number-of-services-" + index'
                class='mt-3'
                maxlength="2"
                v-model='claim.numberOfServices' />
          <div class="text-danger"
              v-if="v.numberOfServices.$dirty && !v.numberOfServices.required"
              aria-live="assertive">Number of services is required.</div>
          <div class="text-danger"
              v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.intValidator"
              aria-live="assertive">Number of Services must be an integer.</div>
          <div class="text-danger"
              v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.positiveNumberValidator"
              aria-live="assertive">Number of Services must be a positive number.</div> 
          <Input label='Service Clarification Code:'
                :id='"service-clarification-code-" + index'
                class='mt-3'
                maxlength="2"
                v-model='claim.serviceClarificationCode' />
          <Input label='Fee Item:'
                :id='"fee-item-" + index'
                class='mt-3'
                maxlength="5"
                v-model='claim.feeItem' />
          <div class="text-danger"
              v-if="v.feeItem.$dirty && !v.feeItem.required"
              aria-live="assertive">Fee item is required.</div>
          <NumberInput label='Amount Billed:'
                :id='"amount-billed-" + index'
                class='mt-3'
                maxlength="7"
                v-model='claim.amountBilled' />
          <div class="text-danger"
              v-if="v.amountBilled.$dirty && !v.amountBilled.required"
              aria-live="assertive">Amount billed is required.</div>
          <div class="text-danger"
              v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.floatValidator"
              aria-live="assertive">Amount billed must be an decimal number.</div>
          <div class="text-danger"
              v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.positiveNumberValidator"
              aria-live="assertive">Amount billed must be a positive number.</div> 
          <Input label='Diagnostic Code:'
                :id='"diagnostic-code-" + index'
                class='mt-3'
                maxlength="5"
                v-model='claim.diagnosticCode' />
          <div class="text-danger"
              v-if="v.diagnosticCode.$dirty && !v.diagnosticCode.required"
              aria-live="assertive">Diagnostic code is required.</div>
          <Input label='Location of Service:'
                :id='"location-of-service-" + index'
                class='mt-3'
                maxlength="2"
                v-model='claim.locationOfService' />
          <Textarea label="Notes:"
                :id="'hospital-notes-' + index"
                class="mt-3"
                v-model="claim.notes"
                :remainingCharsMaxlength="250"
                :isRemainingCharsShown="true"
                :inputStyle="textareaStyle" />
        </div>

        <h2 class="mt-5">Practitioner</h2>
        <Input label='Last Name or Clinic Name:'
              id='last-name-or-clinic-name'
              class='mt-3'
              maxlength="22"
              v-model='practitionerLastNameOrClinicName'/>
        <Input label='First Name Initial:'
              id='first-name-initial'
              class='mt-3'
              maxlength="1"
              v-model='practitionerFirstNameInitial'/>
        <Input label='Payment Number:'
              id='payment-number'
              class='mt-3'
              maxlength="5"
              v-model='practitionerPaymentNumber'/>
        <div class="text-danger"
            v-if="$v.practitionerPaymentNumber.$dirty && !$v.practitionerPaymentNumber.required"
            aria-live="assertive">Payment number is required.</div>
        <Input label='Practitioner Number:'
              id='practitioner-number'
              class='mt-3'
              maxlength="5"
              v-model='practitionerPractitionerNumber'/>
        <div class="text-danger"
            v-if="$v.practitionerPractitionerNumber.$dirty && !$v.practitionerPractitionerNumber.required"
            aria-live="assertive">Practitioner number is required.</div>
        <Input label='Facility Number:'
              id='practitioner-number'
              class='mt-3'
              maxlength="5"
              v-model='practitionerFacilityNumber'/>
        <Input label='Specialty Code:'
              id='specialty-code'
              class='mt-3'
              maxlength="2"
              v-model='practitionerSpecialtyCode'/>

        <h2 class="mt-5">Referred By</h2>
        <Input label='Last Name:'
              id='referred-by-last-name'
              class='mt-3'
              maxlength="18"
              v-model='referredByLastName'/>
        <Input label='First Name Initial:'
              id='referred-by-first-name-initial'
              class='mt-3'
              maxlength="1"
              v-model='referredByFirstNameInitial'/>
        <Input label='Practitioner Number:'
              id='referred-by-practitioner-number'
              class='mt-3'
              maxlength="5"
              v-model='referredByPractitionerNumber'/>

        <h2 class="mt-5">Referred To</h2>
        <Input label='Last Name:'
              id='referred-to-last-name'
              class='mt-3'
              maxlength="18"
              v-model='referredToLastName'/>
        <Input label='First Name Initial:'
              id='referred-to-first-name-initial'
              class='mt-3'
              maxlength="1"
              v-model='referredToFirstNameInitial'/>
        <Input label='Practitioner Number:'
              id='referred-to-practitioner-number'
              class='mt-3'
              maxlength="5"
              v-model='referredToPractitionerNumber'/>
      </div>
    </PageContent>
    <ContinueBar @continue="validateFields()" />
  </div>
</template>

<script>
import pageStateService from '@/services/page-state-service';
import {
  payPractitionerRoutes,
  isPastPath,
} from '@/router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition
} from '@/helpers/scroll';
import { getConvertedPath } from '@/helpers/url';
import ContinueBar from '@/components/ContinueBar.vue';
import PageContent from '@/components/PageContent.vue';
import TimeInput from '@/components/TimeInput.vue';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_PHN,
  SET_DEPENDENT_NUMBER,
  SET_FIRST_NAME,
  SET_MIDDLE_INITIAL,
  SET_LAST_NAME,
  SET_BIRTH_DATE,
  SET_IS_VEHICLE_ACCIDENT,
  SET_VEHICLE_ACCIDENT_CLAIM_NUMBER,
  SET_CORRESPONDENCE_ATTACHED,
  SET_SUBMISSION_CODE,
  SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM,
  SET_COVERAGE_PRE_AUTH_NUMBER,
  SET_PROCEDURE_OR_OPERATION,
  SET_HOSPITAL_VISIT_CLAIMS,
  SET_MEDICAL_SERVICE_CLAIMS,
  SET_PRACTITIONER_LAST_NAME_OR_CLINIC_NAME,
  SET_PRACTITIONER_FIRST_NAME_INITIAL,
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
import { required, maxLength } from 'vuelidate/lib/validators';
import {
  DateInput,
  Input,
  NumberInput,
  PhnInput,
  Radio,
  Textarea,
  intValidator,
  floatValidator,
  positiveNumberValidator,
  optionalValidator,
  phnValidator,
} from 'common-lib-vue';

const nameValidator = (value) => {
  const criteria = /^[a-zA-Z][a-zA-Z-.' ]*$/;
  return criteria.test(value);
};

const nameInitialValidator = (value) => {
  if (!value) {
    return true;
  }
  const criteria = /^[a-zA-Z]*$/;
  return criteria.test(value);
};

export default {
  name: 'MainFormPage',
  components: {
    ContinueBar,
    DateInput,
    Input,
    NumberInput,
    PageContent,
    PhnInput,
    Radio,
    Textarea,
    TimeInput,
  },
  data: () => {
    return {
      isPageLoaded: false,
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
      textareaStyle: {
        height: '150px'
      },

      phn: null,
      dependentNumber: null,
      firstName: null,
      middleInitial: null,
      lastName: null,
      birthDate: null,

      isVehicleAccident: null,
      vehicleAccidentClaimNumber: null,
      correspondenceAttached: null,
      submissionCode: null,
      planReferenceNumberOfOriginalClaim: null,
      coveragePreAuthNumber: null,
      procedureOrOperation: null,

      medicalServiceClaims: [],
      hospitalVisitClaims: [],

      practitionerLastNameOrClinicName: null,
      practitionerFirstNameInitial: null,
      practitionerPaymentNumber: null,
      practitionerPractitionerNumber: null,
      practitionerFacilityNumber: null,
      practitionerSpecialtyCode: null,

      referredByLastName: null,
      referredByFirstNameInitial: null,
      referredByPractitionerNumber: null,

      referredToLastName: null,
      referredToFirstNameInitial: null,
      referredToPractitionerNumber: null,
    };
  },
  created() {
    this.phn = this.$store.state.payPractitionerForm.phn;
    this.dependentNumber = this.$store.state.payPractitionerForm.dependentNumber;
    this.firstName = this.$store.state.payPractitionerForm.firstName;
    this.middleInitial = this.$store.state.payPractitionerForm.middleInitial;
    this.lastName = this.$store.state.payPractitionerForm.lastName;
    this.birthDate = this.$store.state.payPractitionerForm.birthDate;

    this.isVehicleAccident = this.$store.state.payPractitionerForm.isVehicleAccident;
    this.vehicleAccidentClaimNumber = this.$store.state.payPractitionerForm.vehicleAccidentClaimNumber;
    this.correspondenceAttached = this.$store.state.payPractitionerForm.correspondenceAttached;
    this.submissionCode = this.$store.state.payPractitionerForm.submissionCode;
    this.planReferenceNumberOfOriginalClaim = this.$store.state.payPractitionerForm.planReferenceNumberOfOriginalClaim;
    this.coveragePreAuthNumber = this.$store.state.payPractitionerForm.coveragePreAuthNumber;
    this.procedureOrOperation = this.$store.state.payPractitionerForm.procedureOrOperation;

    this.medicalServiceClaims = this.$store.state.payPractitionerForm.medicalServiceClaims;
    this.hospitalVisitClaims = this.$store.state.payPractitionerForm.hospitalVisitClaims;

    this.practitionerLastNameOrClinicName = this.$store.state.payPractitionerForm.practitionerLastNameOrClinicName;
    this.practitionerFirstNameInitial = this.$store.state.payPractitionerForm.practitionerFirstNameInitial;
    this.practitionerPaymentNumber = this.$store.state.payPractitionerForm.practitionerPaymentNumber;
    this.practitionerPractitionerNumber = this.$store.state.payPractitionerForm.practitionerPractitionerNumber;
    this.practitionerFacilityNumber = this.$store.state.payPractitionerForm.practitionerFacilityNumber;
    this.practitionerSpecialtyCode = this.$store.state.payPractitionerForm.practitionerSpecialtyCode;

    this.referredByLastName = this.$store.state.payPractitionerForm.referredByLastName;
    this.referredByFirstNameInitial = this.$store.state.payPractitionerForm.referredByFirstNameInitial;
    this.referredByPractitionerNumber = this.$store.state.payPractitionerForm.referredByPractitionerNumber;

    this.referredToLastName = this.$store.state.payPractitionerForm.referredToLastName;
    this.referredToFirstNameInitial = this.$store.state.payPractitionerForm.referredToFirstNameInitial;
    this.referredToPractitionerNumber = this.$store.state.payPractitionerForm.referredToPractitionerNumber;

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
      phn: {
        required,
        phnValidator,
      },
      dependentNumber: {
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
      },
      firstName: {
        required,
        nameValidator,
      },
      middleInitial: {
        nameInitialValidator,
      },
      lastName: {
        required,
        nameValidator,
      },
      birthDate: {
        required,
      },
      isVehicleAccident: {
        required,
      },
      vehicleAccidentClaimNumber: {
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
      },
      medicalServiceClaims: {
        $each: {
          serviceDate: {
            required,
          },
          numberOfServices: {
            required,
            intValidator,
            positiveNumberValidator,
          },
          feeItem: {
            required,
          },
          amountBilled: {
            required,
            floatValidator,
            positiveNumberValidator,
          },
          diagnosticCode: {
            required,
          },
          notes: {
            maxLength: maxLength(256),
          },
        }
      },
      hospitalVisitClaims: {
        $each: {
          month: {
            required,
            positiveNumberValidator,
            intValidator,
          },
          dayFrom: {
            required,
            positiveNumberValidator,
            intValidator,
          },
          dayTo: {
            intValidator: optionalValidator(intValidator),
            positiveNumberValidator: optionalValidator(positiveNumberValidator),
          },
          year: {
            required,
            positiveNumberValidator,
            intValidator,
          },
          numberOfServices: {
            required,
            intValidator,
            positiveNumberValidator,
          },
          feeItem: {
            required,
          },
          amountBilled: {
            required,
            floatValidator,
            positiveNumberValidator,
          },
          diagnosticCode: {
            required,
          },
          notes: {
            maxLength: maxLength(250),
          },
        }
      },
      practitionerPaymentNumber: {
        required,
      },
      practitionerPractitionerNumber: {
        required,
      }
    };
    return validations;
  },
  methods: {
    validateFields() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      this.$store.dispatch(formModule + '/' + SET_PHN, this.phn);
      this.$store.dispatch(formModule + '/' + SET_DEPENDENT_NUMBER, this.dependentNumber);
      this.$store.dispatch(formModule + '/' + SET_FIRST_NAME, this.firstName);
      this.$store.dispatch(formModule + '/' + SET_MIDDLE_INITIAL, this.middleInitial);
      this.$store.dispatch(formModule + '/' + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(formModule + '/' + SET_BIRTH_DATE, this.birthDate);

      this.$store.dispatch(formModule + '/' + SET_IS_VEHICLE_ACCIDENT, this.isVehicleAccident);
      this.$store.dispatch(formModule + '/' + SET_VEHICLE_ACCIDENT_CLAIM_NUMBER, this.vehicleAccidentClaimNumber);
      this.$store.dispatch(formModule + '/' + SET_CORRESPONDENCE_ATTACHED, this.correspondenceAttached);
      this.$store.dispatch(formModule + '/' + SET_SUBMISSION_CODE, this.submissionCode);
      this.$store.dispatch(formModule + '/' + SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM, this.planReferenceNumberOfOriginalClaim);
      this.$store.dispatch(formModule + '/' + SET_COVERAGE_PRE_AUTH_NUMBER, this.coveragePreAuthNumber);
      this.$store.dispatch(formModule + '/' + SET_PROCEDURE_OR_OPERATION, this.procedureOrOperation);

      this.$store.dispatch(formModule + '/' + SET_MEDICAL_SERVICE_CLAIMS, this.medicalServiceClaims);
      this.$store.dispatch(formModule + '/' + SET_HOSPITAL_VISIT_CLAIMS, this.hospitalVisitClaims);

      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_LAST_NAME_OR_CLINIC_NAME, this.practitionerLastNameOrClinicName);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_FIRST_NAME_INITIAL, this.practitionerFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PAYMENT_NUMBER, this.practitionerPaymentNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PRACTITIONER_NUMBER, this.practitionerPractitionerNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_FACILITY_NUMBER, this.practitionerFacilityNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_SPECIALTY_CODE, this.practitionerSpecialtyCode);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_LAST_NAME, this.referredByLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_FIRST_NAME_INITIAL, this.referredByFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_PRACTITIONER_NUMBER, this.referredByPractitionerNumber);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_LAST_NAME, this.referredToLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_FIRST_NAME_INITIAL, this.referredToFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_PRACTITIONER_NUMBER, this.referredToPractitionerNumber);
      
      // Navigate to next path.
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPractitionerRoutes.REVIEW_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    },
    getMedicalServiceClaimTitle(index) {
      if (this.medicalServiceClaims && this.medicalServiceClaims.length > 1) {
        return `Medical Service Claim (${index + 1} of ${this.medicalServiceClaims.length})`;
      }
      return 'Medical Service Claim';
    },
    getHospitalVisitClaimTitle(index) {
      if (this.hospitalVisitClaims && this.hospitalVisitClaims.length > 1) {
        return `Hospital Visit Claim (${index + 1} of ${this.hospitalVisitClaims.length})`;
      }
      return 'Hospital Visit Claim';
    },
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === payPractitionerRoutes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + '/' + RESET_FORM);
      next();
    } else if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
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

</style>
