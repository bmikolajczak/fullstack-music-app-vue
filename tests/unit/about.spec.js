import About from '@/views/About.vue';
import { shallowMount } from '@vue/test-utils';

describe('About.vue', () => {
  test('renders inner text', () => {
    // wrapper is an object fromed from component
    const wrapper = shallowMount(About);

    expect(wrapper.text()).toContain('about');
  });
});
