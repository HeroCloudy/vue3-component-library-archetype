import * as path from 'path'
import { convertToLine, convertToLowCamelName, convertToUpCamelName } from '../util/name-utils'
import { Config } from '../config'

export class ComponentInfo {
  /** 中划线分隔的名称，如：nav-bar */
  lineName: string
  /** 中划线分隔的名称（带组件前缀） 如：yyg-nav-bar */
  lineNameWithPrefix: string
  /** 首字母小写的驼峰名 如：navBar */
  lowCamelName: string
  /** 首字母大写的驼峰名 如：NavBar */
  upCamelName: string
  /** 组件中文名 如：左侧导航 */
  zhName: string
  /** 组件类型 如：tsx */
  type: 'tsx' | 'vue'

  /** packages 目录所在的路径 */
  parentPath: string
  /** 组件所在的路径 */
  fullPath: string

  /** 组件的前缀 如：yyg */
  prefix: string
  /** 组件全名 如：@yyg-demo-ui/xxx */
  nameWithLib: string

  constructor (componentName: string, description: string, componentType: string) {
    this.prefix = Config.COMPONENT_PREFIX

    this.lineName = convertToLine(componentName)
    this.lineNameWithPrefix = `${this.prefix}-${this.lineName}`

    this.upCamelName = convertToUpCamelName(this.lineName)
    this.lowCamelName = convertToLowCamelName(this.upCamelName)
    this.zhName = description
    this.type = componentType === 'vue' ? 'vue' : 'tsx'

    this.parentPath = path.resolve(__dirname, '../../../packages')
    this.fullPath = path.resolve(this.parentPath, this.lineName)

    this.nameWithLib = `@${Config.COMPONENT_LIB_NAME}/${this.lineName}`
  }
}
