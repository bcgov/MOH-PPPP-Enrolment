import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Page from "@/views/MaintenancePage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("MaintenancePage.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Page, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});
