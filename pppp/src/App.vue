<template>
  <div :aria-hidden="[isModalOpen]">
    <Header :title='pageTitle'
            imagePath='/pppp/images/' />
    <main>
      <div class="container stepper">
        <PageStepper :currentPath='$router.currentRoute.path'
                    :routes='stepRoutes'
                    @toggleShowMobileDetails='handleToggleShowMobileStepperDetails($event)'
                    :isMobileStepperOpen='isMobileStepperOpen'
                    @onClickLink='handleClickStepperLink($event)'/>
      </div>
      <router-view/>
    </main>
    <Footer :version='version' />
  </div>
</template>

<script>
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import 'common-lib-vue/dist/common-lib-vue.css';
import './styles/styles.css';

import project from '../package.json';
import {
  Header,
  Footer,
  PageStepper,
} from 'common-lib-vue';
import {
  payPatientStepRoutes,
  payPractitionerStepRoutes,
  payPatientCSRStepRoutes,
  payPractitionerCSRStepRoutes,
} from '@/router/step-routes';
import {
  PAY_PATIENT_BASE_URL,
  PAY_PRACTITIONER_BASE_URL,
} from '@/router/routes';
import { isCSR } from '@/helpers/url';
import {
  MODULE_NAME as appModule,
  SET_SHOW_MOBILE_STEPPER_DETAILS,
} from '@/store/modules/app';
import pageStateService from '@/services/page-state-service';
import { scrollTo } from '@/helpers/scroll';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    PageStepper,
  },
  data: () => {
    return {
      version: project.version,
    };
  },
  created() {
    document.title = this.pageTitle;
  },
  computed: {
    stepRoutes() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath.includes(PAY_PATIENT_BASE_URL)) {
        return isCSR(currentPath) ? payPatientCSRStepRoutes : payPatientStepRoutes;
      } else if (currentPath.includes(PAY_PRACTITIONER_BASE_URL)) {
        return isCSR(currentPath) ? payPractitionerCSRStepRoutes : payPractitionerStepRoutes;
      }
      return [];
    },
    pageTitle() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath.includes(PAY_PATIENT_BASE_URL)) {
        return isCSR(currentPath) ? 'Pay Patient Claim - CSR' : 'Pay Patient Claim';
      } else if (currentPath.includes(PAY_PRACTITIONER_BASE_URL)) {
        return isCSR(currentPath) ? 'Pay Practitioner Claim - CSR' : 'Pay Practitioner Claim';
      }
      return '';
    },
    isMobileStepperOpen() {
      return this.$store.state.app.showMobileStepperDetails;
    },
    isModalOpen() {
      return this.$store.state.app.isModalOpen;
    },
  },
  methods: {
    handleToggleShowMobileStepperDetails(isDetailsShown) {
      this.$store.dispatch(appModule + '/' + SET_SHOW_MOBILE_STEPPER_DETAILS, isDetailsShown);
    },
    handleClickStepperLink(path) {
      pageStateService.setPageIncomplete(this.$router.currentRoute.path);
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    }
  }
}
</script>

<style scoped>
main {
  padding: 0;
}
@media only screen and (max-width: 575px) {
  .container.stepper {
    padding: 0;
  }
}
</style>
