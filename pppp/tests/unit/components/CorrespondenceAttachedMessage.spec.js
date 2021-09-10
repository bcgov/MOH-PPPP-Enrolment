import {
    mount,
    createLocalVue
  } from '@vue/test-utils';
  import Component from '../../../src/components/CorrespondenceAttachedMessage.vue';
  
  const localVue = createLocalVue();
  
  describe('CorrespondenceAttachedMessage.vue', () => {
    it('renders', () => {
      const wrapper = mount(Component, {
        localVue,
      });
      expect(wrapper.element).toBeDefined();
    });
  });