import { shallowMount } from "@vue/test-utils";
import Page from "@/components/TipBox.vue";

describe("TipBox.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Page);
    expect(wrapper.element).toBeDefined();
  });
});
