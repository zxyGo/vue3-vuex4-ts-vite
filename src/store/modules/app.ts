import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '../index'

export interface AppState {
  showLogo: Boolean
  userInfo: String
  title: String
  greyMode: Boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  public showLogo = true // 是否显示logo

  public userInfo = 'userInfo' // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突

  public title = 'vue-element-plus-admin' // 标题

  public greyMode = false // 是否开始灰色模式，用于特殊悼念日

  @Mutation
  private SET_SHOWLOGO(showLogo: boolean): void {
    this.showLogo = showLogo
  }

  @Action
  public SetShowLogo(showLogo: boolean): void {
    this.SET_SHOWLOGO(showLogo)
  }
}

export const appStore = getModule<App>(App)
