/**
 *
 * Mutations业务层数据提交
 */
import storage from './storage'

export default {
  saveUserInfo (state, userInfo) {
    // console.log("userinfo", userInfo);
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  }
}
