import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage.vue';

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('authUserEmail')) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('authUserEmail')) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/posts/:id',
    name: 'Post',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../components/PostPage.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/users/:id',
    name: 'User',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../components/UserPage.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: ifNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/LoginPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
