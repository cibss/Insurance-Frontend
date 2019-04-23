
const routes = [
  { path: '/login', component: () => import('pages/Login.vue') },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '/base', component: () => import('pages/Base.vue') },
      { path: '/dashboard', component: () => import('pages/Dashboard.vue') },
      { path: '/agen', component: () => import('pages/agen/Index.vue') },
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/group', component: () => import('pages/group/Group.vue') },
      { path: '/agen/new', component: () => import('pages/agen/AddAgen.vue') },
      { path: '/product', component: () => import('pages/product/product.vue') },
      { path: '/product/new', component: () => import('pages/product/AddProduct.vue') },
      { path: '/product/package', component: () => import('pages/product/product_package.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
