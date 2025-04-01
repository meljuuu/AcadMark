import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/dashboard.vue';
import Classes from '@/views/classes/Classes.vue';
import Class from '@/views/classes/Class.vue';
import Forms from '@/views/Forms.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/login.vue';

const routes = [
  { path: '/', redirect: '/Dashboard' },
  { path: '/Dashboard', component: Dashboard },
  { path: '/Dashboard', redirect: '/Dashboard' },
  { path: '/Classes', component: Classes },
  {
    path: '/class/:trackStand/:className/:subjectName/:gradeLevel/:subject_id',
    name: 'class',
    component: Class,
    props: true,
  },
  { path: '/Forms', component: Forms },
  { path: '/Profile', component: Profile },
  { path: '/', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
});

export default router;
