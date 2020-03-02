import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Classes from "./components/Classes/Classes";
import Class from "./components/Classes/Class";
import AddClass from "./components/Classes/AddClass";

import Students from "./components/Students/Students";
import Student from "./components/Students/Student";
import AddStudent from "./components/Students/AddStudent";

import Signin from "./components/Auth/Signin.vue";
import Signup from "./components/Auth/Signup.vue";

import AuthGuard from "./AuthGuard";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: "/classes",
      name: "Classes",
      component: Classes,
      beforeEnter: AuthGuard
    },
    {
      path: "/classes/:classCategory/:classId",
      name: "Class",
      component: Class,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: "/Students",
      name: "Students",
      component: Students,
      beforeEnter: AuthGuard
    },
    {
      path: "/Students/:studentId",
      name: "Student",
      component: Student,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    },
    {
      path: "/Signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/addstudent",
      name: "AddStudent",
      component: AddStudent,
      beforeEnter: AuthGuard
    },
    {
      path: "/addclass",
      name: "AddClass",
      component: AddClass,
      beforeEnter: AuthGuard
    }
  ]
});
