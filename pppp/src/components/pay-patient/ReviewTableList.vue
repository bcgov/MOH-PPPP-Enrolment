<template>
  <div :class="className">

    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Patient</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='patientData'
                :backgroundColor='tableBackgroundColor'/>
    
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Payment Mailing Address</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='paymentMailAddressData'
                :backgroundColor='tableBackgroundColor'/>
    
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2"></h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='vehicleAccidentData'
                :backgroundColor='tableBackgroundColor'/>
    
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Practitioner</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='practitionerData'
                :backgroundColor='tableBackgroundColor'/>

    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Referred By</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='referredByData'
                :backgroundColor='tableBackgroundColor'/>
    
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Referred To</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='referredToData'
                :backgroundColor='tableBackgroundColor'/>

  </div>
</template>

<script>
import ReviewTable from '@/components/ReviewTable.vue';
import { payPatientRoutes } from '@/router/routes';
import { scrollTo } from '@/helpers/scroll';
import pageStateService from '@/services/page-state-service';
import { formatDate } from '@/helpers/date';
import { capitalCaseWord } from '@/helpers/string';

export default {
  name: 'PayPatientReviewTableList',
  components: {
    ReviewTable,
  },
  props: {
    showEditButtons: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    tableBackgroundColor: {
      type: String,
    }
  },
  computed: {
    patientData() {
      const items = [];
      items.push({
        label: 'Personal Health Number:',
        value: this.$store.state.payPatientForm.phn,
      });
      items.push({
        label: 'Dependant Number:',
        value: this.$store.state.payPatientForm.dependentNumber,
      });
      items.push({
        label: 'Legal First Name:',
        value: this.$store.state.payPatientForm.firstName,
      });
      items.push({
        label: 'Second Name Initial:',
        value: this.$store.state.payPatientForm.middleInitial,
      });
      items.push({
        label: 'Legal Last Name:',
        value: this.$store.state.payPatientForm.lastName,
      });
      items.push({
        label: 'Birth Date:',
        value: formatDate(this.$store.state.payPatientForm.birthDate),
      });
      return items;
    },
    paymentMailAddressData() {
      const items = [];
      items.push({
        label: 'Whose address is this?',
        value: capitalCaseWord(this.$store.state.payPatientForm.addressOwner),
      });
      items.push({
        label: 'Apartment / Unit:',
        value: this.$store.state.payPatientForm.unitNumber,
      });
      items.push({
        label: 'Street Number:',
        value: this.$store.state.payPatientForm.streetNumber,
      });
      items.push({
        label: 'Street Name:',
        value: this.$store.state.payPatientForm.streetName,
      });
      items.push({
        label: 'City:',
        value: this.$store.state.payPatientForm.city,
      });
      items.push({
        label: 'Province:',
        value: 'British Columbia',
      });
      items.push({
        label: 'Postal Code:',
        value: this.$store.state.payPatientForm.postalCode,
      });
      return items;
    },
    vehicleAccidentData() {
      const items = [];
      items.push({
        label: 'Is this claim related to a motor vehicle accident?',
        value: this.$store.state.payPatientForm.isVehicleAccident === 'Y' ? 'Yes' : 'No',
      });
      items.push({
        label: 'Motor Vehicle Accident Claim Number:',
        value: this.$store.state.payPatientForm.vehicleAccidentClaimNumber,
      });
      items.push({
        label: 'Correspondence Attached:',
        value: this.$store.state.payPatientForm.correspondenceAttached,
      });
      items.push({
        label: 'Submission Code:',
        value: this.$store.state.payPatientForm.submissionCode,
      });
      items.push({
        label: 'Plan Reference Number of Original Claim:',
        value: this.$store.state.payPatientForm.planReferenceNumberOfOriginalClaim,
      });
      items.push({
        label: 'Diagnosis or Area of Treatment:',
        value: this.$store.state.payPatientForm.diagnosisOrAreaOfTreatment,
      });
      return items;
    },
    medicalServiceClaims() {
      const claims = [];
      return claims;
    },
    practitionerData() {
      const items = [];
      items.push({
        label: 'Last Name or Clinic Name:',
        value: this.$store.state.payPatientForm.practitionerLastNameOrClinicName,
      });
      items.push({
        label: 'First Name Initial:',
        value: this.$store.state.payPatientForm.practitionerFirstNameInitial,
      });
      items.push({
        label: 'Payment Number:',
        value: this.$store.state.payPatientForm.practitionerPaymentNumber,
      });
      items.push({
        label: 'Practitioner Number:',
        value: this.$store.state.payPatientForm.practitionerPractitionerNumber,
      });
      items.push({
        label: 'Specialty Code:',
        value: this.$store.state.payPatientForm.practitionerSpecialtyCode,
      });
      return items;
    },
    referredByData() {
      const items = [];
      items.push({
        label: 'Last Name:',
        value: this.$store.state.payPatientForm.referredByLastName,
      });
      items.push({
        label: 'First Name Initial:',
        value: this.$store.state.payPatientForm.referredByFirstNameInitial,
      });
      items.push({
        label: 'Practitioner Number:',
        value: this.$store.state.payPatientForm.referredByPractitionerNumber,
      });
      return items;
    },
    referredToData() {
      const items = [];
      items.push({
        label: 'Last Name:',
        value: this.$store.state.payPatientForm.referredToLastName,
      });
      items.push({
        label: 'First Name Initial:',
        value: this.$store.state.payPatientForm.referredToFirstNameInitial,
      });
      items.push({
        label: 'Practitioner Number:',
        value: this.$store.state.payPatientForm.referredToPractitionerNumber,
      });
      return items;
    }
  },
  methods: {
    navigateToClaimCountPage() {
      const toPath = payPatientRoutes.CLAIM_COUNT_PAGE.path;
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
      scrollTo();
    },
    navigateToMainFormPage() {
      const toPath = payPatientRoutes.MAIN_FORM_PAGE.path;
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
      scrollTo();
    },
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
