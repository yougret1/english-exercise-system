<!--  -->
<template>
<div>{{examDataName}}</div>
</template>

<script>
import * as emitter from '@/utils/emitter/eventEmitter'
import { getKaoYanExamData } from '../../assets/kaoyan/examData'
export default {
  data () {
    return {
      examDataName: '<h>theExamDataName</h>',
      examData: {}
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
  },
  methods: {
    setExamData (examURL) {
      console.log(examURL)
      this.examData = getKaoYanExamData(examURL)
      console.log(this)
      this.$set(this, 'examDataName', '你好')
      console.log(this.examDataName)
      // 这一段代码不起作用，我也不知道为什么
      // 有两个方法。一个是读取url中的路由路径，绕过emitter，然后通过kaoyan->examData->index.js中的方法进行调用返回
      // 另外一个，就是数据放后端，直接绕过前端
      this.$forceUpdate()
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  async mounted () {
    await emitter.on('examURL', event => {
      console.log(event)
      this.setExamData(event.detail.newURL)
    })
  }

}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
