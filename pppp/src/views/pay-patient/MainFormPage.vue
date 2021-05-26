<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Medical Services Claims</h1>
        <hr/>
      </div>
    </PageContent>
    <ContinueBar @continue="validateFields()" />
  </div>
</template>

<script>
import pageStateService from '../../services/page-state-service';
import {
  payPatientRoutes,
  isPastPath,
} from '../../router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition
} from '../../helpers/scroll';
import ContinueBar from '../../components/ContinueBar.vue';
import PageContent from '../../components/PageContent.vue';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
} from '../../store/modules/pay-patient-form';
import logService from '../../services/log-service';

export default {
  name: 'EmptyPage',
  components: {
    ContinueBar,
    PageContent,
  },
  data: () => {
    return {
      isPageLoaded: false,
    };
  },
  created() {
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
    const validations = {};
    return validations;
  },
  methods: {
    validateFields() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      // Save values here.
      
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
