import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SongItem from '@/components/SongItem.vue';

describe('Snapshot SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docID: 'abc',
      modifed_name: 'test',
      name: 'test',
      comment_count: 3,

    };
    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
