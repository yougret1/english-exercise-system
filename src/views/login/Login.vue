<template>
  <div class="container">

  </div>
</template>
<script>
import * as emitter from '../../utils/emitter/eventEmitter'
import { throttle } from '../../utils/throttle/throttle'
export default {
  name: 'login',
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      }
    }
  },
  updated () {
    window.addEventListener('keydown', this.KeyDown, { once: true })
  },
  methods: {
    /**
     *@Description: 请求登录，发送表单
     *@Date: 2023-07-10 10:06:39
    */
    async checkLogin () {
      // console.log("now is check login")
      if (this.formInline.username === '' || this.formInline.password === '') {
        // this.$message.warning("必要信息未填写");
        return
      }
      const res = await this.$http.post('/login', this.formInline)
      if (res !== '') {
        this.$storage.setItem('token', res.token || '')
        this.$storage.setItem('role', res.role || '')
        this.$storage.setItem('username', this.formInline.username || '')
      }
      if (res.role === 'ROLE_STUDENT') {
        emitter.emit('isLogin', { message: true })
        this.$router.push('/practice')
      } else {
        this.$router.push('/teacher')
      }
      this.formInline.password = ''
      this.formInline.username = ''
    },
    /**
     *@Description: 注册
     *@Date: 2023-07-10 10:23:11
    */
    async register () {
      if (this.formInline.username === '' || this.formInline.password === '') {
        this.$message.warning('必要信息未填写')
        return
      }
      await this.$http.post('/register', this.formInline)
      this.formInline.username = ''
    },
    /**
     *@Description: 对事件的监听进行响应，开始检查登录
     *@Date: 2023-07-10 10:17:44
    */
    KeyDown (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        this.throttledCheckLogin()
      }
    },
    /**
     *@Description: 节流登录
    *@Date: 2023-07-10 14:24:08
    */
    throttledCheckLogin () {
      throttle(this.checkLogin(), 2000)
    }
  }
}
</script>
