import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import path from 'path'
import { asyncRouterMap, constantRouterMap } from '@/router'
import { deepClone } from '@/utils'
import store from '@/store'
import { AppRouteRecordRaw } from '@/router/types'

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  isAddRouters: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  public routers = [] as any[]

  public addRouters = [] as any[]

  public isAddRouters = false

  @Mutation
  private SET_ROUTERS(routers: AppRouteRecordRaw[]): void {
    // 动态路由，404一定要放到最后面
    this.addRouters = routers.concat([
      {
        path: '/:path(.*)*',
        redirect: '/404',
        name: '404',
        meta: {
          hidden: true,
          breadcrumb: false
        }
      }
    ])
    // 渲染菜单的所有路由
    this.routers = deepClone(constantRouterMap, ['component']).concat(routers)
  }

  @Mutation
  private SET_ISADDROUTERS(state: boolean): void {
    this.isAddRouters = state
  }

  @Action
  public GenerateRoutes(): Promise<unknown> {
    return new Promise<void>((resolve) => {
      // 路由权限控制
      // eslint-disable-next-line no-use-before-define
      const routerMap: AppRouteRecordRaw[] = generateRoutes(
        deepClone(asyncRouterMap, ['component'])
      )
      this.SET_ROUTERS(routerMap)
      resolve()
    })
  }

  @Action
  public SetIsAddRouters(state: boolean): void {
    this.SET_ISADDROUTERS(state)
  }
}

// 路由过滤，主要用于权限控制
function generateRoutes(routes: AppRouteRecordRaw[], basePath = '/'): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  Object.keys(routes).forEach((k) => {
    const route = routes[k]
    // skip some route
    if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
      // continue
    }

    // let onlyOneChild = null

    // if (route.children && route.children.length === 1 && !route.meta.alwaysShow) {
    //   onlyOneChild = isExternal(route.children[0].path)
    //     ? route.children[0].path
    //     : path.resolve(path.resolve(basePath, route.path), route.children[0].path)
    // }

    // 如不需要路由权限，解注释下面一行
    const data: any = { ...route }

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutes(route.children, path.resolve(basePath, data.path))
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  })
  // for (const route of routes) {
  //   // skip some route
  //   if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
  //     continue
  //   }
  //
  //   // let onlyOneChild = null
  //
  //   // if (route.children && route.children.length === 1 && !route.meta.alwaysShow) {
  //   //   onlyOneChild = isExternal(route.children[0].path)
  //   //     ? route.children[0].path
  //   //     : path.resolve(path.resolve(basePath, route.path), route.children[0].path)
  //   // }
  //
  //   let data: any = null
  //
  //   // 如不需要路由权限，解注释下面一行
  //   data = { ...route }
  //
  //   // recursive child routes
  //   if (route.children && data) {
  //     data.children = generateRoutes(route.children, path.resolve(basePath, data.path))
  //   }
  //   if (data) {
  //     res.push(data as AppRouteRecordRaw)
  //   }
  // }
  return res
}

export const permissionStore = getModule<Permission>(Permission)
