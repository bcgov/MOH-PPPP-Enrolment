import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Component from "@/components/TextArea.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("TextArea.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it("emits input correctly through built in method", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    const fakeEvent = { target: { value: "potato" } };
    wrapper.vm.emitInput(fakeEvent);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["potato"]]);
  });
});
