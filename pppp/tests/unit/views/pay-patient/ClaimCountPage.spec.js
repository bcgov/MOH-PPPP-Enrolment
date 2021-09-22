import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Page from "@/views/pay-patient/ClaimCountPage.vue";
import { cloneDeep } from "lodash";
import * as module1 from "../../../../src/store/modules/app";
import * as module2 from "../../../../src/store/modules/pay-patient-form";
import * as module3 from "../../../../src/store/modules/pay-practitioner-form";
import logService from "@/services/log-service";
import spaEnvService from "@/services/spa-env-service";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

const storeTemplate = {
  modules: {
    app: cloneDeep(module1.default),
    payPatientForm: cloneDeep(module2.default),
    payPractitionerForm: cloneDeep(module3.default),
  },
};

const patientState = {
  isInfoCollectionNoticeOpen: true,
  applicationUuid: null,
};

storeTemplate.modules.payPatientForm.state = cloneDeep(patientState);

const spyOnLogService = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

console.log(
  "******************************************************************************************************************************************"
);

describe("ClaimCountPage.vue render test", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("ClaimCountPage.vue created()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });

    wrapper.vm.$options.created.forEach((hook) => {
      hook.call(wrapper.vm);
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls logService", () => {
    expect(spyOnLogService).toHaveBeenCalled();
  });

  /* 
  I spent a number of hours trying to test the code in the if (this.isFirstLoad()) {} block. 
  I came to the conclusion that it may not be possible to do for lifecycle reasons.
  The order of operations looks like this:
  1. Created() test runs
  2. New Store is created
  3. The if (this.isFirstLoad()) {} code block recognizes that there isn't a UUID, so it assigns one
  4. The if block calls all of the other functions inside the if block
  5. The mounted() method creates any spies to check to see if those functions are called
  6. If you call the created() hook a second time, the if block sees there's already a UUID
  So it doesn't call anything in the if block a second time
  7. The spies don't catch the function calls because they're created after the function is called
  And it's not really possible to call them a second time without refactoring the code

  If it's essential that these functions be tested, the contents of the if block would need to be moved to a separate function
  Then that function can be called independently of the if block and tested that way
  Until then, I leave these comments as an aid to anyone who tries to attempt this in the future
  */
});

describe("ClaimCountPage.vue isFirstLoad()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });

    wrapper.vm.$options.created.forEach((hook) => {
      hook.call(wrapper.vm);
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns false", () => {
    const result = wrapper.vm.isFirstLoad();
    expect(result).toEqual(false);
  });

  //the true version of this test is impossible to verify
  //for the reasons stated in the created() section
});

describe("ClaimCountPage.vue handleCaptchaVerified()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });

    wrapper.vm.$options.created.forEach((hook) => {
      hook.call(wrapper.vm);
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls dispatch with correct parameters", () => {
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    wrapper.vm.handleCaptchaVerified("captchaTokenTest");
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_CAPTCHA_TOKEN}`,
      "captchaTokenTest"
    );
  });

  it("assigns value to store such that it can be retrieved later", () => {
    wrapper.vm.handleCaptchaVerified("captchaTokenTest");
    expect(wrapper.vm.$store.state.payPatientForm.captchaToken).toEqual(
      "captchaTokenTest"
    );
  });
});

describe("ClaimCountPage.vue handleCloseConsentModal()", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(storeTemplate);
    wrapper = mount(Page, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
        $router: {
          push: jest.fn(),
          currentRoute: {
            path: "/potato-csr",
          },
        },
      },
    });

    wrapper.vm.$options.created.forEach((hook) => {
      hook.call(wrapper.vm);
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls dispatch with correct parameters", () => {
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    wrapper.vm.handleCloseConsentModal();
    expect(spyOnDispatch).toHaveBeenCalledWith(
      `${module2.MODULE_NAME}/${module2.SET_IS_INFO_COLLECTION_NOTICE_OPEN}`,
      false
    );
  });

  it("assigns value to store such that it can be retrieved later", () => {
    wrapper.vm.handleCloseConsentModal();
    expect(
      wrapper.vm.$store.state.payPatientForm.isInfoCollectionNoticeOpen
    ).toEqual(false);
  });
});
