import { mount } from "@vue/test-utils";
import Component from "@/components/TextArea.vue";

describe("TextArea.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });

  it("emits input correctly through built in method", () => {
    const wrapper = mount(Component);
    const fakeEvent = { target: { value: "potato" } };
    wrapper.vm.emitInput(fakeEvent);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["potato"]]);
  });
});
