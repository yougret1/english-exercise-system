import axios from '../../api/request/request'
/**
 *@Description: 通过类型查询菜单数据
 *@MethodAuthor: Yougret
 *@Date: 2023-10-19 09:37:24
*/
export const searchMenuByTypeForm = async (params) => {
  const res = await axios.post('/searchMenuByTypeForm', params)
  console.log(res)
  return res
}
