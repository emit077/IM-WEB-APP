import Vue from 'vue';
import Vuex from 'vuex';


import * as snackbar from './modules/snakbar'
import * as drawer from './modules/drawer'
import * as user from './modules/user'
import * as lead from './modules/lead'
import * as students from './modules/students'
import * as tutor from './modules/tutor'
import * as payment from './modules/payment'
import * as session from './modules/session'
import * as subscription_history from './modules/subscription_history'

Vue.use(Vuex);

export const store = new Vuex.Store({

  modules: {
    snackbar,
    drawer,
    user,
    lead,
    students,
    tutor,
    payment,
    session,
    subscription_history,
  },
  state: {
    is_production: true,
    is_offline: false,
    page_loader: false,
    otp_token: null,
    is_mobile: false,
    city: JSON.parse(localStorage.getItem('city')) || null,
    token: localStorage.getItem("token") || null,
    user_type: localStorage.getItem("user_type") || null,

  },
  categories: [],
  getters: {
    getUsertype: state => {
      return state.user.account_type;
    },
    getOtpToken: state => {
      return state.otp_token;
    },
  },
  mutations: {
    // SET_USER_TYPE(state, value) {
    //     state.user_type = value
    // },
    SET_IS_OFFLINE(state, value) {
      state.is_offline = value
    },
    SET_PAGE_LOADER(state, value) {
      state.page_loader = value
    },
    SET_OTP_TOKEN(state, value) {
      state.otp_token = value
    },
  },
  actions: {
    // setUserType({commit}, value) {
    //     commit('SET_USER_TYPE', value)
    // },
    setIsOffline({commit}, value) {
      commit('SET_IS_OFFLINE', value)
    },
    setPageLoader({commit}, value) {
      commit('SET_PAGE_LOADER', value)
    },
    setOtpToken({commit}, value) {
      commit('SET_OTP_TOKEN', value)
    },
  }
});


