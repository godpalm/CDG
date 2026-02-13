import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Test from "../pages/Test.vue";
import Edit from "../pages/EditUser.vue";

const routes = [
  {
    path: "/",           
    redirect: "/home",   
  },
  {
    path: "/home",
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: 'Login',
    component: Login,
  },
  { 
    path: "/register",
    name: 'Register',
    component: Register,
  },
  {
    path: "/test",
    name: 'Test',
    component: Test,
  },
  {
    path: "/edit/:id",
    name: 'EditUser',
    component: Edit,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;