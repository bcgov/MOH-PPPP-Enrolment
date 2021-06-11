import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  PAY_PATIENT_BASE_URL,
  PAY_PRACTITIONER_BASE_URL,
  payPatientRoutes,
  payPractitionerRoutes,
  commonRoutes,
} from './routes';
import pageStateService from '@/services/page-state-service';
import LandingPage from '@/views/LandingPage.vue';
import PatientHomePage from '@/views/pay-patient/HomePage.vue';
import PatientClaimCountPage from '@/views/pay-patient/ClaimCountPage.vue';
import PatientMainFormPage from '@/views/pay-patient/MainFormPage.vue';
import PatientReviewPage from '@/views/pay-patient/ReviewPage.vue';
import PatientSubmissionPage from '@/views/pay-patient/SubmissionPage.vue';
import PatientSubmissionErrorPage from '@/views/pay-patient/SubmissionErrorPage.vue';
import PractitionerHomePage from '@/views/pay-practitioner/HomePage.vue';
import PractitionerClaimCountPage from '@/views/pay-practitioner/ClaimCountPage.vue';
import PractitionerMainFormPage from '@/views/pay-practitioner/MainFormPage.vue';
import PractitionerReviewPage from '@/views/pay-practitioner/ReviewPage.vue';
import PractitionerSubmissionPage from '@/views/pay-practitioner/SubmissionPage.vue';
import PractitionerSubmissionErrorPage from '@/views/pay-practitioner/SubmissionErrorPage.vue';
import MaintenancePage from '@/views/MaintenancePage.vue';
import PageNotFoundPage from '@/views/PageNotFoundPage.vue';

Vue.use(VueRouter);

pageStateService.importPageRoutes(commonRoutes);
pageStateService.importPageRoutes(payPatientRoutes);
pageStateService.importPageRoutes(payPractitionerRoutes);

const routeCollection = [
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
    path: commonRoutes.PAGE_NOT_FOUND_PAGE.path,
    name: commonRoutes.PAGE_NOT_FOUND_PAGE.name,
    component: PageNotFoundPage
  },
  
  // Pay Patient Routes.
  {
    path: payPatientRoutes.HOME_PAGE.path,
    name: payPatientRoutes.HOME_PAGE.name,
    component: PatientHomePage
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

  // Pay Practitioner routes.
  {
    path: payPractitionerRoutes.HOME_PAGE.path,
    name: payPractitionerRoutes.HOME_PAGE.name,
    component: PractitionerHomePage
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routeCollection
});

const hasQueryParams = (route) => {
  if (!route || !route.query) {
    return false;
  }
  return Object.keys(route.query).length > 0;
};

const navigate = (to, from, next, nextDestination) => {
  debugger;
  let destination = null;
  if (nextDestination) {
    if (hasQueryParams(to)) {
      destination = Object.assign(nextDestination, { query: to.query });
    } else {
      destination = nextDestination;
    }
  } else if (!hasQueryParams(to) && hasQueryParams(from)) {
    destination = Object.assign({}, to, { query: from.query });
  }
  if (destination) {
    next(destination);
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  // Home redirect.
  if (to.path.includes(PAY_PATIENT_BASE_URL)
    && to.path !== payPatientRoutes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    navigate(to, from, next, { name: payPatientRoutes.HOME_PAGE.name });
  }
  else if (to.path.includes(PAY_PRACTITIONER_BASE_URL)
    && to.path !== payPractitionerRoutes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    navigate(to, from, next, { name: payPractitionerRoutes.HOME_PAGE.name });
  }
  
  // Catch-all (navigation).
  else {
    navigate(to, from, next);
  }
});

export default router;
