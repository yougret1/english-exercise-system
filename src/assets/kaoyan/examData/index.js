import Y2022One from './data/2022一'
import Y2022Two from './data/2022二'

const getName = (param) => {
  return param.name
}

export const getKaoYanExamData = (name) => {
  console.log(name)
  if (name === getName(Y2022One)) return Y2022One
  if (name === getName(Y2022Two)) return Y2022Two
  return null
}
