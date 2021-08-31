import { auth, usersCollection } from '@/includes/firebase';

export default {
  // namespaced: true,
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      // auth() returns an object used to communication with service
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email, payload.password,
      );

      // adding data to the database
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
        role: payload.role,
      });
      await userCred.user.updateProfile({
        displayName: payload.name,
      });
      // ctx references the store itself (in this case it was
      // destrucutised so we only get the commit fucntion)
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
    async login({ commit }, payload) {
      // signs user with thei email and password
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuth');
    },
    async signout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
  },
};
