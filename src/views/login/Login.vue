<template>
  <div class="login">
    <h1 class="mt-4"> 英语真题在线练习系统</h1>
    <p class="tip-1" style="margin: 3% 5% 0 5%; ">
      在线训练、听力练习、单词查询、单词本、<span>进度跟踪</span>、<span>查答案，</span><span>一步搞定</span></p>
    <p v-if="!showLoginModal" class="tip-1" style="margin: 1% 5% 0 5%; " @click="showLoginModal=true">登录/注册</p>
    <p v-if="showLoginModal" class="tip-1" style="margin: 1% 5% 0 5%; " @click="showLoginModal=false">进入学习</p>
    <div v-if="showLoginModal" class="logbox">
      <div class="wid100 unitSel">
        <div class="selectway log" @click="showLogin = true">登录</div>
        <div class="selectway rig" @click="showLogin = false">注册</div>
      </div>
      <!-- 登录模态框 -->
      <div v-if="showLogin" class="modal">
        <h2>登录</h2>
        <form @submit.prevent="checkLogin">
          <div>
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="loginForm.username">
        </div>
      <div>
          <label for="password">密码</label>
          <input type="password" id="password" v-model="loginForm.password">
        </div>
          <button type="submit">登录</button>
        </form>
      </div>
      <!-- 注册模态框 -->
      <div v-if="!showLogin" class="modal">
        <h2>注册</h2>
        <form @submit.prevent="register">
          <div>
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="registerForm.username">
        </div><div>
          <label for="password">密码</label>
          <input type="password" id="password" v-model="registerForm.password">
        </div>
          <button type="submit">注册</button>
        </form>
      </div>
    </div>
    <div v-if="!showLoginModal" class="modal">
      <thecatalog>
      </thecatalog>
    </div>
    <div style="margin-bottom: 1rem;" >为浙水学子提供专业的历年英语真题</div>
  </div>
</template>
<script>
import * as emitter from '@/utils/emitter/eventEmitter'
import { throttle } from '@/utils/throttle/throttle'
import thecatalog from '@/components/catalog/Catalog.vue'
import { userLogin, userRegister } from '@/api/module/user'
export default {
  name: 'login',
  data () {
    return {
      showLogin: true,
      showLoginModal: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: ''
      }
    }
  },
  updated () {
    window.addEventListener('keydown', this.KeyDown, { once: true })
  },
  components: {
    thecatalog: thecatalog
  },
  methods: {
    /**
     *@Description: 请求登录，发送表单
     *@Date: 2023-07-10 10:06:39
    */
    async checkLogin () {
      // console.log("now is check login")
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        // this.$message.warning("必要信息未填写");
        return
      }
      const res = await userLogin(this.loginForm)
      console.log(res)
      if (res !== '') {
        this.$storage.setItem('token', res.token || '')
        this.$storage.setItem('username', this.loginForm.username || '')
      }
      if (res.role === 'ROLE_STUDENT') {
        emitter.emit('isLogin', { message: true })
        this.$router.push('/practice')
      } else {
        this.$router.push('/teacher')
      }
      this.loginForm.password = ''
      this.loginForm.username = ''
    },
    /**
     *@Description: 注册
     *@Date: 2023-07-10 10:23:11
    */
    async register () {
      if (this.registerForm.username === '' || this.registerForm.password === '') {
        this.$message.warning('必要信息未填写')
        return
      }
      await userRegister(this.registerForm)
      this.registerForm.username = ''
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
    },
    /**
     *@Description:展示目录框
     *@Date: 2023-10-18 10:21:11
    */
    showcatalog () {
      this.showLoginModal = !this.showLoginModal
    }
  }
}
</script>

<style lang="scss">
@import "./Login.scss";
</style>
