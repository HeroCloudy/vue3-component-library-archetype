import { App } from 'vue'
import Foo from '@demo-ui-lib/foo'
import ProCard from '@demo-ui-lib/pro-card'
import NavBar from '@demo-ui-lib/nav-bar'
import SideBar from '@demo-ui-lib/side-bar'
// import component end
import '../scss/index.scss'

const components = [
  Foo,
  ProCard,
  NavBar,
  SideBar
] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
