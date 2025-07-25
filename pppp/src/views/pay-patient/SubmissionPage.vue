<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <div class="row align-items-end mt-3">
          <div class="col-9">
            <h1 class="mb-0">Confirmation of Submission</h1>
          </div>
          <div class="col-3 text-right">
            <a href="javascript:void(0)"
              class="print-btn"
              @click="printPage()">Print or Save as PDF
              <IconPrint
                color="#1a5a96"
                class="print-icon"
              />
            </a>
            <div class="tip-container">
              <IconInfoCircle class="info-circle-icon ml-2" />
              <div class="tip">To save as a PDF, in the print window, select “Save as PDF”</div>
            </div>
          </div>
        </div>
        <hr/>

        <div class="success-box container">
          <div class="row align-items-center">
            <div class="col-md-1 pr-0 icon-container text-center">
              <IconCheckCircle
                color="#2E8540"
                class="check-circle-icon"
              />
            </div>
            <div class="col-md-10 pt-2 pb-2">
              <p>Your submission has been received.</p>
              <div class="row mb-3 mb-sm-0">
                <div class="info-box-label-cell">Date of Submission:</div>
                <div class="info-box-value-cell"><b>{{ submissionDate }}</b></div>
              </div>
              <div class="row">
                <div class="info-box-label-cell">Plan Reference Number:</div>
                <div class="info-box-value-cell"><b>{{referenceNumber}}</b></div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="mt-4">Next Steps</h3>
        <hr/>
        <ul v-if='!isCSR'>
          <li>Please <a href="javascript:void(0)" @click="printPage()" class="print-link">print</a> this page for your records.</li>
          <li>Do not mail in a printed version of this form to Health Insurance BC.</li>
          <li>If you need to complete this form again for any additional claims, 
            please click the "Start new form" button below.</li>
          <li>Please contact <a href="https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/msp/contact-us" target="_blank">Health Insurance BC</a> if you have any questions.</li>
        </ul>

        <ButtonComponent
          :label="'Start new form'"
          data-cy="newForm"
          @click="onNewForm()"
        />

        <ReviewTableList className='mt-5 mb-5' />
      </div>
    </PageContent>
  </div>
</template>

<script>
import PageContent from '@/components/PageContent.vue';
import ReviewTableList from '@/components/pay-patient/ReviewTableList.vue';
import {
  ButtonComponent,
  IconCheckCircle,
  IconInfoCircle,
  IconPrint,
  formatDate,
} from 'common-lib-vue';
import { getConvertedPath, isCSR } from '@/helpers/url';
import pageStateService from '@/services/page-state-service';
import {
  payPatientRoutes,
  payPatientCSRRoutes
} from '@/router/routes';
import {
  MODULE_NAME as formModule,
  RESET_FORM
} from '@/store/modules/pay-patient-form';
import { scrollTo } from '@/helpers/scroll';
import logService from '@/services/log-service';

export default {
  name: 'SubmissionPage',
  components: {
    IconCheckCircle,
    IconInfoCircle,
    IconPrint,
    PageContent,
    ReviewTableList,
    ButtonComponent: ButtonComponent,
  },
  data: () => {
    return {
      submissionDate: '',
      referenceNumber: '',
    };
  },
  created() {
    this.submissionDate = formatDate(this.$store.state.payPatientForm.submissionDate);
    this.referenceNumber = this.$store.state.payPatientForm.referenceNumber || 'Unknown';

    logService.logNavigation(
      this.$store.state.payPatientForm.applicationUuid,
      payPatientRoutes.SUBMISSION_PAGE.path,
      payPatientRoutes.SUBMISSION_PAGE.title
    );
  },
  methods: {
    printPage() {
      window.print();
    },
    onNewForm() {
      window.location.reload();
    }
  },
  computed: {
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
    },
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    this.$store.dispatch(formModule + '/' + RESET_FORM);
    if (to.path === payPatientRoutes.HOME_PAGE.path
      || to.path === payPatientCSRRoutes.HOME_PAGE.path) {
      next();
    } else {
      const toPath = getConvertedPath(
        this.$router.currentRoute.value.path,
        payPatientRoutes.HOME_PAGE.path
      );
      next({ path: toPath });
    }
    setTimeout(() => {
      scrollTo(0);
    }, 0);
  }
}
</script>

<style scoped>
.fa-check-circle {
  color: rgba(46, 133, 64, 1);
}

.tip-container {
  position: relative;
  display: inline-block;
  color: black;
}

/* Tooltip text */
.tip-container .tip {
  visibility: hidden;
  width: 220px;
  background-color: #f2f2f2;
  color: #606060;
  text-align: center;
  padding: 2px 4px;
  border: 2px solid #606060;
  font-weight: normal;
  font-size: 13.33px;
  right: 25px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tip-container:hover .tip {
  visibility: visible;
}

.success-box {
  border-radius: 10px;
  border: 5px solid rgba(46, 133, 64, 1);
  padding: 10px;
}

.print-btn {
  text-decoration: none;
}
.print-link {
  text-decoration: none;
  font-weight: bold;
}
.box-border {
  border-width: 4px !important;
}
.status-icon {
  font-size: 32px;
}
.print-icon {
  width: 16px;
  height: 16px;
}
.info-circle-icon {
  width: 16px;
  height: 16px;
}
.check-circle-icon {
  widows: 32px;
  height: 32px;
}
.info-box-label-cell {
  min-width: 230px;
  padding-left: 15px;
}
@media only screen and (max-width: 575px) {
  .info-box-value-cell {
    width: 100%;
    padding-left: 15px;
  }
}
</style>
