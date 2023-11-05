<!--  -->
<template>
  <div class="catalog">
    <div><div @click="jumpToNewRoute('kaoYan','历年考研英语')">历年考研英语</div></div>
    <div><div @click="jumpToNewRoute('liuJi','大学英语六级')">大学英语六级</div></div>
    <div><div @click="jumpToNewRoute('zhuanSiZhuanBa','大学英语六级')">专四专八英语</div></div>
    <div><div @click="jumpToNewRoute('siJi','大学英语四级')">大学英语四级</div></div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpToNewRoute (param, typeName1) {
      this.$router.push({ path: '/exam/' + param, query: { belong: param, typeName: typeName1 } })
    }
  }
}
</script>
<style lang="scss">
.catalog {
  font-size: 2em;
  font-weight: 400;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap ;
  >div{
    padding: 3px;
    margin: 50px 0;
    width: 48%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
    >div{
      border-bottom: 1px solid black;
    }
  }
}
</style>
