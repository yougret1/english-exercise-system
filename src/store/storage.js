/**
 * Storage二次封装
 * @author  Zrh
 *
 */
export default {
  setItem (key, val) {
    const storage = this.getStorage()
    storage[key] = val // 只能用[] 不能以.的形式
    window.localStorage.setItem('userInfo', JSON.stringify(storage))
  },
  getItem (key) {
    return this.getStorage()[key]
  },
  getStorage () {
    // 返回的应该是一个对象 而不是一个字符串数组
    return JSON.parse(window.localStorage.getItem('userInfo') || '{}') // 不存在就返回为空)
  },
  clearItem (key) {
    const storage = this.getStorage() // 两者指向相同对象
    delete storage[key] // 删除这个变量的指定属性 后要重新赋值, 并不会因为浅拷贝而直接改变原有对象 因为storage中的内容 本身就很特殊
    window.localStorage.setItem('userInfo', JSON.stringify(storage))
  },
  clearAll () {
    window.localStorage.clear()
  }
}
