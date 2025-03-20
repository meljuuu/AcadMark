import { createRouter, createWebHistory } from 'vue-router';
import dashboard from '@/views/dashboard.vue';
import classes from '@/views/classes.vue';
import profile from '@/views/profile.vue';
import subject from '@/views/subject.vue';

const routes = [
    { path: '/', redirect: '/dashboard' }, 
    { path: '/dashboard', component: dashboard },
    { path: '/Dashboard', redirect: '/dashboard' },
    { path: '/classes', component: classes },
    { path: '/profile', component: profile },
    { path: '/subject', component: subject },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false 
});

export default router;
