import { shallowMount } from "@vue/test-utils";
import Page from "@/views/LandingPage.vue";

describe("LandingPage.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Page);
    expect(wrapper.element).toBeDefined();
  });
});
