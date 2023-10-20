<!--  -->
<template>
  <div style="">
    <CatalogSideBar></CatalogSideBar>
    <div class="title-1 mt-4">
      历年考研英语
      <a>真题在线</a>
    </div>
    <div class="tip-1 mt-3" style=" text-align: center">共计5年真题试卷</div>
    <div class="mt-3" style=" text-align: center">在线训练、单词查询、单词本、进度跟踪、查答案、收藏起来!</div>
    <CatalogExamSection class=""></CatalogExamSection>
  </div>
</template>

<script>
import CatalogExamSection from './catalogExamSection/CatalogExamSection.vue'
import CatalogSideBar from '@/views/secCatalog/catalogSideBar/CatalogSideBar'
export default {
  data () {
    return {

    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  components: {
    CatalogExamSection: CatalogExamSection,
    CatalogSideBar: CatalogSideBar
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
