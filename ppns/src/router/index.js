import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  PAY_PATIENT_BASE_URL,
  payPatientRoutes,
  commonRoutes,
} from './routes';
import pageStateService from '../services/page-state-service';
import LandingPage from '../views/LandingPage.vue';
import HomePage from '../views/pay-patient/HomePage.vue';
import ReviewPage from '../views/pay-patient/ReviewPage.vue';
import SubmissionPage from '../views/pay-patient/SubmissionPage.vue';
import SubmissionErrorPage from '../views/pay-patient/SubmissionErrorPage.vue';
import MaintenancePage from '../views/MaintenancePage.vue';

Vue.use(VueRouter);
pageStateService.importPageRoutes(commonRoutes);
pageStateService.importPageRoutes(payPatientRoutes);

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
  
  // Pay Patient Routes.
  {
    path: payPatientRoutes.HOME_PAGE.path,
    name: payPatientRoutes.HOME_PAGE.name,
    component: HomePage
  },
  {
    path: payPatientRoutes.REVIEW_PAGE.path,
    name: payPatientRoutes.REVIEW_PAGE.name,
    component: ReviewPage
  },
  {
    path: payPatientRoutes.SUBMISSION_PAGE.path,
    name: payPatientRoutes.SUBMISSION_PAGE.name,
    component: SubmissionPage
  },
  {
    path: payPatientRoutes.SUBMISSION_ERROR_PAGE.path,
    name: payPatientRoutes.SUBMISSION_ERROR_PAGE.name,
    component: SubmissionErrorPage
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routeCollection
});

router.beforeEach((to, from, next) => {
  // Home redirect.
  if (to.path.includes(PAY_PATIENT_BASE_URL)
    && to.path !== payPatientRoutes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    next({ name: payPatientRoutes.HOME_PAGE.name });
  }
  
  // Catch-all (navigation).
  else {
    next();
  }
});

export default router;
