import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import { cloneDeep } from 'lodash';
import player from '@/components/Player.vue';

jest.mock('@/includes/firebase', () => ({
  auth: {
    // when mocking a promise, it has to be resolved or rejected
    signInWithEmailAndPassword: () => Promise.resolve(),
  },
}));

describe('Vuex Store', () => {
  test('toggleAuth mutation sets userLoggedIn to true',
    () => {
    // testing mutations

      // creates deep clone => clone with no references to the original
      const clonedAuth = cloneDeep(auth);

      const store = createStore({
        modules: {
          auth: clonedAuth,
        },
      });

      expect(store.state.auth.userLoggedIn).not.toBe(true);
      store.commit('toggleAuth');
      expect(store.state.auth.userLoggedIn).toBe(true);
    });

  test('login action sets userLoggedIn to true',
    async () => {
    // testing actions

      // telling jest how many assertion will there be
      expect.assertions(2);
      // creates deep clone => clone with no references to the original
      const clonedAuth = cloneDeep(auth);

      const store = createStore({
        modules: {
          auth: clonedAuth,
        },
      });
      expect(store.state.auth.userLoggedIn).toBe(false);
      await store.dispatch('login', { email: '', password: '' });
      expect(store.state.auth.userLoggedIn).toBe(true);
    });

  test('playing returns true if audio is playing',
    () => {
      const state = {
        sound: {
          playing: () => true,
        },
      };
      const result = player.getters.playing(state);

      expect(result).toEqual(true);
    });
});
