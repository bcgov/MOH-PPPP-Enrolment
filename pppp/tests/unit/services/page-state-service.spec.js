import pageStateService from "@/services/page-state-service";
import { payPatientRoutes } from "@/router/routes";
import { cloneDeep } from "lodash";

const payPatientStepRoutes = [
  { ...payPatientRoutes.CLAIM_COUNT_PAGE },
  { ...payPatientRoutes.MAIN_FORM_PAGE },
  { ...payPatientRoutes.REVIEW_PAGE },
];

//only use for passing. for assertions, use pages[] path
const testRoute = payPatientStepRoutes[0];
const testPath = payPatientStepRoutes[0].path;

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
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
    expect(pageStateService.pages).not.toEqual([]);
  });
});

describe("setPageIncomplete()", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets to incomplete", () => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
    expect(pageStateService.pages[0].isComplete).toBeUndefined();
    pageStateService.setPageIncomplete(testPath);
    expect(pageStateService.pages[0].isComplete).toEqual(false);
  });
});

describe("setPageComplete()", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets to complete", () => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
    expect(pageStateService.pages[0].isComplete).toBeUndefined();
    pageStateService.setPageComplete(testPath);
    expect(pageStateService.pages[0].isComplete).toEqual(true);
  });
});

describe("isPageComplete()", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns true if isComplete equals true", () => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
    pageStateService.pages[0].isComplete = true;
    const result = pageStateService.isPageComplete(testPath);
    expect(result).toEqual(true);
  });

  it("returns false if isComplete equals true", () => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
    pageStateService.pages[0].isComplete = false;
    const result = pageStateService.isPageComplete(testPath);
    expect(result).toEqual(false);
  });
});
