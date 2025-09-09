import { mount } from "@vue/test-utils";
import Component from "../../../src/components/CorrespondenceAttachedMessage.vue";

describe("CorrespondenceAttachedMessage.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toBeDefined();
  });
});
