import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Classes from '@/views/classes/Classes.vue';
import Class from '@/views/classes/Class.vue';
import Profile from '@/views/Forms.vue';
import Login from '@/views/Login.vue';

const routes = [
    { path: '/', redirect: '/Dashboard' }, 
    { path: '/Dashboard', component: Dashboard },
    { path: '/Dashboard', redirect: '/Dashboard' },
    { path: '/Classes', component: Classes },
    { path: '/Class', component: Class },
    { path: '/Profile', component: Profile },
    { path: '/', component: Login } 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false 
});

export default router;
