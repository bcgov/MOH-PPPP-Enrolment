import { createRouter, createWebHistory } from 'vue-router';
import {
  PAY_PATIENT_BASE_URL,
  PAY_PATIENT_CSR_BASE_URL,
  PAY_PRACTITIONER_BASE_URL,
  PAY_PRACTITIONER_CSR_BASE_URL,
  payPatientRoutes,
  payPatientCSRRoutes,
  payPractitionerRoutes,
  payPractitionerCSRRoutes,
  commonRoutes,
} from './routes';
import pageStateService from '@/services/page-state-service';
import LandingPage from '@/views/LandingPage.vue';
import PatientClaimCountPage from '@/views/pay-patient/ClaimCountPage.vue';
import PatientMainFormPage from '@/views/pay-patient/MainFormPage.vue';
import PatientReviewPage from '@/views/pay-patient/ReviewPage.vue';
import PatientSubmissionPage from '@/views/pay-patient/SubmissionPage.vue';
import PatientSubmissionErrorPage from '@/views/pay-patient/SubmissionErrorPage.vue';
import PractitionerClaimCountPage from '@/views/pay-practitioner/ClaimCountPage.vue';
import PractitionerMainFormPage from '@/views/pay-practitioner/MainFormPage.vue';
import PractitionerReviewPage from '@/views/pay-practitioner/ReviewPage.vue';
import PractitionerSubmissionPage from '@/views/pay-practitioner/SubmissionPage.vue';
import PractitionerSubmissionErrorPage from '@/views/pay-practitioner/SubmissionErrorPage.vue';
import MaintenancePage from '@/views/MaintenancePage.vue';
import PageNotFoundPage from '@/views/PageNotFoundPage.vue';

pageStateService.importPageRoutes(commonRoutes);
pageStateService.importPageRoutes(payPatientRoutes);
pageStateService.importPageRoutes(payPatientCSRRoutes);
pageStateService.importPageRoutes(payPractitionerRoutes);
pageStateService.importPageRoutes(payPractitionerCSRRoutes);

export const routeCollection = [
  {
    path: commonRoutes.LANDING_PAGE.path,
    name: commonRoutes.LANDING_PAGE.name,
    component: LandingPage
  },
  {
    path: commonRoutes.MAINTENANCE_PAGE.path,
    name: commonRoutes.MAINTENANCE_PAGE.name,
    component: MaintenancePage
  },
  {
    path: commonRoutes.SPECIFIC_PAGE_NOT_FOUND_PAGE.path,
    name: commonRoutes.SPECIFIC_PAGE_NOT_FOUND_PAGE.name,
    component: PageNotFoundPage
  },
  {
    path: commonRoutes.PAGE_NOT_FOUND_PAGE.path,
    name: commonRoutes.PAGE_NOT_FOUND_PAGE.name,
    component: PageNotFoundPage
  },
  {
    path: payPatientRoutes.CLAIM_COUNT_PAGE.path,
    name: payPatientRoutes.CLAIM_COUNT_PAGE.name,
    component: PatientClaimCountPage
  },
  {
    path: payPatientRoutes.MAIN_FORM_PAGE.path,
    name: payPatientRoutes.MAIN_FORM_PAGE.name,
    component: PatientMainFormPage
  },
  {
    path: payPatientRoutes.REVIEW_PAGE.path,
    name: payPatientRoutes.REVIEW_PAGE.name,
    component: PatientReviewPage
  },
  {
    path: payPatientRoutes.SUBMISSION_PAGE.path,
    name: payPatientRoutes.SUBMISSION_PAGE.name,
    component: PatientSubmissionPage
  },
  {
    path: payPatientRoutes.SUBMISSION_ERROR_PAGE.path,
    name: payPatientRoutes.SUBMISSION_ERROR_PAGE.name,
    component: PatientSubmissionErrorPage
  },
  {
    path: payPatientCSRRoutes.CLAIM_COUNT_PAGE.path,
    name: payPatientCSRRoutes.CLAIM_COUNT_PAGE.name,
    component: PatientClaimCountPage
  },
  {
    path: payPatientCSRRoutes.MAIN_FORM_PAGE.path,
    name: payPatientCSRRoutes.MAIN_FORM_PAGE.name,
    component: PatientMainFormPage
  },
  {
    path: payPatientCSRRoutes.REVIEW_PAGE.path,
    name: payPatientCSRRoutes.REVIEW_PAGE.name,
    component: PatientReviewPage
  },
  {
    path: payPatientCSRRoutes.SUBMISSION_PAGE.path,
    name: payPatientCSRRoutes.SUBMISSION_PAGE.name,
    component: PatientSubmissionPage
  },
  {
    path: payPatientCSRRoutes.SUBMISSION_ERROR_PAGE.path,
    name: payPatientCSRRoutes.SUBMISSION_ERROR_PAGE.name,
    component: PatientSubmissionErrorPage
  },
  {
    path: payPractitionerRoutes.CLAIM_COUNT_PAGE.path,
    name: payPractitionerRoutes.CLAIM_COUNT_PAGE.name,
    component: PractitionerClaimCountPage
  },
  {
    path: payPractitionerRoutes.MAIN_FORM_PAGE.path,
    name: payPractitionerRoutes.MAIN_FORM_PAGE.name,
    component: PractitionerMainFormPage
  },
  {
    path: payPractitionerRoutes.REVIEW_PAGE.path,
    name: payPractitionerRoutes.REVIEW_PAGE.name,
    component: PractitionerReviewPage
  },
  {
    path: payPractitionerRoutes.SUBMISSION_PAGE.path,
    name: payPractitionerRoutes.SUBMISSION_PAGE.name,
    component: PractitionerSubmissionPage
  },
  {
    path: payPractitionerRoutes.SUBMISSION_ERROR_PAGE.path,
    name: payPractitionerRoutes.SUBMISSION_ERROR_PAGE.name,
    component: PractitionerSubmissionErrorPage
  },
  {
    path: payPractitionerCSRRoutes.CLAIM_COUNT_PAGE.path,
    name: payPractitionerCSRRoutes.CLAIM_COUNT_PAGE.name,
    component: PractitionerClaimCountPage
  },
  {
    path: payPractitionerCSRRoutes.MAIN_FORM_PAGE.path,
    name: payPractitionerCSRRoutes.MAIN_FORM_PAGE.name,
    component: PractitionerMainFormPage
  },
  {
    path: payPractitionerCSRRoutes.REVIEW_PAGE.path,
    name: payPractitionerCSRRoutes.REVIEW_PAGE.name,
    component: PractitionerReviewPage
  },
  {
    path: payPractitionerCSRRoutes.SUBMISSION_PAGE.path,
    name: payPractitionerCSRRoutes.SUBMISSION_PAGE.name,
    component: PractitionerSubmissionPage
  },
  {
    path: payPractitionerCSRRoutes.SUBMISSION_ERROR_PAGE.path,
    name: payPractitionerCSRRoutes.SUBMISSION_ERROR_PAGE.name,
    component: PractitionerSubmissionErrorPage
  },

  // Catch all unknown pages.
  {
    path: commonRoutes.PAGE_NOT_FOUND_PAGE.path,
    name: commonRoutes.PAGE_NOT_FOUND_PAGE.name,
    component: PageNotFoundPage
  },
];

const router = createRouter({
  history: createWebHistory("pppp"),
  routes: routeCollection
});

router.beforeEach((to, from, next) => {
  //if it's supposed to redirect to page not found, don't stop it
  if (to.path.includes(commonRoutes.SPECIFIC_PAGE_NOT_FOUND_PAGE.path)) {
    return next();
  } 
  // Home redirects.
  if (to.path.includes(PAY_PATIENT_CSR_BASE_URL)
    && to.path !== payPatientCSRRoutes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    next({ path: payPatientCSRRoutes.HOME_PAGE.path });
  }
  else if (to.path.includes(PAY_PRACTITIONER_CSR_BASE_URL)
    && to.path !== payPractitionerCSRRoutes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    next({ path: payPractitionerCSRRoutes.HOME_PAGE.path });
  }
  else if (to.path.includes(PAY_PATIENT_BASE_URL + '/')
    && to.path !== payPatientRoutes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    next({ path: payPatientRoutes.HOME_PAGE.path });
  }
  else if (to.path.includes(PAY_PRACTITIONER_BASE_URL + '/')
    && to.path !== payPractitionerRoutes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    next({ path: payPractitionerRoutes.HOME_PAGE.path });
  }
  // Catch-all (navigation).
  else {
    next();
  }
});

export default router;
