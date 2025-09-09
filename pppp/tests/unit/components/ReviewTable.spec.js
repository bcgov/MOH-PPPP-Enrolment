import { shallowMount } from "@vue/test-utils";
import Page from "@/components/ReviewTable.vue";

describe("ReviewTable.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Page);
    expect(wrapper.element).toBeDefined();
  });
});
