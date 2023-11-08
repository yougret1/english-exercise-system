import axios2 from '../../api/request/request2'
import axios from '../../api/request/request'

/**
 *@Description: 翻译
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const getByWord = async (param) => {
  const res = await axios2.get(param)
  console.log(res.data)
  return res
}
/**
 *@Description: 添加单词
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const insertWord = async (params) => {
  const res = await axios.post('/insertWord', params)
  return res
}

/**
 *@Description: 判断是否存在单词
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const searchByWordAndId = async (params) => {
  const res = await axios.post('/searchByWordAndId', params)
  return res
}

/**
 *@Description: 查询所有单词
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const searchAllWord = async () => {
  const res = await axios.post('/searchAllWord')
  console.log(res)
  return res
}

/**
 *@Description: 删除单词
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const deleteByWord = async (params) => {
  const res = await axios.post('/deleteByWord', params)
  return res
}
