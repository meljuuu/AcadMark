import { createRouter, createWebHistory } from 'vue-router';
// Teacher Views
import Dashboard from '@/views/teacher/Dashboard.vue';
import Classes from '@/views/teacher/classes/Classes.vue';
import Class from '@/views/teacher/classes/Class.vue';
import Forms from '@/views/teacher/Forms.vue';
import Profile from '@/views/teacher/Profile.vue';

// Login
import Login from '@/views/Login.vue';

// Admin Views
import adminDashboard from '@/views/admin/Dashboard.vue';
import MasterList from '@/views/admin/MasterList/MasterList.vue';
import AddClass from '@/views/admin/AddClass.vue';
import Record from '@/views/admin/Record.vue';
import AddStudent from '@/views/admin/AddStudent.vue';

// Superadmin Views
import SADashboard from './views/superadmin/SADashboard.vue';
import SAPersonnel from './views/superadmin/SAPersonnel.vue';
import SAGrades from './views/superadmin/SAGrades.vue';
import SAStudents from './views/superadmin/SAStudents.vue';
import SAClasses from './views/superadmin/SAClasses.vue';

// Inside the superadmin card
import insideCard from './views/superadmin/components/insideCard.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    redirect: (to) => {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      return isAdmin ? '/admin/dashboard' : '/dashboard';
    },
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
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: adminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/master-list',
    name: 'admin-master-list',
    component: MasterList,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/add-class',
    name: 'admin-add-class',
    component: AddClass,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/record',
    name: 'admin-record',
    component: Record,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/add-student',
    name: 'admin-add-student',
    component: AddStudent,
    meta: { requiresAuth: true },
  },
  {
    path: '/superadmin/dashboard',
    name: 'superadmin-dashboard',
    component: SADashboard,
    meta: { requiresAuth: true, requiresSuperAdmin: true },
  },
  {
    path: '/superadmin/personnel',
    name: 'superadmin-personnel',
    component: SAPersonnel,
    meta: { requiresAuth: true, requiresSuperAdmin: true },
  },
  {
    path: '/superadmin/grades',
    name: 'superadmin-grades',
    component: SAGrades,
    meta: { requiresAuth: true, requiresSuperAdmin: true },
  },
  {
    path: '/superadmin/students',
    name: 'superadmin-students',
    component: SAStudents,
    meta: { requiresAuth: true, requiresSuperAdmin: true },
  },
  {
    path: '/superadmin/classes',
    name: 'superadmin-classes',
    component: SAClasses,
    meta: { requiresAuth: true, requiresSuperAdmin: true },
  },
  {
    path:'/superadmin/insideCard',
    name: 'insideCard',
    component: insideCard,
    meta: { requiresAuth: true, requiresSuperAdmin: true },
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

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isSuperAdmin = localStorage.getItem('isSuperAdmin') === 'true';

  if (to.path === '/login' && user) {
    // Redirect based on role
    if (isSuperAdmin) {
      next('/superadmin/dashboard');
    } else if (isAdmin) {
      next('/admin/dashboard');
    } else {
      next('/dashboard');
    }
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next('/login');
    } else if (to.matched.some(record => record.meta.requiresSuperAdmin) && !isSuperAdmin) {
      next('/dashboard'); // block access to superadmin routes
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next('/dashboard'); // block access to admin routes
    } else {
      next(); // allowed
    }
  } else {
    next(); // public routes
  }
});


export default router;
