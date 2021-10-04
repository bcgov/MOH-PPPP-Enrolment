import pageStateService from "@/services/page-state-service";
import { payPatientRoutes } from "@/router/routes";
import { cloneDeep } from "lodash";

const payPatientStepRoutes = [
  { ...payPatientRoutes.CLAIM_COUNT_PAGE },
  { ...payPatientRoutes.MAIN_FORM_PAGE },
  { ...payPatientRoutes.REVIEW_PAGE },
];

//only use for passing. for assertions, use pages[] path
const testPath = payPatientStepRoutes[0].path;

describe("pageStateService test", () => {
  beforeEach(() => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("imports a defined service", () => {
    expect(pageStateService).toBeDefined();
  });
});

describe("pageStateService importPageRoutes()", () => {
  beforeEach(() => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets PageStateService pages array to routes", () => {
    expect(pageStateService.pages).not.toEqual([]);
  });

  it("sets isVisited to false for all routes", () => {
    expect(pageStateService.pages[0].isVisited).toEqual(false);
  });
});

describe("setPageIncomplete()", () => {
  beforeEach(() => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets to incomplete", () => {
    expect(pageStateService.pages[0].isComplete).toBeUndefined();
    pageStateService.setPageIncomplete(testPath);
    expect(pageStateService.pages[0].isComplete).toEqual(false);
  });
});

describe("setPageComplete()", () => {
  beforeEach(() => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets to complete", () => {
    expect(pageStateService.pages[0].isComplete).toBeUndefined();
    pageStateService.setPageComplete(testPath);
    expect(pageStateService.pages[0].isComplete).toEqual(true);
  });
});

describe("isPageComplete()", () => {
  beforeEach(() => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns true if isComplete equals true", () => {
    pageStateService.pages[0].isComplete = true;
    const result = pageStateService.isPageComplete(testPath);
    expect(result).toEqual(true);
  });

  it("returns false if isComplete equals false", () => {
    pageStateService.pages[0].isComplete = false;
    const result = pageStateService.isPageComplete(testPath);
    expect(result).toEqual(false);
  });
});

describe("visitPage()", () => {
  beforeEach(() => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("sets isVisited to true for path passed", () => {
    expect(pageStateService.pages[0].isVisited).toEqual(false);
    pageStateService.visitPage(testPath);
    expect(pageStateService.pages[0].isVisited).toEqual(true);
  });

  it("doesn't break if path not found", () => {
    expect(pageStateService.pages[0].isVisited).toEqual(false);
    pageStateService.visitPage("potato");
    expect(pageStateService.pages[0].isVisited).toEqual(false);
  });
});

describe("isPageVisited()", () => {
  beforeEach(() => {
    pageStateService.pages = [];
    pageStateService.importPageRoutes(cloneDeep(payPatientStepRoutes));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false when isVisited is false", () => {
    const result = pageStateService.isPageVisited(testPath);
    expect(result).toEqual(false);
  });

  it("returns true when isVisited is true", () => {
    pageStateService.pages[0].isVisited = true;
    const result = pageStateService.isPageVisited(testPath);
    expect(result).toEqual(true);
  });

  it("returns undefined when passed a path that doesn't exist", () => {
    const result = pageStateService.isPageVisited("potato");
    expect(result).toBeUndefined();
  });
});
