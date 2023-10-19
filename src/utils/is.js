/**
  *@Description:判断是否为空
  *@Date: 2023-07-07 11:49:00
 */
export const isNull = (value) => {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true
  }
  return false
}
/**
 *@Description: 判断是否为字符串
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:17:52
*/
export const isString = (value) => {
  return typeof value === 'string'
}

/**
 *@Description: 判断是否为数组
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:18:04
*/
export const isArray = (value) => {
  return Array.isArray(value)
}

/**
 *@Description: 判断是否为布尔值
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:18:07
*/
export const isBoolean = (value) => {
  return typeof value === 'boolean'
}
