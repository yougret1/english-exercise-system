import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '英语真题练习系统'
    }
  }
]
// {
//   path: '/student',
//   name: 'student',
//   component: () => import('../views/student/QuestionDetail.vue'),
//   children: [
//     {
//       path: '/student/questionListHome/:exerId',
//       component: () => import('../views/student/QuestionListHome.vue'),
//       meta: {
//         title: '题目列表'
//       }
//     }
//   ]
// }

const router = new VueRouter({
  routes,
  base: '/ees'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router