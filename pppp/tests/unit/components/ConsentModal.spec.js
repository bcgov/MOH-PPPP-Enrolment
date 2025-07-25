import { mount } from "@vue/test-utils";
import Component from "@/components/ConsentModal.vue";

vi.mock("axios", () => ({
  get: vi.fn(),
  post: vi.fn(() => {
    return Promise.resolve();
  }),
}));

describe("ConsentModal.vue", () => {
  const wrapper = mount(Component, {
    props: {
      applicationUuid: "11111",
    },
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("ConsentModal.vue getFocusableEls()", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        applicationUuid: "11111",
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns an array", () => {
    const result = wrapper.vm.getFocusableEls();
    //jest doesn't have a built in type checker as of June 2021.
    //if that ever changes, please refactor the following expect clause for clarity
    expect(Array.isArray(result)).toBe(true);
  });

  it("has a length greater than zero", () => {
    const result = wrapper.vm.getFocusableEls();
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("ConsentModal.vue handleCaptchaLoaded()", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        applicationUuid: "11111",
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("assigns the results of getFocusableEls() to data", async () => {
    await wrapper.setData({ focusableEls: [] });
    expect(wrapper.vm.focusableEls).toEqual([]);
    vi
      .spyOn(wrapper.vm, "getFocusableEls")
      .mockReturnValue(["default1", "default2", "default3", "default4"]);
    wrapper.vm.handleCaptchaLoaded();
    expect(wrapper.vm.focusableEls).toEqual([
      "default1",
      "default2",
      "default3",
      "default4",
    ]);
  });
});

describe("ConsentModal.vue handleCaptchaVerified()", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        applicationUuid: "11111",
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("changes captchaValid to true on function call", async () => {
    wrapper.vm.handleCaptchaVerified("token");

    expect(wrapper.vm.isCaptchaValid).toBe(true);
  });

  it("dispatches SET_CAPTCHA_TOKEN action in VueX store on function call", async () => {
    wrapper.vm.handleCaptchaVerified("token");

    expect(wrapper.emitted().captchaVerified).toBeTruthy();
    expect(wrapper.emitted().captchaVerified[0]).toEqual(["token"]);
  });

  it("updates focusable elements on function call", async () => {
    wrapper.vm.handleCaptchaVerified("token");

    expect(wrapper.vm.focusableEls).not.toBe("default");
  });
});

describe("ConsentModal.vue closeModal()", () => {
  const wrapper = mount(Component, {
    propsData: {
      applicationUuid: "11111",
    },
  });

  it("emits close signal on function call", () => {
    wrapper.vm.closeModal();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});

describe("ConsentModal.vue handleKeyDown()", () => {
  const fakeEvent = {
    target: { value: "potato" },
    key: "Tab",
    preventDefault: vi.fn(),
  };

  const fakeShiftEvent = {
    target: { value: "potato" },
    key: "Tab",
    shiftKey: true,
    preventDefault: vi.fn(),
  };

  const miscEvent = {
    target: { value: "potato" },
    key: "notTab",
    keyCode: 13, //Enter key
    shiftKey: false,
    preventDefault: vi.fn(),
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        applicationUuid: "11111",
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls handleTab() on function call", () => {
    const spyOnHandleTab = vi.spyOn(wrapper.vm, "handleTab");
    wrapper.vm.handleKeyDown(fakeEvent);
    expect(spyOnHandleTab).toHaveBeenCalled();
  });

  it("calls handleTabBackwards() on function call with shift key", () => {
    const spyOnHandleTabBackwards = vi.spyOn(
      wrapper.vm,
      "handleTabBackwards"
    );
    wrapper.vm.handleKeyDown(fakeShiftEvent);
    expect(spyOnHandleTabBackwards).toHaveBeenCalled();
  });

  it("calls neither function if the button pressed isn't tab", () => {
    const spyOnHandleTabBackwards = vi.spyOn(
      wrapper.vm,
      "handleTabBackwards"
    );
    const spyOnHandleTab = vi.spyOn(wrapper.vm, "handleTab");
    wrapper.vm.handleKeyDown(miscEvent);
    expect(spyOnHandleTabBackwards).not.toHaveBeenCalled();
    expect(spyOnHandleTab).not.toHaveBeenCalled();
  });
});

describe("ConsentModal.vue handleTab()", () => {
  const mockElements = [
    { name: "default1", focus: vi.fn() },
    { name: "default2", focus: vi.fn() },
    { name: "default3", focus: vi.fn() },
    { name: "default4", focus: vi.fn() },
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        applicationUuid: "11111",
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("assigns focus to the first element in the focusableEls array if nothing is focused", async () => {
    //setData required because there's a mounted() call in the .vue that overwrites focusableEls on page load
    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: null,
    });
    const spyOnFocus = vi.spyOn(wrapper.vm.focusableEls[0], "focus");

    wrapper.vm.handleTab();
    expect(wrapper.vm.focusedEl.name).toBe("default1");
    expect(spyOnFocus).toHaveBeenCalled();
  });

  it("moves focus from the first element to the second if the first is focused", async () => {
    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[0],
    });

    wrapper.vm.handleTab();
    expect(wrapper.vm.focusedEl.name).toBe("default2");
  });

  it("moves focus from the last element to the first if the last is focused", async () => {
    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[3],
    });
    wrapper.vm.handleTab();
    expect(wrapper.vm.focusedEl.name).toBe("default1");
  });

  it("should call the focus function belonging to the newly focused element", async () => {
    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[3],
    });
    const spyOnFocus = vi.spyOn(wrapper.vm.focusableEls[0], "focus");
    wrapper.vm.handleTab();
    expect(spyOnFocus).toHaveBeenCalled();
  });
});

describe("ConsentModal.vue handleTabBackwards()", () => {
  const mockElements = [
    { name: "default1", focus: vi.fn() },
    { name: "default2", focus: vi.fn() },
    { name: "default3", focus: vi.fn() },
    { name: "default4", focus: vi.fn() },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        applicationUuid: "11111",
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("assigns focus to the last element in the focusableEls array if nothing is focused", async () => {
    await wrapper.setData({
      focusableEls: mockElements,
    });

    const spyOnFocus = vi.spyOn(wrapper.vm.focusableEls[3], "focus");
    wrapper.vm.handleTabBackwards();
    expect(wrapper.vm.focusedEl.name).toBe("default4");
    expect(spyOnFocus).toHaveBeenCalled();
  });

  it("moves focus from the second element to the first if the second is focused", async () => {
    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[1],
    });

    wrapper.vm.handleTabBackwards();
    expect(wrapper.vm.focusedEl.name).toBe("default1");
  });

  it("moves focus from the first element to the last if the first is focused", async () => {
    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[0],
    });
    wrapper.vm.handleTabBackwards();
    expect(wrapper.vm.focusedEl.name).toBe("default4");
  });

  it("should call focus function on focused element", async () => {
    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[3],
    });
    const spyOnFocus = vi.spyOn(wrapper.vm.focusableEls[2], "focus");
    wrapper.vm.handleTabBackwards();
    expect(spyOnFocus).toHaveBeenCalled();
  });
});
