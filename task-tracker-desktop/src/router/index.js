import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const isLogined = false;
      if (isLogined) {
        next();
      } else {
        next({ name: 'Login' })
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ "../views/Signup.vue"),
  },
  {
    path: '/otp',
    name: 'Otp',
    component: () => import(/* webpackChunkName: "otp" */ "../views/Otp.vue"),
  },
  {
    path: '/dasboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dasboard.vue"),
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
