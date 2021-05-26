<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Medical Services Claims</h1>
        <hr/>

        <NumberSelect label="How many medical service claims for the patient are you including in this submission?"
                id='claim-count'
                v-model='claimCount'
                :min='1'
                :max='4'
                :inputStyle='inputStyle'/>
        <div class="text-danger"
            v-if="$v.claimCount.$dirty && !$v.claimCount.required"
            aria-live="assertive">Claim count is required.</div>      </div>
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
import NumberSelect from '@/components/NumberSelect.vue';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_CLAIM_COUNT,
} from '@/store/modules/pay-patient-form';
import logService from '@/services/log-service';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'EmptyPage',
  components: {
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
    };
  },
  created() {
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
  methods: {
    validateFields() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      this.$store.dispatch(formModule + '/' + SET_CLAIM_COUNT, this.claimCount);

      // Navigate to next path.
      const toPath = payPatientRoutes.MAIN_FORM_PAGE.path;
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
        path: payPatientRoutes.CLAIM_COUNT_PAGE.path,
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
