import router from "@/router";
import { commonRoutes } from "@/router/routes";
import * as stepRoutes from "@/router/step-routes";
import pageStateService from "@/services/page-state-service";
//using vi to mock

const mockPageStateService = vi
  .spyOn(pageStateService, "isPageVisited")
  .mockReturnValue(false);

describe.skip("router.beforeEach() specific page not found", () => {
  it("routes specific page not found to destination", () => {
    const to = commonRoutes.SPECIFIC_PAGE_NOT_FOUND_PAGE;
    const from = vi.fn();
    const next = vi.fn();
    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });
});

describe.skip("router.beforeEach() pay patient CSR", () => {
  it("routes pay patient CSR routes to home if they're not home and not visited", () => {
    const testRoutes = stepRoutes.payPatientCSRStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    const compareNewPath = { path: testRoutes[0].path };

    expect(next).toHaveBeenCalledWith(compareNewPath);
  });

  it("routes pay patient CSR routes to home if they ARE home", () => {
    const testRoutes = stepRoutes.payPatientCSRStepRoutes;
    const to = testRoutes[0];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });

  it("routes pay patient CSR routes to their destination if they're visited", () => {
    mockPageStateService.mockReturnValueOnce(true);
    const testRoutes = stepRoutes.payPatientCSRStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });
});

describe.skip("router.beforeEach() pay practitioner CSR", () => {
  it("routes pay practitioner CSR routes to home if they're not home and not visited", () => {
    const testRoutes = stepRoutes.payPractitionerCSRStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    const compareNewPath = { path: testRoutes[0].path };

    expect(next).toHaveBeenCalledWith(compareNewPath);
  });

  it("routes pay practitioner CSR routes to home if they ARE home", () => {
    const testRoutes = stepRoutes.payPractitionerCSRStepRoutes;
    const to = testRoutes[0];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });

  it("routes pay practitioner CSR routes to their destination if they're visited", () => {
    mockPageStateService.mockReturnValueOnce(true);
    const testRoutes = stepRoutes.payPractitionerCSRStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });
});

describe.skip("router.beforeEach() pay patient public", () => {
  it("routes pay patient public routes to home if they're not home and not visited", () => {
    const testRoutes = stepRoutes.payPatientStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    const compareNewPath = { path: testRoutes[0].path };

    expect(next).toHaveBeenCalledWith(compareNewPath);
  });

  it("routes pay patient public routes to home if they ARE home", () => {
    const testRoutes = stepRoutes.payPatientStepRoutes;
    const to = testRoutes[0];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });

  it("routes pay patient public routes to their destination if they're visited", () => {
    mockPageStateService.mockReturnValueOnce(true);
    const testRoutes = stepRoutes.payPatientStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });
});

describe.skip("router.beforeEach() pay practitioner public", () => {
  it("routes pay practitioner public routes to home if they're not home and not visited", () => {
    const testRoutes = stepRoutes.payPractitionerStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    const compareNewPath = { path: testRoutes[0].path };

    expect(next).toHaveBeenCalledWith(compareNewPath);
  });

  it("routes pay practitioner public routes to home if they ARE home", () => {
    const testRoutes = stepRoutes.payPractitionerStepRoutes;
    const to = testRoutes[0];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });

  it("routes pay practitioner public routes to their destination if they're visited", () => {
    mockPageStateService.mockReturnValueOnce(true);
    const testRoutes = stepRoutes.payPractitionerStepRoutes;
    const lastIndex = testRoutes.length - 1;
    const to = testRoutes[lastIndex];
    const from = vi.fn();
    const next = vi.fn();

    // router.beforeHooks.forEach((hook) => {
    //   hook(to, from, next);
    // });

    expect(next).toHaveBeenCalledWith();
  });
});
