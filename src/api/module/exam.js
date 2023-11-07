import axios from '../../api/request/request2'
/**
 *@Description: 用户登录
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const getByWord = async (param) => {
  const res = await axios.get(param)
  console.log(res.data)
  return res
}
