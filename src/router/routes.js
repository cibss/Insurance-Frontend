
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '/base', component: () => import('pages/Base.vue') },
      { path: '', component: () => import('pages/Dashboard.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
