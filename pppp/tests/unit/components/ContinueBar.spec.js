import { mount } from "@vue/test-utils";
import Component from "../../../src/components/ContinueBar.vue";

describe("ContinueBar.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});

describe("ContinueBar.vue onContinue()", () => {
  it("emits continue on function call", () => {
    const wrapper = mount(Component);
    wrapper.vm.onContinue();
    expect(wrapper.emitted().continue).toBeTruthy();
  });
});
