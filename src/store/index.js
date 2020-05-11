import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authUser: null,
    users: null,
    posts: null,
    userInfo: null,
    postInfo: null,
    isLoading: false,
  },
  getters: {
    AUTH_USER: (state) => state.authUser,
    USERS: (state) => state.users,
    POSTS: (state) => state.posts,
    USER_INFO: (state) => state.userInfo,
    POST_INFO: (state) => state.postInfo,
    IS_LOADING: (state) => state.isLoading,
  },
  mutations: {
    SET_AUTH_USERS: (state, payload) => {
      state.authUser = payload;
    },
    SET_USERS: (state, payload) => {
      state.users = payload;
    },
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },
    SET_USERS_INFO: (state, payload) => {
      state.userInfo = payload;
    },
    SET_POSTS_INFO: (state, payload) => {
      state.postInfo = payload;
    },
    CHANGE_LOADING_STATUS: (state, payload) => {
      state.isLoading = payload;
    },
  },
  actions: {
    AUTH_USER_REQUEST: async (context, payload) => {
      context.commit('SET_AUTH_USERS', payload);
    },
    LOGOUT_USER_REQUEST: async (context) => {
      context.commit('SET_AUTH_USERS', null);
    },
    GET_USERS: async (context) => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      context.commit('SET_USERS', data);
    },
    GET_POSTS: async (context) => {
      context.commit('CHANGE_LOADING_STATUS', true);
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      context.commit('SET_POSTS', data);
      context.commit('CHANGE_LOADING_STATUS', false);
    },
    GET_USER_INFO: async (context, payload) => {
      context.commit('CHANGE_LOADING_STATUS', true);
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${payload}`);
      context.commit('SET_USERS_INFO', data);
      context.commit('CHANGE_LOADING_STATUS', false);
    },
    GET_POST_INFO: async (context, payload) => {
      context.commit('CHANGE_LOADING_STATUS', true);

      const requestOne = axios.get(`https://jsonplaceholder.typicode.com/posts/${payload}`);
      const requestTwo = axios.get(`https://jsonplaceholder.typicode.com/posts/${payload}/comments`);

      await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const post = responses[0].data;
        const comments = responses[1].data;
        post.comments = comments;
        context.commit('SET_POSTS_INFO', post);
      })).catch((errors) => {
        console.log(errors);
      });
      context.commit('CHANGE_LOADING_STATUS', false);
    },
  },
  modules: {
  },
});
