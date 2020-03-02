/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import { defaultClient as apolloClient } from "./main";

import {
  GET_USERS,
  REGISTER_MANAGER,
  SIGNIN_MANAGER,
  GET_CURRENT_MANAGER,
  SIGNUP_USER,
  ADD_CLASS,
  GET_CLASSES,
  GET_STUDENTS_BY_CATEGORY,
  GET_CLASSROOM,
  GET_STUDENT_BY_ID
} from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    manager: null,
    students: [],
    classes: [],
    loading: false,
    error: null,
    authError: null,
    studentsByCategory: [],
    classroom: "",
    studentById: "",
    checkInError: null,
    checkInSuccess: null
  },
  mutations: {
    setStudents: (state, payload) => {
      state.students = payload;
    },
    setClasses: (state, payload) => {
      state.classes = payload;
    },
    setClassroom: (state, payload) => {
      state.classroom = payload;
    },
    setStudentsByCategory: (state, payload) => {
      state.studentsByCategory = payload;
    },
    setStudentById: (state, payload) => {
      state.studentById = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setManager: (state, payload) => {
      state.manager = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearManager: state => (state.manager = null),
    clearError: state => (state.error = null),
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    setCheckInError: (state, payload) => {
      state.checkInError = payload;
    },
    setCheckInSuccess: (state, payload) => {
      state.checkInSuccess = payload;
    }
  },
  actions: {
    getCurrentManager: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_MANAGER
        })
        .then(({ data }) => {
          commit("setLoading", false);
          //Add current manager data to state
          commit("setManager", data.getCurrentManager);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getStudents: ({ commit }, payload) => {
      commit("setLoading", true);
      //use ApolloClient to fire getStudents Query
      apolloClient
        .query({
          query: GET_USERS,
          variables: payload
        })
        .then(({ data }) => {
          //get data from actions to state via mutations
          commit("setStudents", data.getStudents);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getClasses: ({ commit }, payload) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CLASSES,
          variables: payload
        })
        .then(({ data }) => {
          //get data from actions to state via mutations
          commit("setClasses", data.getClasses);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getClassroom: ({ commit }, payload) => {
      commit("setLoading", true);
      //use ApolloClient to fire getUsers Query
      apolloClient
        .query({
          query: GET_CLASSROOM,
          variables: payload
        })
        .then(({ data }) => {
          //get data from actions to state via mutations
          commit("setClassroom", data.getClassroom);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getStudentsByCategory: ({ commit }, payload) => {
      commit("setLoading", true);
      //use ApolloClient to fire getUsers Query
      apolloClient
        .query({
          query: GET_STUDENTS_BY_CATEGORY,
          variables: payload
        })
        .then(({ data }) => {
          //get data from actions to state via mutations
          commit("setStudentsByCategory", data.getStudentsByCategory);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getStudentById: ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);
      //use ApolloClient to fire getUsers Query
      apolloClient
        .query({
          query: GET_STUDENT_BY_ID,
          variables: payload
        })
        .then(({ data }) => {
          //get data from actions to state via mutations
          commit("setStudentById", data.getStudentById);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    registerManager: ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);
      apolloClient
        .mutate({
          mutation: REGISTER_MANAGER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.registerManager.token);
          router.go();
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
        });
    },
    signinManager: ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);
      apolloClient
        .mutate({
          mutation: SIGNIN_MANAGER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.signinManager.token);
          // reload the page to make sure created method in main.js runs
          router.go();
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
        });
    },
    signoutManager: async ({ commit }) => {
      //clear manager in state
      commit("clearManager");
      //remove token in local storage
      localStorage.setItem("token", "");
      //end session
      await apolloClient.resetStore();
      // the redirect home is done in Signin component
      await router.push("/signin");
    },
    signupStudent: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          return data.signupStudent;
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
        });
    },
    addClass: ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);
      apolloClient
        .mutate({
          mutation: ADD_CLASS,
          variables: payload
        })
        .then(({ data }) => {
          commit("setClasses", data.addClass);
          commit("setLoading", false);
          return data.addClass;
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
        });
    },
    displayErrorMessage: ({ commit }, payload) => {
      commit("setError", payload);
    },
    displayCheckInError: ({ commit }, payload) => {
      commit("setCheckInError", payload);
    },
    displayCheckInSuccess: ({ commit }, payload) => {
      commit("setCheckInSuccess", payload);
    }
  },
  getters: {
    manager: state => state.manager,
    classes: state => state.classes,
    students: state => state.students,
    studentsByCategory: state => state.studentsByCategory,
    studentById: state => state.studentById,
    studentAttendance: state =>
      state.studentById && state.studentById.classesAttended,
    classroom: state => state.classroom,
    users: state => state.users,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError,
    checkInError: state => state.checkInError,
    checkInSuccess: state => state.checkInSuccess
  }
});
