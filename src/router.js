import HomePage from "./pages/protected/HomePage.vue";
import LoginPage from "./pages/public/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import {useAuthStore} from "./store/auth"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/public/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/protected/AllUsersPage.vue"),
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import("@/pages/protected/UserPage.vue"),
  },
  {
    path: "/user-update/:id",
    name: "userUpdate",
    component: () => import("@/pages/protected/UpdateUserPage.vue"),
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("@/pages/protected/AllPostsPage.vue"),
  },
  
  {
    path: "/post/:id",
    name: "post",
    component: () => import("@/pages/protected/PostPage.vue"),
  },
  {
    path: "/posts-create",
    name: "postsCreate",
    component: () => import("@/pages/protected/CreatePostPage.vue"),
  },
  {
    path: "/post-update/:id",
    name: "postUpdate",
    component: () => import("@/pages/protected/UpdatePostPage.vue"),
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
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const userStore = useAuthStore();

  if (authRequired && !userStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;