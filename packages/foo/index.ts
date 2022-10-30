import { App } from 'vue'
import Foo from './src'

Foo.install = (app: App) => {
  app.component(Foo.name, Foo)
}

export default Foo
