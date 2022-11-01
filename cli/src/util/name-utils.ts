export const prefix = '{{componentPrefix}}'

export const convertFirstUpper = (str: string) => {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`
}

export const convertFirstLower = (str: string) => {
  return `${str.substring(0, 1).toLowerCase()}${str.substring(1)}`
}

export const formatNameToLine = (v: string): string => {
  return convertFirstLower(v).replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const getCamelName = (componentName: string) => {
  // let ret = convertFirstUpper(prefix)
  let ret = ''

  const list = componentName.split('-')
  list.forEach(item => {
    ret += convertFirstUpper(item)
  })

  return ret
}
