<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">

        <div class="box-border border border-danger rounded">
          <div class="row align-items-center">
            <div class="col-2 pr-0 text-center">
              <div class="status-icon text-danger">
                <IconTimesCircle
                  color="#d93e45"
                  class="times-circle-icon"
                />
              </div>
            </div>
            <div class="col-10 pl-0 py-3">
              <h1>There was a technical issue with your submission</h1>
              <p>Your claim was not submitted. Please try again.</p> 
            </div>
          </div>
        </div>

      </div>
    </PageContent>
  </div>
</template>

<script>
import PageContent from '../../components/PageContent.vue';
import pageStateService from '../../services/page-state-service';
import {
  payPatientRoutes,
  payPatientCSRRoutes
} from '../../router/routes';
import {
  MODULE_NAME as formModule,
  RESET_FORM
} from '../../store/modules/pay-patient-form';
import { scrollTo } from '../../helpers/scroll';
import { getConvertedPath } from '@/helpers/url';
import logService from '../../services/log-service';
import { IconTimesCircle } from 'common-lib-vue';

export default {
  name: 'SubmissionErrorPage',
  components: {
    IconTimesCircle,
    PageContent,
  },
  created() {
    logService.logNavigation(
      this.$store.state.payPatientForm.applicationUuid,
      payPatientRoutes.SUBMISSION_ERROR_PAGE.path,
      payPatientRoutes.SUBMISSION_ERROR_PAGE.title
    );
  },
  computed: {
    referenceNumber() {
      return this.$store.state.payPatientForm.referenceNumber;
    }
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
.box-border {
  border-width: 4px !important;
}
.status-icon {
  font-size: 32px;
}
.times-circle-icon {
  width: 32px;
  height: 32px;
}
</style>
