import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/etiquetas',
      name: 'etiquetas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TagsView.vue'),
    },
    // Ruta para mostrar el componente 404View.vue en caso de que no se encuentre la ruta
    {
      path: '/:pathMatch(.*)',
      name: 'Not found',
      component: () => import('@/views/404View.vue'),
      meta: { hideSidebar: true },
    },
  ],
})

export default router
