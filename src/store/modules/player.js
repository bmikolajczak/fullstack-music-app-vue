import { Howl } from 'howler';
import helper from '@/includes/helper';

export default {
  state: {
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
  mutations: {
    newSong(state, payload) {
      state.currentSong = payload;

      // creating new audio object
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      // sets to the current position in the song
      state.seek = helper.formatTime(state.sound.seek());
      // sets state to the current duration of the song
      state.duration = helper.formatTime(state.sound.duration());
      // progress of the player bar
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
    },
  },
  actions: {
    async newSong({ commit, state, dispatch }, payload) {
      // dealing with multiple players of the song
      if (state.sound instanceof Howl) {
        // pauses the audio, removes the instance and rm form memory
        state.sound.unload();
      }

      commit('newSong', payload);

      state.sound.play();
      state.sound.on('play', () => {
        // just like set interval but used for animations
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }

      // this function returns info about elent cords and dimanions
      // currenTarget always returns an element an event is added to
      const { x, width } = payload.currentTarget.getBoundingClientRect();

      // payload contains event object when emitted
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      // seek() can also be used to update the position
      state.sound.seek(seconds);

      // comeback func is only run once
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
};
