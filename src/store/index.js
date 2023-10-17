import { createStore } from 'vuex'
import mutations from './mutation'
import storage from '../utils/storage'

const state = {
  userInfo: storage.getItem('userInfo') || {}, // 获取用户信息
  problemInfo: {} // 问题详情
}
export default createStore({
  state,
  mutations
})
