<template>
  <div>
    <ConsentModal v-if="isConsentModalOpen"
                  :applicationUuid="applicationUuid"
                  @close="handleCloseConsentModal"
                  @captchaVerified="handleCaptchaVerified" />
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Pay Patient Claim</h1>
        <hr/>

        <h2>Service(s)</h2>
        <NumberSelect label="How many medical service claims for the patient are you including in this submission?"
                id='claim-count'
                v-model='claimCount'
                :min='1'
                :max='4'
                :inputStyle='inputStyle'/>
        <div class="text-danger"
            v-if="$v.claimCount.$dirty && !$v.claimCount.required"
            aria-live="assertive">Claim count is required.</div>
      </div>
    </PageContent>
    <ContinueBar @continue="validateFields()" />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import pageStateService from '@/services/page-state-service';
import spaEnvService from '@/services/spa-env-service';
import {
  payPatientRoutes,
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
import ConsentModal from '@/components/ConsentModal.vue';
import {
  MODULE_NAME as formModule,
  SET_APPLICATION_UUID,
  SET_CAPTCHA_TOKEN,
  SET_IS_INFO_COLLECTION_NOTICE_OPEN,
  SET_CLAIM_COUNT,
  SET_MEDICAL_SERVICE_CLAIMS,
} from '@/store/modules/pay-patient-form';
import {
  MODULE_NAME as appModule,
  SET_IS_MODAL_OPEN,
} from '@/store/modules/app';
import logService from '@/services/log-service';
import { required } from 'vuelidate/lib/validators';
import {
  NumberSelect,
  cloneDeep,
} from 'common-lib-vue';

export default {
  name: 'EmptyPage',
  components: {
    ConsentModal,
    ContinueBar,
    NumberSelect,
    PageContent,
  },
  data: () => {
    return {
      isPageLoaded: false,
      claimCount: null,
      inputStyle: {
        width: '160px',
        maxWidth: '100%',
      },
      applicationUuid: null,
    };
  },
  created() {
    if (this.isFirstLoad()) {
      this.applicationUuid = uuidv4();
      this.$store.dispatch(formModule + '/' + SET_APPLICATION_UUID, this.applicationUuid);
      this.$store.dispatch(appModule + '/' + SET_IS_MODAL_OPEN, true);

      // Load environment variables, and route to maintenance page.
      spaEnvService.loadEnvs()
        .then(() => {
          if (spaEnvService.values && spaEnvService.values.SPA_ENV_OOP_MAINTENANCE_FLAG === 'true') {
            const toPath = payPatientRoutes.MAINTENANCE_PAGE.path;
            pageStateService.setPageComplete(toPath);
            pageStateService.visitPage(toPath);
            this.$router.push(toPath);
          }
        })
        .catch((error) => {
          logService.logError(this.applicationUuid, {
            event: 'HTTP error getting values from spa-env-server',
            status: error.response.status,
          });
        });
    }
    this.applicationUuid = this.$store.state.payPatientForm.applicationUuid;
    this.claimCount = this.$store.state.payPatientForm.claimCount;
    
    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    logService.logNavigation(
      this.$store.state.payPatientForm.applicationUuid,
      payPatientRoutes.CLAIM_COUNT_PAGE.path,
      payPatientRoutes.CLAIM_COUNT_PAGE.title
    );
  },
  validations() {
    const validations = {
      claimCount: {
        required,
      }
    };
    return validations;
  },
  computed: {
    isConsentModalOpen() {
      return this.$store.state.payPatientForm.isInfoCollectionNoticeOpen;
    },
  },
  methods: {
    isFirstLoad() {
      return !this.$store.state.payPatientForm.applicationUuid;
    },
    handleCaptchaVerified(captchaToken) {
      this.$store.dispatch(formModule + '/' + SET_CAPTCHA_TOKEN, captchaToken);
    },
    handleCloseConsentModal() {
      this.$store.dispatch(formModule + '/' + SET_IS_INFO_COLLECTION_NOTICE_OPEN, false);
      this.$store.dispatch(appModule + '/' + SET_IS_MODAL_OPEN, false);
    },
    validateFields() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      const claims = [];
      const claimCount = parseInt(this.claimCount);
      const existingClaims = this.$store.state.payPatientForm.medicalServiceClaims ? cloneDeep(this.$store.state.payPatientForm.medicalServiceClaims) : [];

      for (let i=0; i<claimCount; i++) {
        claims.push({
          serviceDate: null,
          serviceDateData: null,
          numberOfServices: null,
          serviceClarificationCode: null,
          feeItem: null,
          amountBilled: null,
          calledStartTime: null,
          renderedFinishTime: null,
          diagnosticCode: null,
          locationOfService: null,
          correspondenceAttached: null,
          submissionCode: null,
          notes: null,
        });
      }
      if (existingClaims && existingClaims.length > 0) {
        const maxClaims = Math.min(claims.length, existingClaims.length);
        for (let i=0; i<maxClaims; i++) {
          Object.assign(claims[i], existingClaims[i]);
        }
      }

      this.$store.dispatch(formModule + '/' + SET_CLAIM_COUNT, this.claimCount);
      this.$store.dispatch(formModule + '/' + SET_MEDICAL_SERVICE_CLAIMS, claims);

      // Navigate to next path.
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPatientRoutes.MAIN_FORM_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
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
        payPatientRoutes.CLAIM_COUNT_PAGE.path
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
