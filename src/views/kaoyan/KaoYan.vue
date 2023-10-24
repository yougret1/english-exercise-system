<!--  -->
<template>
<div>{{examDataName}}15ad5dasa56</div>
</template>

<script>
import * as emitter from '@/utils/emitter/eventEmitter'
import { getKaoYanExamData } from '../../assets/kaoyan/examData'
export default {
  data () {
    return {
      examDataName: 'examDataName',
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
      console.log(this.examData.name)
      this.examDataName = this.examData.name
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
