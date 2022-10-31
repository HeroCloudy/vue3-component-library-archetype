import { App, Plugin } from 'vue'
import Foo from '@demo-ui-lib/foo'
// import component end
import '../scss/index.scss'

const components = [
  Foo
] // components

// 全局动态添加组件
const lib: Plugin = {
  install (app: App) {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}

export default lib
