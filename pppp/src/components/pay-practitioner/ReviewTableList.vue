<template>
  <div :class="className">

    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Patient</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage('patient')">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='patientData'
                :backgroundColor='tableBackgroundColor'/>
    
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2"></h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage('vehicle-accident')">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='vehicleAccidentData'
                :backgroundColor='tableBackgroundColor'/>

    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2"></h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage('claim-info')">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='claimInfoData'
                :backgroundColor='tableBackgroundColor'/>

    <div v-for="(claimData, index) in medicalServiceClaims"
        :key="'medical-service-claim-' + index">
      <div class="row align-items-end mt-3">
        <div class="col-9">
          <h2 class="mb-2">{{getMedicalServiceClaimTitle(index)}}</h2>
        </div>
        <div v-if='showEditButtons'
            class="col-3 text-right">
          <a href="javascript:void(0)"
            @click="navigateToMainFormPage(`medical-service-claim-${index}`)">Edit 
            <font-awesome-icon icon="pencil-alt" />
          </a>
        </div>
      </div>
      <ReviewTable :elements='claimData'
                  :backgroundColor='tableBackgroundColor'/>
    </div>

    <div v-for="(claimData, index) in hospitalVisitClaims"
        :key="'hospital-visit-claim-' + index">
      <div class="row align-items-end mt-3">
        <div class="col-9">
          <h2 class="mb-2">{{getHospitalVisitClaimTitle(index)}}</h2>
        </div>
        <div v-if='showEditButtons'
            class="col-3 text-right">
          <a href="javascript:void(0)"
            @click="navigateToMainFormPage(`hospital-visit-claim-${index}`)">Edit 
            <font-awesome-icon icon="pencil-alt" />
          </a>
        </div>
      </div>
      <ReviewTable :elements='claimData'
                  :backgroundColor='tableBackgroundColor'/>
    </div>
    
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Practitioner</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMainFormPage('practitioner')">Edit 
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
           @click="navigateToMainFormPage('referred-by')">Edit 
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
           @click="navigateToMainFormPage('referred-to')">Edit 
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
import { payPractitionerRoutes } from '@/router/routes';
import {
  scrollTo,
  scrollToElement,
} from '@/helpers/scroll';
import pageStateService from '@/services/page-state-service';
import { formatDate } from '@/helpers/date';
import { getConvertedPath } from '@/helpers/url';

export default {
  name: 'PayPractitionerReviewTableList',
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
        value: this.$store.state.payPractitionerForm.phn,
      });
      items.push({
        label: 'Dependant Number:',
        value: this.$store.state.payPractitionerForm.dependentNumber,
      });
      items.push({
        label: 'Legal First Name:',
        value: this.$store.state.payPractitionerForm.firstName,
      });
      items.push({
        label: 'Second Name Initial:',
        value: this.$store.state.payPractitionerForm.middleInitial,
      });
      items.push({
        label: 'Legal Last Name:',
        value: this.$store.state.payPractitionerForm.lastName,
      });
      items.push({
        label: 'Birth Date:',
        value: formatDate(this.$store.state.payPractitionerForm.birthDate),
      });
      return items;
    },
    vehicleAccidentData() {
      const items = [];
      items.push({
        label: 'Is this claim related to a motor vehicle accident?',
        value: this.$store.state.payPractitionerForm.isVehicleAccident === 'Y' ? 'Yes' : 'No',
      });
      items.push({
        label: 'Motor Vehicle Accident Claim Number:',
        value: this.$store.state.payPractitionerForm.vehicleAccidentClaimNumber,
      });
      return items;
    },
    claimInfoData() {
      const items = [];
      items.push({
        label: 'Correspondence Attached:',
        value: this.$store.state.payPractitionerForm.correspondenceAttached,
      });
      items.push({
        label: 'Submission Code:',
        value: this.$store.state.payPractitionerForm.submissionCode,
      });
      items.push({
        label: 'Plan Reference Number of Original Claim:',
        value: this.$store.state.payPractitionerForm.planReferenceNumberOfOriginalClaim,
      });
      items.push({
        label: 'Coverage Pre-Authorization Number:',
        value: this.$store.state.payPractitionerForm.coveragePreAuthNumber,
      });
      items.push({
        label: 'Procedure or Operation:',
        value: this.$store.state.payPractitionerForm.procedureOrOperation,
      });
      return items;
    },
    medicalServiceClaims() {
      const claims = [];
      const numClaims = this.$store.state.payPractitionerForm.medicalServiceClaims.length;

      for (let i = 0; i < numClaims; i++) {
        const itemData = [];
        itemData.push({
          label: 'Service Date:',
          value: formatDate(this.$store.state.payPractitionerForm.medicalServiceClaims[i].serviceDate),
        });
        itemData.push({
          label: 'Number of Services:',
          value: this.$store.state.payPractitionerForm.medicalServiceClaims[i].numberOfServices,
        });
        itemData.push({
          label: 'Service Clarification Code:',
          value: this.$store.state.payPractitionerForm.medicalServiceClaims[i].serviceClarificationCode,
        });
        itemData.push({
          label: 'Fee Item:',
          value: this.$store.state.payPractitionerForm.medicalServiceClaims[i].feeItem,
        });
        itemData.push({
          label: 'Amount Billed:',
          value: this.$store.state.payPractitionerForm.medicalServiceClaims[i].amountBilled,
        });
        const calledStartTime = this.$store.state.payPractitionerForm.medicalServiceClaims[i].calledStartTime;
        itemData.push({
          label: 'Called Start Time:',
          value: calledStartTime && calledStartTime.time ? calledStartTime.time : '',
        });
        const renderedFinishTime = this.$store.state.payPractitionerForm.medicalServiceClaims[i].renderedFinishTime;
        itemData.push({
          label: 'Rendered Finish Time:',
          value: renderedFinishTime && renderedFinishTime.time ? renderedFinishTime.time : '',
        });
        itemData.push({
          label: 'Diagnostic Code:',
          value: this.$store.state.payPractitionerForm.medicalServiceClaims[i].diagnosticCode,
        });
        itemData.push({
          label: 'Location of Service:',
          value: this.$store.state.payPractitionerForm.medicalServiceClaims[i].locationOfService,
        });
        itemData.push({
          label: 'Notes:',
          value: this.$store.state.payPractitionerForm.medicalServiceClaims[i].notes,
        });
        claims.push(itemData);
      }
      return claims;
    },
    hospitalVisitClaims() {
      const claims = [];
      const numClaims = this.$store.state.payPractitionerForm.hospitalVisitClaims.length;

      for (let i = 0; i < numClaims; i++) {
        const itemData = [];
        itemData.push({
          label: 'Month:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].month,
        });
        itemData.push({
          label: 'Day from:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].dayFrom,
        });
        itemData.push({
          label: 'Day to:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].dayTo,
        });
        itemData.push({
          label: 'Year:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].year,
        });
        itemData.push({
          label: 'Number of Services:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].numberOfServices,
        });
        itemData.push({
          label: 'Service Clarification Code:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].serviceClarificationCode,
        });
        itemData.push({
          label: 'Fee Item:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].feeItem,
        });
        itemData.push({
          label: 'Amount Billed:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].amountBilled,
        });
        itemData.push({
          label: 'Diagnostic Code:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].diagnosticCode,
        });
        itemData.push({
          label: 'Location of Service:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].locationOfService,
        });
        itemData.push({
          label: 'Notes:',
          value: this.$store.state.payPractitionerForm.hospitalVisitClaims[i].notes,
        });
        claims.push(itemData);
      }
      return claims;
    },
    practitionerData() {
      const items = [];
      items.push({
        label: 'Practitioner Last Name:',
        value: this.$store.state.payPractitionerForm.practitionerLastName,
      });
      items.push({
        label: 'Practitioner First Name:',
        value: this.$store.state.payPractitionerForm.practitionerFirstName,
      });
      items.push({
        label: 'Specialty Code:',
        value: this.$store.state.payPractitionerForm.practitionerSpecialtyCode,
      });
      items.push({
        label: 'Practitioner Number:',
        value: this.$store.state.payPractitionerForm.practitionerPractitionerNumber,
      });
      items.push({
        label: 'Payment Number:',
        value: this.$store.state.payPractitionerForm.practitionerPaymentNumber,
      });
      items.push({
        label: 'Facility Number:',
        value: this.$store.state.payPractitionerForm.practitionerFacilityNumber,
      });
      items.push({
        label: 'Clinic Name:',
        value: this.$store.state.payPractitionerForm.practitionerClinicName,
      });
      return items;
    },
    referredByData() {
      const items = [];
      items.push({
        label: 'Referred By Practitioner First Name:',
        value: this.$store.state.payPractitionerForm.referredByFirstName,
      });
      items.push({
        label: 'Referred By Practitioner Last Name:',
        value: this.$store.state.payPractitionerForm.referredByLastName,
      });
      items.push({
        label: 'Referred By Practitioner Number:',
        value: this.$store.state.payPractitionerForm.referredByPractitionerNumber,
      });
      return items;
    },
    referredToData() {
      const items = [];
      items.push({
        label: 'Referred To Practitioner First Name:',
        value: this.$store.state.payPractitionerForm.referredToFirstName,
      });
      items.push({
        label: 'Referred To Practitioner Last Name:',
        value: this.$store.state.payPractitionerForm.referredToLastName,
      });
      items.push({
        label: 'Referred To Practitioner Number:',
        value: this.$store.state.payPractitionerForm.referredToPractitionerNumber,
      });
      return items;
    }
  },
  methods: {
    navigateToClaimCountPage() {
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPractitionerRoutes.CLAIM_COUNT_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
      scrollTo();
    },
    navigateToMainFormPage(anchorName) {
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPractitionerRoutes.MAIN_FORM_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
      this.$nextTick(() => {
        const anchorEl = document.querySelector(`a[name="${anchorName}"`);
        scrollToElement(anchorEl, false, 0);
      }, 0);
    },
    getMedicalServiceClaimTitle(index) {
      const claims = this.$store.state.payPractitionerForm.medicalServiceClaims;
      if (claims && claims.length > 1) {
        return `Medical Service Claim (${index + 1} of ${this.medicalServiceClaims.length})`;
      }
      return 'Medical Service Claim';
    },
    getHospitalVisitClaimTitle(index) {
      const claims = this.$store.state.payPractitionerForm.hospitalVisitClaims;
      if (claims && claims.length > 1) {
        return `Hospital Visit Claim (${index + 1} of ${this.hospitalVisitClaims.length})`;
      }
      return 'Hospital Visit Claim';
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

