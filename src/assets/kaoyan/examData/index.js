import Y2022One from './data/2022一'
import Y2022Two from './data/2022二'

const getName = (param) => {
  return param.name
}
/**
 *@Description: 通过这个函数方法来获取应当拿到的年份的data
 *@name:试卷的名字
 *@ClassAuthor: Yougret
 *@Date: 2023-11-02 10:42:58
*/
export const getKaoYanExamData = (name) => {
  console.log(name)
  if (name === getName(Y2022One)) return Y2022One
  if (name === getName(Y2022Two)) return Y2022Two
  return null
}
