<!--  -->
<template>
  <div class="catalogExamSection">
    <a class="link-primary" @click="jumpToNewRoute" >
      <div class="card">
        <picture>
          <source :srcset="basURL"
            type="image/jpg"><img class="card-img-top"
            :src="basURL"
            style="width:280px; height:395px;" :alt="typeName">
        </picture>
        <div class="card-body">
          <div class="title_num">{{typeName}}</div><progress max="100" value="42">
          </progress>
        </div>
      </div>
    </a>

  </div>
</template>

<script>
import * as emitter from '@/utils/emitter/eventEmitter'
export default {
  data () {
    return {
      basURL: require('../../../assets/kaoyan/picData/2022二.jpg'),
      typeName: '',
      belong: 'kaoyan'
    }
  },
  methods: {
    changePicURL (param) {
      this.typeName = param.typeName
      this.basURL = param.img
    },
    jumpToNewRoute (param) {
      console.log(this.newURL)
      emitter.emit('examURL', { newURL: this.newURL })
      this.$router.push({ path: '/' + this.belong, query: { typeName: this.typeName } })
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    emitter.on('picChange', event => {
      // console.log(111)
      this.changePicURL(event.detail)
    })
  }

}
</script>
<style lang="scss" scoped>@import "./CatalogExamSection.scss";</style>
