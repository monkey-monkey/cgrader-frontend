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
      component: () => import(/* webpackChunkName: "about" */ "./views/Docs.vue"),
    },
    {
      path: "/problems",
      name: "Problems",
      component: () => import(/* webpackChunkName: "about" */ "./views/Problems.vue"),
    },
    {
      path: "/problem",
      name: "Problem",
      component: () => import(/* webpackChunkName: "about" */ "./views/Problem.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import(/* webpackChunkName: "about" */ "./views/Profile.vue"),
    },
  ],
});
