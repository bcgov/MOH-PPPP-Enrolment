import pageStateService from "@/services/page-state-service";
import { payPatientRoutes } from "@/router/routes";

const payPatientStepRoutes = [
  { ...payPatientRoutes.CLAIM_COUNT_PAGE },
  { ...payPatientRoutes.MAIN_FORM_PAGE },
  { ...payPatientRoutes.REVIEW_PAGE },
];

const testRoute = payPatientStepRoutes[0];

describe("pageStateService test", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("imports a defined service", () => {
    expect(pageStateService).toBeDefined();
  });
});

describe("pageStateService importPageRoutes()", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets pages array in service to routes", () => {
    expect(pageStateService.pages).toEqual([]);
    pageStateService.importPageRoutes(payPatientStepRoutes);
    expect(pageStateService.pages).toEqual(payPatientStepRoutes);
  });
});

describe("setPageIncomplete(path)", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets to incomplete", () => {
    expect(pageStateService.pages[0].isComplete).toEqual(true);
    pageStateService.importPageRoutes(payPatientStepRoutes);
    pageStateService.setPageIncomplete(testRoute);
    expect(pageStateService.pages[0].isComplete).toEqual(false);
  });
});

payPatientStepRoutes[0];
