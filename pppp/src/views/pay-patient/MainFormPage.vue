<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Pay Patient Claim</h1>
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
        <Input label='Dependant Number:'
              id='dependent-number'
              className='mt-3'
              v-model='dependentNumber' />
        <Input label='Legal First Name:'
              id='first-name'
              className='mt-3'
              v-model='firstName' />
        <div class="text-danger"
            v-if="$v.firstName.$dirty && !$v.firstName.required"
            aria-live="assertive">Legal First Name is required.</div>
        <Input label='Second Name Initial:'
              id='middle-initial'
              className='mt-3'
              v-model='middleInitial' />
        <Input label='Legal Last Name:'
              id='last-name'
              className='mt-3'
              v-model='lastName' />
        <div class="text-danger"
            v-if="$v.lastName.$dirty && !$v.lastName.required"
            aria-live="assertive">Legal Last Name is required.</div>
        <DateInput label='Birth Date:'
              className='mt-3'
              v-model='birthDate' />
        <div class="text-danger"
            v-if="$v.birthDate.$dirty && !$v.birthDate.required"
            aria-live="assertive">Birth Date is required.</div>
        
        <h2 class="mt-5">Payment Mailing Address</h2>
        <Radio label='Whose address is this?'
              class='mt-3'
              v-model='addressOwner'
              :items='addressOwnerOptions' />
        <div class="text-danger"
            v-if="$v.addressOwner.$dirty && !$v.addressOwner.required"
            aria-live="assertive">This field is required.</div>
        <Input label='Apartment / Unit:'
              id='unit-number'
              className='mt-3'
              v-model='unitNumber' />
        <Input label='Street Number:'
              id='street-number'
              className='mt-3'
              v-model='streetNumber' />
        <Input label='Street Name:'
              id='street-name'
              className='mt-3'
              v-model='streetName' />
        <div class="text-danger"
            v-if="$v.streetName.$dirty && !$v.streetName.required"
            aria-live="assertive">Street Name is required.</div>
        <Input label='City:'
              id='city'
              className='mt-3'
              v-model='city' />
        <div class="text-danger"
            v-if="$v.city.$dirty && !$v.city.required"
            aria-live="assertive">City is required.</div>
        <div class='my-3'>Province:</div>
        <p><strong>British Columbia</strong></p>
        <PostalCodeInput label='Postal Code:'
              id='postal-code'
              className='mt-3'
              v-model='postalCode' />
        <div class="text-danger"
            v-if="$v.postalCode.$dirty && !$v.postalCode.required"
            aria-live="assertive">Postal Code is required.</div>
        <div class="text-danger"
            v-if="$v.postalCode.$dirty && $v.postalCode.required && !$v.postalCode.bcPostalCodeValidator"
            aria-live="assertive">Must be a valid BC postal code.</div>

        <hr class='mt-5'/>
        <Radio label='Is this claim related to a motor vehicle accident?'
              class='mt-3'
              v-model='isVehicleAccident'
              :items='isVehicleAccidentOptions' />
        <div class="text-danger"
            v-if="$v.isVehicleAccident.$dirty && !$v.isVehicleAccident.required"
            aria-live="assertive">This field is required.</div>
        <Input label='Motor Vehicle Accident Claim Number:'
              id='vehicle-accident-claim-number'
              class='mt-3'
              v-model='vehicleAccidentClaimNumber'/>
        <Input label='Correspondence Attached:'
              id='correspondence-attached'
              class='mt-3'
              v-model='correspondenceAttached'/>
        <Input label='Submission Code:'
              id='submission-code'
              class='mt-3'
              v-model='submissionCode'/>
        <Input label='Plan Reference Number of Original Claim:'
              id='plan-reference-number-of-original-claim'
              class='mt-3'
              v-model='planReferenceNumberOfOriginalClaim'/>
        <Input label='Diagnosis or Area of Treatment:'
              id='diagnosis-or-area-of-treatment'
              class='mt-3'
              v-model='diagnosisOrAreaOfTreatment'/>

        <div v-for="(claim, index) in medicalServiceClaims"
            :key="index"
            :set="v = $v.medicalServiceClaims.$each[index]">
          <h2 class="mt-5">{{getMedicalServiceClaimTitle(index)}}</h2>
          <DateInput label='Service Date:'
                    className='mt-3'
                    v-model='claim.serviceDate' />
          <div class="text-danger"
              v-if="v.serviceDate.$dirty && !v.serviceDate.required"
              aria-live="assertive">Service date is required.</div>
          <Input label='Number of Services:'
                :id='"number-of-services-" + index'
                class='mt-3'
                v-model='claim.numberOfServices' />
          <div class="text-danger"
              v-if="v.numberOfServices.$dirty && !v.numberOfServices.required"
              aria-live="assertive">Number of services is required.</div>
          <Input label='Service Clarification Code:'
                :id='"service-clarification-code-" + index'
                class='mt-3'
                v-model='claim.serviceClarificationCode' />
          <Input label='Fee Item:'
                :id='"fee-item-" + index'
                class='mt-3'
                v-model='claim.feeItem' />
          <div class="text-danger"
              v-if="v.feeItem.$dirty && !v.feeItem.required"
              aria-live="assertive">Fee item is required.</div>
          <Input label='Amount Billed:'
                :id='"amount-billed-" + index'
                class='mt-3'
                v-model='claim.amountBilled' />
          <div class="text-danger"
              v-if="v.amountBilled.$dirty && !v.amountBilled.required"
              aria-live="assertive">Amount billed is required.</div>
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
                v-model='claim.diagnosticCode' />
          <div class="text-danger"
              v-if="v.diagnosticCode.$dirty && !v.diagnosticCode.required"
              aria-live="assertive">Diagnostic code is required.</div>
          <Input label='Location of Service:'
                :id='"location-of-service-" + index'
                class='mt-3'
                v-model='claim.locationOfService' />
        </div>

        <h2 class="mt-5">Practitioner</h2>
        <Input label='Last Name or Clinic Name:'
              id='last-name-or-clinic-name'
              class='mt-3'
              v-model='practitionerLastNameOrClinicName'/>
        <Input label='First Name Initial:'
              id='first-name-initial'
              class='mt-3'
              v-model='practitionerFirstNameInitial'/>
        <Input label='Payment Number:'
              id='payment-number'
              class='mt-3'
              v-model='practitionerPaymentNumber'/>
        <div class="text-danger"
            v-if="$v.practitionerPaymentNumber.$dirty && !$v.practitionerPaymentNumber.required"
            aria-live="assertive">Payment number is required.</div>
        <Input label='Practitioner Number:'
              id='practitioner-number'
              class='mt-3'
              v-model='practitionerPractitionerNumber'/>
        <div class="text-danger"
            v-if="$v.practitionerPractitionerNumber.$dirty && !$v.practitionerPractitionerNumber.required"
            aria-live="assertive">Practitioner number is required.</div>
        <Input label='Specialty Code:'
              id='specialty-code'
              class='mt-3'
              v-model='practitionerSpecialtyCode'/>

        <h2 class="mt-5">Referred By</h2>
        <Input label='Last Name:'
              id='referred-by-last-name'
              class='mt-3'
              v-model='referredByLastName'/>
        <Input label='First Name Initial:'
              id='referred-by-first-name-initial'
              class='mt-3'
              v-model='referredByFirstNameInitial'/>
        <Input label='Practitioner Number:'
              id='referred-by-practitioner-number'
              class='mt-3'
              v-model='referredByPractitionerNumber'/>

        <h2 class="mt-5">Referred To</h2>
        <Input label='Last Name:'
              id='referred-to-last-name'
              class='mt-3'
              v-model='referredToLastName'/>
        <Input label='First Name Initial:'
              id='referred-to-first-name-initial'
              class='mt-3'
              v-model='referredToFirstNameInitial'/>
        <Input label='Practitioner Number:'
              id='referred-to-practitioner-number'
              class='mt-3'
              v-model='referredToPractitionerNumber'/>
      </div>
    </PageContent>
    <ContinueBar @continue="validateFields()" />
  </div>
</template>

<script>
import pageStateService from '@/services/page-state-service';
import {
  payPatientRoutes,
  isPastPath,
} from '@/router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition
} from '@/helpers/scroll';
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
  SET_ADDRESS_OWNER,
  SET_UNIT_NUMBER,
  SET_STREET_NUMBER,
  SET_STREET_NAME,
  SET_CITY,
  SET_POSTAL_CODE,
  SET_IS_VEHICLE_ACCIDENT,
  SET_VEHICLE_ACCIDENT_CLAIM_NUMBER,
  SET_CORRESPONDENCE_ATTACHED,
  SET_SUBMISSION_CODE,
  SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM,
  SET_DIAGNOSIS_OR_AREA_OF_TREATMENT,
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
} from '@/store/modules/pay-patient-form';
import logService from '@/services/log-service';
import { required } from 'vuelidate/lib/validators';
import {
  DateInput,
  Input,
  PhnInput,
  PostalCodeInput,
  Radio,
  phnValidator,
} from 'common-lib-vue';

const bcPostalCodeValidator = (value) => {
  if (value && value !== '') {
    const criteria = RegExp('^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$');
    return criteria.test(value);
  }
  return true;
};

export default {
  name: 'EmptyPage',
  components: {
    ContinueBar,
    DateInput,
    Input,
    PageContent,
    PhnInput,
    PostalCodeInput,
    Radio,
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

      phn: null,
      dependentNumber: null,
      firstName: null,
      middleInitial: null,
      lastName: null,
      birthDate: null,

      addressOwner: null,
      unitNumber: null,
      streetNumber: null,
      streetName: null,
      city: null,
      postalCode: null,

      isVehicleAccident: null,
      vehicleAccidentClaimNumber: null,
      correspondenceAttached: null,
      submissionCode: null,
      planReferenceNumberOfOriginalClaim: null,
      diagnosisOrAreaOfTreatment: null,

      medicalServiceClaims: [],

      practitionerLastNameOrClinicName: null,
      practitionerFirstNameInitial: null,
      practitionerPaymentNumber: null,
      practitionerPractitionerNumber: null,
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
    this.correspondenceAttached = this.$store.state.payPatientForm.correspondenceAttached;
    this.submissionCode = this.$store.state.payPatientForm.submissionCode;
    this.planReferenceNumberOfOriginalClaim = this.$store.state.payPatientForm.planReferenceNumberOfOriginalClaim;
    this.diagnosisOrAreaOfTreatment = this.$store.state.payPatientForm.diagnosisOrAreaOfTreatment;

    this.medicalServiceClaims = this.$store.state.payPatientForm.medicalServiceClaims;

    this.practitionerLastNameOrClinicName = this.$store.state.payPatientForm.practitionerLastNameOrClinicName;
    this.practitionerFirstNameInitial = this.$store.state.payPatientForm.practitionerFirstNameInitial;
    this.practitionerPaymentNumber = this.$store.state.payPatientForm.practitionerPaymentNumber;
    this.practitionerPractitionerNumber = this.$store.state.payPatientForm.practitionerPractitionerNumber;
    this.practitionerSpecialtyCode = this.$store.state.payPatientForm.practitionerSpecialtyCode;

    this.referredByLastName = this.$store.state.payPatientForm.referredByLastName;
    this.referredByFirstNameInitial = this.$store.state.payPatientForm.referredByFirstNameInitial;
    this.referredByPractitionerNumber = this.$store.state.payPatientForm.referredByPractitionerNumber;

    this.referredToLastName = this.$store.state.payPatientForm.referredToLastName;
    this.referredToFirstNameInitial = this.$store.state.payPatientForm.referredToFirstNameInitial;
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
      phn: {
        required,
        phnValidator,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      birthDate: {
        required,
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
      medicalServiceClaims: {
        $each: {
          serviceDate: {
            required,
          },
          numberOfServices: {
            required,
          },
          feeItem: {
            required,
          },
          amountBilled: {
            required,
          },
          diagnosticCode: {
            required,
          }
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

      this.$store.dispatch(formModule + '/' + SET_ADDRESS_OWNER, this.addressOwner);
      this.$store.dispatch(formModule + '/' + SET_UNIT_NUMBER, this.unitNumber);
      this.$store.dispatch(formModule + '/' + SET_STREET_NUMBER, this.streetNumber);
      this.$store.dispatch(formModule + '/' + SET_STREET_NAME, this.streetName);
      this.$store.dispatch(formModule + '/' + SET_CITY, this.city);
      this.$store.dispatch(formModule + '/' + SET_POSTAL_CODE, this.postalCode);

      this.$store.dispatch(formModule + '/' + SET_IS_VEHICLE_ACCIDENT, this.isVehicleAccident);
      this.$store.dispatch(formModule + '/' + SET_VEHICLE_ACCIDENT_CLAIM_NUMBER, this.vehicleAccidentClaimNumber);
      this.$store.dispatch(formModule + '/' + SET_CORRESPONDENCE_ATTACHED, this.correspondenceAttached);
      this.$store.dispatch(formModule + '/' + SET_SUBMISSION_CODE, this.submissionCode);
      this.$store.dispatch(formModule + '/' + SET_PLAN_REFERENCE_NUMBER_OF_ORIGINAL_CLAIM, this.planReferenceNumberOfOriginalClaim);
      this.$store.dispatch(formModule + '/' + SET_DIAGNOSIS_OR_AREA_OF_TREATMENT, this.diagnosisOrAreaOfTreatment);

      this.$store.dispatch(formModule + '/' + SET_MEDICAL_SERVICE_CLAIMS, this.medicalServiceClaims);

      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_LAST_NAME_OR_CLINIC_NAME, this.practitionerLastNameOrClinicName);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_FIRST_NAME_INITIAL, this.practitionerFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PAYMENT_NUMBER, this.practitionerPaymentNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_PRACTITIONER_NUMBER, this.practitionerPractitionerNumber);
      this.$store.dispatch(formModule + '/' + SET_PRACTITIONER_SPECIALTY_CODE, this.practitionerSpecialtyCode);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_LAST_NAME, this.referredByLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_FIRST_NAME_INITIAL, this.referredByFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_BY_PRACTITIONER_NUMBER, this.referredByPractitionerNumber);

      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_LAST_NAME, this.referredToLastName);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_FIRST_NAME_INITIAL, this.referredToFirstNameInitial);
      this.$store.dispatch(formModule + '/' + SET_REFERRED_TO_PRACTITIONER_NUMBER, this.referredToPractitionerNumber);

      // Navigate to next path.
      const toPath = payPatientRoutes.REVIEW_PAGE.path;
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
    }
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === payPatientRoutes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + '/' + RESET_FORM);
      next();
    } else if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: payPatientRoutes.MAIN_FORM_PAGE.path,
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
