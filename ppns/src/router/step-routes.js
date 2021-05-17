import { payPatientRoutes, payPractitionerRoutes } from './routes';

export const payPatientStepRoutes = [
  {...payPatientRoutes.CLAIM_COUNT_PAGE},
  {...payPatientRoutes.MAIN_FORM_PAGE},
  {...payPatientRoutes.REVIEW_PAGE},
];

export const payPractitionerStepRoutes = [
  {...payPractitionerRoutes.CLAIM_COUNT_PAGE},
  {...payPractitionerRoutes.MAIN_FORM_PAGE},
  {...payPractitionerRoutes.REVIEW_PAGE},
];
