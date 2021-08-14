import { createRouter, createWebHashHistory, Router } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { AppRouteRecordRaw } from './types'

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/404',
    component: () => import('_c/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('_v/login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = []

const router: Router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[]
})

export function resetRouter(): void {
  const resetWhiteNameList = ['RedirectRoot', 'Redirect', 'Login', 'Root', 'Dashboard', 'Page404']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      // eslint-disable-next-line no-unused-expressions
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
