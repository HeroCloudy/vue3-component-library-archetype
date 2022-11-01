import inquirer from 'inquirer'
import ora from 'ora'
import path from 'path'
import fs from 'fs'
import { r, g } from '../util/log-utils'
import { formatNameToLine } from '../util/name-utils'
import {
  createDocDemo,
  createDocMd,
  createIndex, createScssFile,
  createSrcIndex,
  replaceData,
  updateDocConfig,
  updateLibIndex
} from '../util/file-utils'
import shelljs from 'shelljs'

// 组件库名称
const componentLibName = '{{libraryName}}'

const createQuestions = [
  {
    name: 'componentName',
    message: 'Input the component name: ',
    default: ''
  },
  {
    name: 'description',
    message: 'Input the component description: ',
    default: ''
  },
  {
    type: 'list',
    name: 'componentType',
    message: 'Choose the component type: ',
    choices: [
      'tsx', 'vue'
    ]
  }
]

const initComponent = (componentName, componentPath, componentType, description, spinner) => {
  if (fs.existsSync(componentPath)) {
    r('组件已存在')
    spinner.stop()
    return
  }
  // 创建组件根目录
  fs.mkdirSync(componentPath)
  // 创建组件src目录
  fs.mkdirSync(path.resolve(componentPath, 'src'))
  // 创建 src/xxx.vue 或s src/xxx.tsx
  createSrcIndex(componentPath + '/src/' + componentName + '.' + componentType, componentName, componentType)
  // 创建 index.ts
  createIndex(componentPath + '/index.ts', componentName, componentType)

  // 如果是 tsx 类型，还需要创建scss文件
  if (componentType === 'tsx') {
    const scssRoot = path.resolve(componentPath, '../scss')
    createScssFile(scssRoot, componentName)
  }

  // 初始化组件package.json
  const fullName = `@${componentLibName}/${componentName}`
  const shellCommand = `cd ${componentPath} && pnpm init`
  shelljs.exec(shellCommand, (err, stdout, stderr) => {
    console.log(stdout)
    if (err) {
      spinner.fail()
      r(err)
    } else {
      replaceData(componentPath + '/package.json', [{
        before: componentName,
        after: fullName
      }])

      g('Component installed successfully!')

      const libPath = path.resolve(componentPath, `../${componentLibName}`)
      shelljs.exec(`cd ${libPath} && pnpm install ${fullName}`, (e, s, se) => {
        console.log(e, s, se)
        spinner.succeed()
        g('Component installed successfully!')

        // 更新组件库 index.ts 文件
        const packageJsonFilePath = path.join(componentPath, `../${componentLibName}`)
        updateLibIndex(`${packageJsonFilePath}/index.ts`, componentName, fullName)

        // 更新组件库文档
        const docRoot = path.resolve(componentPath, '../../docs')
        createDocMd(`${docRoot}/components/${componentName}.md`, componentName, description)
        createDocDemo(`${docRoot}/demos`, componentName)
        updateDocConfig(`${docRoot}/components.ts`, componentName, description)
      })
    }
  })
}

export const createComponent = () => {
  inquirer.prompt(createQuestions).then(({ componentName, description, componentType }) => {
    componentName = formatNameToLine(componentName)
    console.log(componentName, description, componentType)
    const spinner = ora('Generating, please wait...').start()
    // packages 目录全路径
    const parentPath = path.resolve(__dirname, '../../../packages')
    // 组件的全路径
    const componentPath = path.resolve(parentPath, componentName)
    initComponent(componentName, componentPath, componentType, description, spinner)
  })
}
