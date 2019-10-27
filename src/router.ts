import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/docs",
      name: "Documentation",
      component: () => import(/* webpackChunkName: "docs" */ "./views/Docs.vue"),
    },
    {
      path: "/problems",
      name: "Problems",
      component: () => import(/* webpackChunkName: "problems" */ "./views/Problems.vue"),
    },
    {
      path: "/problem/:code",
      name: "Problem",
      component: () => import(/* webpackChunkName: "problem" */ "./views/Problem.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import(/* webpackChunkName: "profile" */ "./views/Profile.vue"),
    },
    {
      path: "/submission",
      name: "Submission",
      component: () => import(/* webpackChunkName: "submission" */ "./views/Submission.vue"),
    },
  ],
});
