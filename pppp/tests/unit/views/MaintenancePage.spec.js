import { shallowMount } from "@vue/test-utils";
import Page from "@/views/MaintenancePage.vue";

describe("MaintenancePage.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Page);
    expect(wrapper.element).toBeDefined();
  });
});
