export const PAY_PATIENT_BASE_URL = '/pay-patient';

export const payPatientRoutes = {
  HOME_PAGE: {
    path: PAY_PATIENT_BASE_URL,
    title: 'Home',
    name: 'HomePage',
  },
  REVIEW_PAGE: {
    path: PAY_PATIENT_BASE_URL + '/review',
    title: 'Review',
    name: 'ReviewPage',
  },
  SUBMISSION_PAGE: {
    path: PAY_PATIENT_BASE_URL + '/submission',
    title: 'Submission',
    name: 'SubmissionPage',
  },
  SUBMISSION_ERROR_PAGE: {
    path: PAY_PATIENT_BASE_URL + '/submission-error',
    title: 'Submission error',
    name: 'SubmissionErrorPage',
  },
  
};
export const commonRoutes = {
  LANDING_PAGE: {
    path: '/',
    title: 'Landing page',
    name: 'LandingPage'
  },
  MAINTENANCE_PAGE: {
    path: 'maintenance',
    title: 'Maintenance',
    name: 'MaintenancePage'
  }
}

export const payPatientRouteStepOrder = [
  payPatientRoutes.HOME_PAGE,
  payPatientRoutes.REVIEW_PAGE,
  payPatientRoutes.SUBMISSION_PAGE
]

export const isPastPath = (toPath, fromPath) => {
  for (let i=0; i<payPatientRouteStepOrder.length; i++) {
    if (payPatientRouteStepOrder[i].path === fromPath) {
      return false;
    } else if (payPatientRouteStepOrder[i].path === toPath) {
      return true;
    }
  }
  return false;
}
