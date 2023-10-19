import axios from '../../api/request/request'
/**
 *@Description: 用户登录
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const userLogin = async (params) => {
  const res = await axios.post('/login', params)
  return res
}
/**
 *@Description: 用户注册
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:30
*/
export const userRegister = async (params) => {
  const res = await axios.post('/register', params)
  return res
}
