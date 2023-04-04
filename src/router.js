import HomePage from "./pages/protected/HomePage.vue";
import AllUsersPage from "./pages/protected/AllUsersPage.vue";
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
    component: () => import("@/pages/public/LoginPage.vue"),
  },
  {
    path: "/own-posts",
    name: "ownPosts",
    component: () => import("@/pages/protected/PostPage.vue"),
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("@/pages/protected/AllPostsPage.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: AllUsersPage,
  },
  {
    path: "/posts-create",
    name: "postsCreate",
    component: () => import("@/pages/protected/CreatePostPage.vue"),
  },
  {
    path: "/avatar",
    name: "avatar",
    component: () => import("@/pages/protected/AvatarPage.vue"),
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