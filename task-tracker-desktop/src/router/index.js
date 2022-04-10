import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dasboard.vue"),
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
  },
  {
    path: '/connected-messengers',
    name: 'ConnectedMessengers',
    component: () => import(/* webpackChunkName: "connected-messengers" */ "../views/ConnectedMessengers.vue"),
  },
  {
    path: '/connected-trackers',
    name: 'ConnectedTrackers',
    component: () => import(/* webpackChunkName: "connected-trackers" */ "../views/ConnectedTrackers.vue"),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: '/two-fa',
    name: 'ConfirmByTwoFa',
    component: () => import(/* webpackChunkName: "confirm-by-twofa" */ "../views/ConfirmByTwoFa.vue"),

  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
