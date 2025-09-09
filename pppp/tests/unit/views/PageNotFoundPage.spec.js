import { shallowMount } from "@vue/test-utils";
import Page from "@/views/PageNotFoundPage.vue";

describe("PageNotFoundPage.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Page);
    expect(wrapper.element).toBeDefined();
  });
});
