import { ComponentInfo } from '../domain/component-info'
import { g } from '../util/log-utils'
import path from 'path'
import fs from 'fs'
import { demoTemplate, mdTemplate } from '../util/template-utils'

/**
 * 创建组件文档、demo及更新菜单
 */
export const initDoc = (componentInfo: ComponentInfo) => {
  // 组件库文档根路径
  const docRootPath = path.resolve(componentInfo.parentPath, '../docs')
  const { lineName, lineNameWithPrefix, upCamelName, zhName } = componentInfo

  // 1. 创建组件的 MD 文档
  fs.writeFileSync(path.resolve(docRootPath, `components/${lineName}.md`), mdTemplate(componentInfo))

  // 2. 创建组件文档中的 Demo
  fs.mkdirSync(path.resolve(docRootPath, `demos/${lineName}`))
  fs.writeFileSync(path.resolve(docRootPath, `demos/${lineName}/${lineName}-1.vue`), demoTemplate(lineNameWithPrefix))

  // 3. 更新组件库文档菜单
  const menuPath = path.resolve(docRootPath, 'components.ts')
  const content = fs.readFileSync(menuPath).toString()
  const index = content.indexOf('] // end')
  const result = content.substring(0, index - 1) +
    `,\n  { text: '${upCamelName} ${zhName}', link: '/components/${lineName}' }\n` +
    content.substring(index)
  fs.writeFileSync(menuPath, result)

  g('component document init success')
}
