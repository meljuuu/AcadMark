import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/dashboard.vue';
import Classes from '@/views/classes/Classes.vue';
import Class from '@/views/classes/Class.vue';
import Forms from '@/views/Forms.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/login.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/classes',
    name: 'classes',
    component: Classes,
    meta: { requiresAuth: true },
  },
  {
    path: '/class/:trackStand/:className/:subjectName/:gradeLevel/:subject_id/:classType',
    name: 'class',
    component: Class,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/forms',
    name: 'forms',
    component: Forms,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user');

  if (to.path === '/login' && isAuthenticated) {
    next('/dashboard');
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
