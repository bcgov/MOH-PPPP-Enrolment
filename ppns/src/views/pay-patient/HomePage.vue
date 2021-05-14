<template>
  <div>
    <ConsentModal v-if="showConsentModal"
                  @close="handleCloseConsentModal" />
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-5">
        <h1>Pay Patient Claim</h1>
        <hr/>
      </div>
    </PageContent>
    <ContinueBar @continue='nextPage()'/>
  </div>
</template>

<style scoped>
</style>

<script>
import pageStateService from '../../services/page-state-service';
import spaEnvService from '../../services/spa-env-service';
import { payPatientRoutes } from '../../router/routes';
import {
  scrollTo,
  getTopScrollPosition
} from '../../helpers/scroll';
import ContinueBar from '../../components/ContinueBar.vue';
import PageContent from '../../components/PageContent.vue';
import ConsentModal from '../../components/ConsentModal.vue';
import { v4 as uuidv4 } from 'uuid';
import {
  MODULE_NAME as formModule,
  SET_APPLICATION_UUID
} from '../../store/modules/form';
import logService from '../../services/log-service';

export default {
  name: 'HomePage',
  components: {
    ConsentModal,
    ContinueBar,
    PageContent,
  },
  data: () => {
    return {
      showConsentModal: false,
    }
  },
  created() {
    const applicationUuid = uuidv4();
    this.$store.dispatch(formModule + '/' + SET_APPLICATION_UUID, applicationUuid);

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
        logService.logError(applicationUuid, {
          event: 'HTTP error getting values from spa-env-server',
          status: error.response.status,
        });
      });
    logService.logNavigation(
      applicationUuid,
      payPatientRoutes.HOME_PAGE.path,
      payPatientRoutes.HOME_PAGE.title
    );
  },
  methods: {
    handleCloseConsentModal() {
      this.showConsentModal = false;
    },
    nextPage() {
      const path = payPatientRoutes.YOUR_INFO_PAGE.path;
      pageStateService.setPageComplete(path);
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo(0);
    }
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (pageStateService.isPageComplete(to.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: payPatientRoutes.HOME_PAGE.path,
        replace: true
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>
