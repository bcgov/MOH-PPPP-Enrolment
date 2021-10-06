import { mount, createLocalVue } from "@vue/test-utils";
import Component from "../../../src/components/ContinueBar.vue";

const localVue = createLocalVue();

describe("ContinueBar.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("ContinueBar.vue onContinue()", () => {
  it("emits continue on function call", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    wrapper.vm.onContinue();
    expect(wrapper.emitted().continue).toBeTruthy();
  });
});
