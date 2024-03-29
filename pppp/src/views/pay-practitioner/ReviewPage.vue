<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Review request</h1>
        <p>Review your request before submission</p>
        <hr/>
        <CorrespondenceAttachedMessage v-if="!isFormAbleToSubmit" />
        <ReviewTableList :showEditButtons='true' 
                        tableBackgroundColor='#EEE'/>
        <CorrespondenceAttachedMessage v-if="!isFormAbleToSubmit" />
        <div v-if="isSystemUnavailable"
            class="text-danger mt-3 mb-5"
            aria-live="assertive">Unable to continue, system unavailable. Please try again later.</div>
      </div>
    </PageContent>
    <ContinueBar @continue='continueHandler()'
                :hasLoader='isLoading'
                :buttonLabel='continueButtonLabel'/>
  </div>
</template>

<script>
import PageContent from '@/components/PageContent.vue';
import ContinueBar from '@/components/ContinueBar.vue';
import CorrespondenceAttachedMessage from '@/components/CorrespondenceAttachedMessage.vue';
import ReviewTableList from '@/components/pay-practitioner/ReviewTableList.vue';
import pageStateService from '@/services/page-state-service';
import {
  payPractitionerRoutes,
  isPastPath
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
import { isCorrespondenceAttachedAbleToSubmit } from '@/helpers/form-helpers';
import {
  MODULE_NAME as formModule,
  SET_REFERENCE_NUMBER,
  SET_SUBMISSION_DATE,
} from '@/store/modules/pay-practitioner-form';
import apiService from '@/services/api-service';
import logService from '@/services/log-service';

export default {
  name: 'ReviewPage',
  components: {
    CorrespondenceAttachedMessage,
    PageContent,
    ContinueBar,
    ReviewTableList,
  },
  data: () => {
    return {
      isLoading: false,
      isSystemUnavailable: false,
    }
  },
  created() {
    logService.logNavigation(
      this.$store.state.payPractitionerForm.applicationUuid,
      payPractitionerRoutes.REVIEW_PAGE.path,
      payPractitionerRoutes.REVIEW_PAGE.title
    );
  },
  methods: {
    continueHandler() {
      if (this.isFormAbleToSubmit) {
        this.submitForm();
      } else {
        window.print();
      }
    },
    submitForm() {
      this.isLoading = true;
      this.isSystemUnavailable = false;

      this.$store.dispatch(formModule + '/' + SET_SUBMISSION_DATE, new Date());

      const token = this.$store.state.payPractitionerForm.captchaToken;
      const applicationUuid = this.$store.state.payPractitionerForm.applicationUuid;
      const formState = this.$store.state.payPractitionerForm;

      apiService.submitPayPractitionerApplication(token, formState)
        .then((response) => {
          // Handle HTTP success.
          const returnCode = response.data.returnCode;
          const planReferenceNumber = response.data.planReferenceNumber;

          this.isLoading = false;

          if (planReferenceNumber) {
            this.$store.dispatch(formModule + '/' + SET_REFERENCE_NUMBER, planReferenceNumber);
          }

          switch (returnCode) {
            case '0': // Submission successful.
              logService.logSubmission(applicationUuid, {
                event: 'submission success',
                response: response.data,
              }, planReferenceNumber);
              this.navigateToSubmissionPage();
              break;
            case '3': // System unavailable.
              this.isSystemUnavailable = true;
              logService.logError(applicationUuid, {
                event: 'submission failure',
                response: response.data,
              });
              scrollToError();
              break;
            default: // Catch-all for all other errors (non-zero).
              logService.logError(applicationUuid, {
                event: 'submission failure',
                response: response.data,
              });
              if (planReferenceNumber) {
                this.navigateToSubmissionPage();
              } else {
                this.navigateToSubmissionErrorPage();
              }              
              break;
          }
        })
        .catch((error) => {
          // Handle HTTP error.
          const httpStatusCode = error && error.response ? error.response.status : null;
          this.isLoading = false;
          this.isSystemUnavailable = true;
          logService.logError(applicationUuid, {
            event: 'HTTP error while sending application',
            status: httpStatusCode
          });
          scrollToError();
        });
      
      // Manually navigate to submission success page when middleware/RAPID is down.
      // this.navigateToSubmissionPage();
    },
    navigateToSubmissionPage() {
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPractitionerRoutes.SUBMISSION_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo();
    },
    navigateToSubmissionErrorPage() {
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPractitionerRoutes.SUBMISSION_ERROR_PAGE.path
      );
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo();
    }
  },
  computed: {
    isCSR() {
      return isCSR(this.$router.currentRoute.path);
    },
    isFormAbleToSubmit() {
      const correspondenceAttached = [
        ...this.$store.state.payPractitionerForm.medicalServiceClaims.map(x => x.correspondenceAttached),
        ...this.$store.state.payPractitionerForm.hospitalVisitClaims.map(x => x.correspondenceAttached)
      ];
      return this.isCSR
          || correspondenceAttached.every(isCorrespondenceAttachedAbleToSubmit);
    },
    continueButtonLabel() {
      if (this.isFormAbleToSubmit) {
        return 'Submit';
      }
      return 'Print';
    },
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      const toPath = getConvertedPath(
        this.$router.currentRoute.path,
        payPractitionerRoutes.REVIEW_PAGE.path
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
