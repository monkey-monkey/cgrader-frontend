import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
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
      path: "/submissions",
      name: "Submissions",
      component: () => import(/* webpackChunkName: "submission" */ "./views/Submissions.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = Vue.cookies.get("authToken");
  if (!token) {
    if (process.env.VUE_APP_DEBUG) {
      // tslint:disable-next-line: no-console
      console.warn("There is no AuthToken in cookie, authentication required feature might not work");
      next();
    } else {
      window.location.href = `${process.env.VUE_APP_BASE_URL}/auth/login`;
    }
  } else {
    next();
  }
});

export default router;
