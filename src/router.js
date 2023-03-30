import HomePage from "./pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
// import {useAuthStore} from "@/store/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("@/pages/PostPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: () => import("@/pages/NotFound.vue"),
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!requiresAuth.user) {
      next({ name: 'login' });
      return;
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (requiresAuth.user) {
      next({ name: 'home' });
      return;
    }
  }
  next();
  return;
});

export default router;