import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Classes from '@/views/classes/Classes.vue';
import Class from '@/views/classes/Class.vue';
import Forms from '@/views/Forms.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/login.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/classes', name: 'classes', component: Classes },
  {
    path: '/class/:trackStand/:className/:subjectName/:gradeLevel/:subject_id/:classType',
    name: 'class',
    component: Class,
    props: true,
  },
  { path: '/forms', name: 'forms', component: Forms },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/login', name: 'login', component: Login },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
});
