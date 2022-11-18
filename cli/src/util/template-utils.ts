import { ComponentInfo } from '../domain/component-info'

/**
 * .vue 文件模板
 */
export const sfcTemplate = (lineNameWithPrefix: string, lowCamelName: string): string => {
  return `<template>
  <div>
    ${lineNameWithPrefix}
  </div>
</template>

<script lang="ts" setup name="${lineNameWithPrefix}">
import { defineProps } from 'vue'
import { ${lowCamelName}Props } from './types'

defineProps(${lowCamelName}Props)
</script>

<style scoped lang="scss">
.${lineNameWithPrefix} {
}
</style>
`
}

/**
 * .tsx 文件模板
 */
export const tsxTemplate = (lineNameWithPrefix: string, lowCamelName: string): string => {
  return `import { defineComponent } from 'vue'
import { ${lowCamelName}Props } from './types'

const NAME = '${lineNameWithPrefix}'

export default defineComponent({
  name: NAME,
  props: ${lowCamelName}Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          ${lineNameWithPrefix}
        </div>
      </div>
    )
  }
})
`
}

/**
 * types.ts 文件模板
 */
export const typesTemplate = (lowCamelName: string, upCamelName: string): string => {
  return `import { ExtractPropTypes } from 'vue'

export const ${lowCamelName}Props = {
} as const

export type ${upCamelName}Props = ExtractPropTypes<typeof ${lowCamelName}Props>
`
}

/**
 * 组件入口 index.ts 文件模板
 */
export const indexTemplate = (componentInfo: ComponentInfo): string => {
  const { upCamelName, lineName, lineNameWithPrefix, type } = componentInfo

  return `import ${upCamelName} from './src/${type === 'tsx' ? lineName : lineName + '.' + type}'
import { App } from 'vue'
${type === 'vue' ? `\n${upCamelName}.name = '${lineNameWithPrefix}'\n` : ''}
${upCamelName}.install = (app: App): void => {
  // 注册组件
  app.component(${upCamelName}.name, ${upCamelName})
}

export default ${upCamelName}
`
}

/**
 * scss 文件模板
 */
export const scssTemplate = (lineNameWithPrefix: string): string => {
  return `@import "../tools";
@import "../acss/mp";
@import "../base/var.module";

@include b('${lineNameWithPrefix}') {
}
`
}

export const mdTemplate = (componentInfo: ComponentInfo) => {
  return `
# ${componentInfo.upCamelName} ${componentInfo.zhName}

## 基本使用

<preview path="../demos/${componentInfo.lineName}/${componentInfo.lineName}-1.vue" title="基本使用" description=" "></preview>

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
|  |  |  |  | |

### Methods 方法

| 方法名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Events 事件

| 事件名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Slots 插槽

| 插槽名 | 说明 | 参数 |
|  ----  | ----  | ----  |
|  |  |  |
`
}

export const demoTemplate = (lineNameWithPrefix: string) => {
  return `<template>
  <${lineNameWithPrefix}></${lineNameWithPrefix}>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
</style>
`
}
