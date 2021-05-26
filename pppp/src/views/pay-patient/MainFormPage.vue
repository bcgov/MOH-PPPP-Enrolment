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

        <hr/>

        <h2 class="mt-5">Medical Service Claim (1 of 1)</h2>

        <h2 class="mt-5">Practitioner</h2>

        <h2 class="mt-5">Referred By</h2>

        <h2 class="mt-5">Referred To</h2>
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
      
      // Navigate to next path.
      const toPath = payPatientRoutes.REVIEW_PAGE.path;
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    },
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
