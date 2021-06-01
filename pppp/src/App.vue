<template>
  <div id="app">
    <Header :title='pageTitle'
            imagePath='/pppp/images/' />
    <main>
      <div class="container stepper">
        <ProgressBar :currentPath='$router.currentRoute.path'
                    :routes='stepRoutes'/>
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
  Footer
} from 'common-lib-vue';
import ProgressBar from '@/components/ProgressBar.vue';
import {
  payPatientStepRoutes,
  payPractitionerStepRoutes,
} from '@/router/step-routes';
import {
  PAY_PATIENT_BASE_URL,
  PAY_PRACTITIONER_BASE_URL,
} from '@/router/routes';

export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer,
    ProgressBar: ProgressBar
  },
  data: () => {
    return {
      pageTitle: 'MSP Permanent Move Outside of B.C.',
      version: project.version,
    };
  },
  created() {
    document.title = this.pageTitle;
  },
  computed: {
    stepRoutes() {
      if (this.$router.currentRoute.path.includes(PAY_PATIENT_BASE_URL)) {
        return payPatientStepRoutes;
      } else if (this.$router.currentRoute.path.includes(PAY_PRACTITIONER_BASE_URL)) {
        return payPractitionerStepRoutes;
      }
      return [];
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