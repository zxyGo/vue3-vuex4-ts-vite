import NProgress from 'nprogress'

import type { RouteRecordRaw } from 'vue-router'

import router from './router'

import 'nprogress/nprogress.css' // 进度条样式

import { appStore } from '@/store/modules/app'

import wsCache from '@/cache'

import { permissionStore } from '@/store/modules/permission'

import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress configuration

const whiteList: string[] = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (wsCache.get(appStore.userInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.isAddRouters) {
        next()
        return
      }
      permissionStore.GenerateRoutes().then(() => {
        permissionStore.addRouters.forEach((route: RouteRecordRaw) => {
          router.addRoute(route) // 动态添加可访问路由表
        })
        const redirectPath = (from.query.redirect || to.path) as string
        const redirect = decodeURIComponent(redirectPath)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        permissionStore.SetIsAddRouters(true)
        next(nextData)
      })
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    // 否则全部重定向到登录页
    next({
      path: '/login',
      query: {
        redirect: to.path
      }
    })
  }
})

router.afterEach((to) => {
  // @ts-ignore
  document.title = getPageTitle(to.meta.title, appStore.title)
  NProgress.done() // 结束进度条
})
