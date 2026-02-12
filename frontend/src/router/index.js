import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Test from "../pages/Test.vue";

const routes = [
  {
    path: "/",           
    redirect: "/home",   
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: Login,
  },
  { 
    path: "/register",
    component: Register,
  },
  {
    path: "/test",
    component: Test,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;