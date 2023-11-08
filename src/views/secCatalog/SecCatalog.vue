<!--  -->
<template>
  <div style="height: 700px;">
    <CatalogSideBar :typeName1 = "typeName"></CatalogSideBar>
    <div class="title-1 mt-4">
      {{ typeName }}
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
      typeName: '',
      belong: ''
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.typeName = this.$route.query.typeName
    this.belong = this.$route.query.belong
    console.log(this.$route.query.typeName)
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
.title-1{
  font-size: 3rem;
}
.tip-1{
  color:#555;
  font-size: 0.9rem;
}
.row{
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.year-row{
  margin-left: 0px;
  margin-right: 0px;
}
.col-12{
  flex: 0 0 100%;
  max-width: 100%;
}
.card-img-top{
  width: 100%;
  border-top-left-radius: calc(0.25rem - 1px);

  border-top-right-radius: calc(0.25rem - 1px);
}
.title_num{
  font-size: 0.9rem;
}
.mb-6 {
  margin-bottom: 6rem !important
}
.mb-5 {
  margin-bottom: 5rem !important
}
.m-5{
  margin: 5rem !important;
}
.mt-6{
  margin-top: 6rem !important;
}
.mt-5{
  margin-top: 5rem !important;
}
.mt-4{
  margin-top: 4rem !important;
}
.mt-3{
  margin-top: 3rem !important;
}
.w100{
  width: 100% !important;
}
.wid100{
  width: 100%;
}
.wid70{
  width: 70%;
}
</style>
