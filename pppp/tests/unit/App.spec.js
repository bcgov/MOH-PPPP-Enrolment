import { shallowMount } from "@vue/test-utils";
import Page from "@/App.vue";
import store from "@/store/index";
import {
  payPatientStepRoutes,
  payPractitionerStepRoutes,
  payPatientCSRStepRoutes,
  payPractitionerCSRStepRoutes,
} from "@/router/step-routes";
import {
  mockRouter,
} from "./test-helper.js";

const mockRoute = {
  params: {
    id: 1
  }
}

const payPatientTemplate = shallowMount(Page, {
  global: {
    stubs: ["router-link", "router-view"],
    plugins: [store],
    mocks: {
      $route: mockRoute,
      $router: {
        ...mockRouter,
        currentRoute: {
          value: {
            path: "/pay-patient",
          },
        },
      },
    }
  },
});
const payPatientCSRTemplate = shallowMount(Page, {
  global: {
    stubs: ["router-link", "router-view"],
    plugins: [store],
    mocks: {
      $route: mockRoute,
      $router: {
        ...mockRouter,
        currentRoute: {
          value: {
            path: "/pay-patient-csr",
          },
        },
      },
    }
  },
});
const payPractitionerTemplate = shallowMount(Page, {
  global: {
    stubs: ["router-link", "router-view"],
    plugins: [store],
    mocks: {
      $route: mockRoute,
      $router: {
        ...mockRouter,
        currentRoute: {
          value: {
            path: "/pay-practitioner",
          },
        },
      },
    }
  },
});
const payPractitionerCSRTemplate = shallowMount(Page, {
  global: {
    stubs: ["router-link", "router-view"],
    plugins: [store],
    mocks: {
      $route: mockRoute,
      $router: {
        ...mockRouter,
        currentRoute: {
          value: {
            path: "/pay-practitioner-csr",
          },
        },
      },
    }
  },
});

describe("App.vue render test", () => {
  it("renders", () => {
    const wrapper = payPatientTemplate;
    expect(wrapper.element).toBeDefined();
  });
});

describe("App.vue stepRoutes()", () => {
  it("returns an array", () => {
    const wrapper = payPatientTemplate;
    const wrapper2 = payPatientCSRTemplate;
    const wrapper3 = payPractitionerTemplate;
    const wrapper4 = payPractitionerCSRTemplate;
    expect(wrapper.vm.stepRoutes).toBeInstanceOf(Array);
    expect(wrapper2.vm.stepRoutes).toBeInstanceOf(Array);
    expect(wrapper3.vm.stepRoutes).toBeInstanceOf(Array);
    expect(wrapper4.vm.stepRoutes).toBeInstanceOf(Array);
  });

  it("returns payPatientStepRoutes when url is payPatient", () => {
    const wrapper = payPatientTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPatientStepRoutes);
  });

  it("returns payPatientCSRStepRoutes when url is payPatientCSR", () => {
    const wrapper = payPatientCSRTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPatientCSRStepRoutes);
  });

  it("returns payPractitionerStepRoutes when url is payPractitioner", () => {
    const wrapper = payPractitionerTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPractitionerStepRoutes);
  });

  it("returns payPractitionerCSRStepRoutes when url is payPractitionerCSR", () => {
    const wrapper = payPractitionerCSRTemplate;
    expect(wrapper.vm.stepRoutes).toEqual(payPractitionerCSRStepRoutes);
  });
});

describe("App.vue pageTitle()", () => {
  const wrapper = payPatientTemplate;
  const wrapper2 = payPatientCSRTemplate;
  const wrapper3 = payPractitionerTemplate;
  const wrapper4 = payPractitionerCSRTemplate;

  it("returns a string", () => {
    expect(typeof wrapper.vm.pageTitle() === "string").toBe(true);
    expect(typeof wrapper2.vm.pageTitle() === "string").toBe(true);
    expect(typeof wrapper3.vm.pageTitle() === "string").toBe(true);
    expect(typeof wrapper4.vm.pageTitle() === "string").toBe(true);
  });

  it("returns different page titles for each route path", () => {
    //create four constants with the four page titles
    //then create four arrays, each missing one of the results
    //the expect clause checks that the array does not contain the missing result
    //in other words, it checks that the text of result1 is not the same as result2, 3, or 4
    //if the text of the results matched,
    //eg. if result1 and result2 had the same text, the test would fail
    //this allows future states to change the text of the page title without breaking the test
    //just as long as they're all different from each other

    const result1 = wrapper.vm.pageTitle();
    const result2 = wrapper2.vm.pageTitle();
    const result3 = wrapper3.vm.pageTitle();
    const result4 = wrapper4.vm.pageTitle();
    let testArray1 = [result2, result3, result4];
    let testArray2 = [result1, result3, result4];
    let testArray3 = [result1, result2, result4];
    let testArray4 = [result1, result2, result3];
    expect(testArray1).not.toContain(result1);
    expect(testArray2).not.toContain(result2);
    expect(testArray3).not.toContain(result3);
    expect(testArray4).not.toContain(result4);
  });
});
