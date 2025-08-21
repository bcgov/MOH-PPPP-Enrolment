<template>
  <div>
    <div :aria-hidden="[isConsentModalOpen]">
      <HeaderComponent
        :key="$route.fullPath"
        :title="pageTitle()"
        image-path="/pppp/images/"
      />
      <div class="container stepper">
        <PageStepper
          :current-path="$router.currentRoute.value.path"
          :routes="stepRoutes"
          :is-mobile-stepper-open="isMobileStepperOpen"
          @toggle-show-mobile-details="handleToggleShowMobileStepperDetails($event)"
          @on-click-link="handleClickStepperLink($event)"
        />
      </div>
      <main>
        <router-view />
      </main>
      <FooterComponent :version="version" />
    </div>
    <ConsentModal
      v-if="isConsentModalOpen()"
      :key="$route.fullPath"
      :application-uuid="applicationUuid"
      @close="handleCloseConsentModal"
      @captcha-verified="handleCaptchaVerified"
    />
  </div>
</template>

<script>
import "@bcgov/bootstrap-v5-theme/css/bootstrap-theme.min.css";
import "common-lib-vue/dist/common-lib-vue.css";
import "./styles/styles.css";

import { v4 as uuidv4 } from "uuid";
import project from "../package.json";
import { HeaderComponent, FooterComponent, PageStepper } from "common-lib-vue";
import {
  payPatientStepRoutes,
  payPractitionerStepRoutes,
  payPatientCSRStepRoutes,
  payPractitionerCSRStepRoutes,
} from "@/router/step-routes";
import { PAY_PATIENT_BASE_URL, PAY_PRACTITIONER_BASE_URL } from "@/router/routes";
import { isCSR } from "@/helpers/url";
import { MODULE_NAME as appModule, SET_SHOW_MOBILE_STEPPER_DETAILS } from "@/store/modules/app";
import {
  MODULE_NAME as payPatientModule,
  SET_APPLICATION_UUID,
  SET_CAPTCHA_TOKEN,
  SET_IS_INFO_COLLECTION_NOTICE_OPEN,
} from "@/store/modules/pay-patient-form";
import { MODULE_NAME as payPractitionerModule } from "@/store/modules/pay-practitioner-form";
import pageStateService from "@/services/page-state-service";
import { scrollTo } from "@/helpers/scroll";
import ConsentModal from "@/components/ConsentModal.vue";

export default {
  name: "App",
  components: {
    ConsentModal,
    FooterComponent: FooterComponent,
    HeaderComponent: HeaderComponent,
    PageStepper,
  },
  data: () => {
    return {
      version: project.version,
      applicationUuid: null,
    };
  },
  computed: {
    stepRoutes() {
      const currentPath = this.$router.currentRoute.value.path;
      if (currentPath.includes(PAY_PATIENT_BASE_URL)) {
        return isCSR(currentPath) ? payPatientCSRStepRoutes : payPatientStepRoutes;
      } else if (currentPath.includes(PAY_PRACTITIONER_BASE_URL)) {
        return isCSR(currentPath) ? payPractitionerCSRStepRoutes : payPractitionerStepRoutes;
      }
      return [];
    },
    isMobileStepperOpen() {
      return this.$store.state.app.showMobileStepperDetails;
    },
  },
  created() {
    document.title = this.pageTitle();

    this.applicationUuid = uuidv4();
    this.$store.dispatch(payPatientModule + "/" + SET_APPLICATION_UUID, this.applicationUuid);
    this.$store.dispatch(payPractitionerModule + "/" + SET_APPLICATION_UUID, this.applicationUuid);
  },
  methods: {
    pageTitle() {
      const currentPath = this.$router.currentRoute.value.path;
      if (currentPath.includes(PAY_PATIENT_BASE_URL)) {
        return isCSR(currentPath) ? "Pay Patient Claim - CSR" : "Pay Patient Claim";
      } else if (currentPath.includes(PAY_PRACTITIONER_BASE_URL)) {
        return isCSR(currentPath) ? "Pay Practitioner Claim - CSR" : "Pay Practitioner Claim";
      }
      return "";
    },
    isConsentModalOpen() {
      const currentPath = this.$router.currentRoute.value.path;
      if (currentPath.includes(PAY_PATIENT_BASE_URL)) {
        return this.$store.state.payPatientForm.isInfoCollectionNoticeOpen;
      } else if (currentPath.includes(PAY_PRACTITIONER_BASE_URL)) {
        return this.$store.state.payPractitionerForm.isInfoCollectionNoticeOpen;
      }
      return false;
    },
    handleToggleShowMobileStepperDetails(isDetailsShown) {
      this.$store.dispatch(appModule + "/" + SET_SHOW_MOBILE_STEPPER_DETAILS, isDetailsShown);
    },
    handleClickStepperLink(path) {
      pageStateService.setPageIncomplete(this.$router.currentRoute.value.path);
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    },
    handleCaptchaVerified(captchaToken) {
      this.$store.dispatch(payPatientModule + "/" + SET_CAPTCHA_TOKEN, captchaToken);
      this.$store.dispatch(payPractitionerModule + "/" + SET_CAPTCHA_TOKEN, captchaToken);
    },
    handleCloseConsentModal() {
      this.$store.dispatch(payPatientModule + "/" + SET_IS_INFO_COLLECTION_NOTICE_OPEN, false);
      this.$store.dispatch(payPractitionerModule + "/" + SET_IS_INFO_COLLECTION_NOTICE_OPEN, false);
    },
  },
};
</script>

<style scoped>
main {
  padding: 0;
  overflow: initial; /*needed for continue button to stick to the bottom of the page */
}
@media only screen and (max-width: 575px) {
  .container.stepper {
    padding: 0;
  }
}
</style>
