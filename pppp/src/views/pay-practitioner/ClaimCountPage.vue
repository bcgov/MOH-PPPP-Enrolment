<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Pay Practitioner Claim</h1>
        <hr/>

        <h2>Medical Services Claims</h2>
        <NumberSelect label="How many medical service claims for the practitioner are you including in this submission?"
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
import pageStateService from '../../services/page-state-service';
import {
  payPractitionerRoutes,
  isPastPath,
} from '../../router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition
} from '../../helpers/scroll';
import ContinueBar from '../../components/ContinueBar.vue';
import PageContent from '../../components/PageContent.vue';
import NumberSelect from '@/components/NumberSelect.vue';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
} from '../../store/modules/pay-practitioner-form';
import logService from '../../services/log-service';
import { required } from 'vuelidate/lib/validators';
import { SET_CLAIM_COUNT } from '../../store/modules/pay-practitioner-form';

export default {
  name: 'EmptyPage',
  components: {
    ContinueBar,
    PageContent,
    NumberSelect
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
    this.claimCount = this.$store.state.payPractitionerForm.claimCount;

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    logService.logNavigation(
      this.$store.state.payPractitionerForm.applicationUuid,
      payPractitionerRoutes.CLAIM_COUNT_PAGE.path,
      payPractitionerRoutes.CLAIM_COUNT_PAGE.title
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
      const toPath = payPractitionerRoutes.MAIN_FORM_PAGE.path;
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
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
      next({
        path: payPractitionerRoutes.CLAIM_COUNT_PAGE.path,
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
