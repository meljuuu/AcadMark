import { createRouter, createWebHistory } from 'vue-router';
import dashboard from '@/views/dashboard.vue';
import login from '@/views/login.vue';
import classes from '@/views/classes.vue';
import profile from '@/views/profile.vue';
import subject from '@/views/subject.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/dashboard', component: dashboard },
    { path: '/Dashboard', redirect: '/dashboard' },
    { path: '/login', component: login },
    { path: '/classes', component: classes },
    { path: '/profile', component: profile },
    { path: '/subject', component: subject },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false // This makes the router case-insensitive
});

export default router;
