import { App, Plugin } from 'vue'
import Foo from './src'

export const FooPlugin: Plugin = {
  install (app: App) {
    app.component(Foo.name, Foo)
  }
}

export default Foo

export {
  Foo
}
