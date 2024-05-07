import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import navigationGuards from "./navigation-guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/request-password-reset",
      name: "password-reset",
      component: () => import("../views/RequestPasswordResetView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  const nextPath = navigationGuards.accessGuard(to);
  if (nextPath) {
    next({ path: nextPath });
  } else {
    next();
  }
});

export default router;
