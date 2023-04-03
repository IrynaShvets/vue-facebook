import HomePage from "./pages/protected/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

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
    path: "/posts",
    name: "posts",
    component: () => import("@/pages/protected/PostPage.vue"),
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

// router.beforeEach(async () => {
//   const user = useAuthStore();
  
//   console.log(user) // user is defined

//   // if (to.meta.requiresAuth && !user.isAuth) next({ name: "home" }); // this will work
// })

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     console.log("Router", isLoggedIn.value)
//     if (!isLoggedIn.value) {
//       next({
//         name: 'login'
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register'];
//   const authRequired = !publicPages.includes(to.path);
//   // const loggedIn = localStorage.getItem('user');
//   // const loggedIn1 = localStorage.getItem('token');

//   if (authRequired && isLoggedIn.value) {
//     next('/login');
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const userStore = useAuthStore();

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!requiresAuth && userStore.isLoggedInn) {
//       next({ name: 'login' });
//       return;
//     }
//   }

//   if (to.matched.some((record) => record.meta.hideForAuth)) {
//     if (requiresAuth) {
//       next({ name: 'home' });
//       return;
//     }
//   }
//   next();
//   return;
// });

export default router;