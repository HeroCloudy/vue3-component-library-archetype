/**
 * 将首字母转为大写
 */
export const convertFirstUpper = (str: string): string => {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`
}

/**
 * 将首字母转为小写
 */
export const convertFirstLower = (str: string): string => {
  return `${str.substring(0, 1).toLowerCase()}${str.substring(1)}`
}
/**
 * 转为中划线命名
 */
export const convertToLine = (str: string): string => {
  return convertFirstLower(str).replace(/([A-Z])/g, '-$1').toLowerCase()
}
/**
 * 转为驼峰命名（首字母大写）
 */
export const convertToUpCamelName = (str: string): string => {
  let ret = ''
  const list = str.split('-')
  list.forEach(item => {
    ret += convertFirstUpper(item)
  })
  return convertFirstUpper(ret)
}
/**
 * 转为驼峰命名（首字母小写）
 */
export const convertToLowCamelName = (componentName: string): string => {
  return convertFirstLower(convertToUpCamelName(componentName))
}
