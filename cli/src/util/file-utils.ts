import fs from 'fs'
import { getCamelName, prefix } from './name-utils'

export const replaceData = (fileName: string, replaceList: any) => {
  console.log(JSON.stringify(replaceList))
  if (fs.existsSync(fileName)) {
    let content: string = fs.readFileSync(fileName).toString()
    for (let i = 0; i < replaceList.length; i++) {
      const replaceItem = replaceList[i]
      content = content.replace(replaceItem.before, replaceItem.after)
    }
    fs.writeFileSync(fileName, content)
  }
}

export const createSrcIndex = (filename: string, componentName: string, componentType: string) => {
  const componentNameWithPrefix = `${prefix}-${componentName}`
  let content = ''
  if (componentType === 'vue') {
    content = `<template>
  <div>
    ${componentNameWithPrefix}
  </div>
</template>

<script lang="ts" setup name="${componentNameWithPrefix}">
</script>

<style scoped lang="scss">
.${componentNameWithPrefix} {
}
</style>
`
  } else {
    content = `import { defineComponent } from 'vue'

const NAME = '${componentNameWithPrefix}'

export default defineComponent({
  name: NAME,
  props: {
  },
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          ${componentNameWithPrefix}
        </div>
      </div>
    )
  }
})
`
  }
  fs.writeFileSync(filename, content)
}

export const createIndex = (filename: string, componentName: string, componentType: string) => {
  const camelName = getCamelName(componentName)
  const content = `import ${camelName} from './src/${componentType === 'tsx' ? componentName : componentName + '.' + componentType}'
import { App } from 'vue'

${camelName}.install = (app: App): void => {
  // 注册组件
  app.component('${camelName}', ${camelName})
}

export default ${camelName}
`
  fs.writeFileSync(filename, content)
}

export const updateLibIndex = (fileName: string, componentName: string, fullName: string) => {
  const camelName = getCamelName(componentName)
  const content = fs.readFileSync(fileName).toString()
  const index1 = content.indexOf('// import component end')
  const index2 = content.indexOf('] // components')

  const result = `${content.substring(0, index1)}` +
    `import ${camelName} from '${fullName}'\n` +
    content.substring(index1, index2 - 1) +
    `,\n  ${camelName}\n` +
    content.substring(index2)
  console.log(result)
  fs.writeFileSync(fileName, result)
}

export const createScssFile = (dir:string, componentName: string) => {
  const content = `@import "../tools/sassMagic";
@import "../acss/mp";

.${prefix}-${componentName} {
}
`
  fs.writeFileSync(`${dir}/components/_${componentName}.scss`, content)

  const result = fs.readFileSync(`${dir}/components/index.scss`).toString()
  const indexContent = result.substring(0, result.length) + `@use "${componentName}";\n`
  fs.writeFileSync(`${dir}/components/index.scss`, indexContent)
}

export const createDocMd = (fileName: string, componentName: string, description: string) => {
  const camelName = getCamelName(componentName)
  const content = `# ${camelName} ${description}

## 基本使用

<preview path="../demos/${componentName}/${componentName}-1.vue" title="基本使用" description="xxxxx"></preview>

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
  fs.writeFileSync(fileName, content)
}

export const createDocDemo = (fileName: string, componentName: string) => {
  const demoDoc = `${fileName}/${componentName}`
  if (!fs.existsSync(demoDoc)) {
    fs.mkdirSync(demoDoc)
  }
  const content = `<template>
  <${prefix}-${componentName}></${prefix}-${componentName}>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
</style>
`
  fs.writeFileSync(`${demoDoc}/${componentName}-1.vue`, content)
}

export const updateDocConfig = (fileName: string, componentName: string, description:string) => {
  const camelName = getCamelName(componentName)
  const content = fs.readFileSync(fileName).toString()
  const index = content.indexOf('] // end')
  const result = content.substring(0, index - 1) +
    `,\n  { text: '${camelName} ${description}', link: '/components/${componentName}' }\n` +
    content.substring(index)
  fs.writeFileSync(fileName, result)
}
