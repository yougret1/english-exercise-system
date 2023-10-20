<!--  -->
<template>
  <div class="catalogExamSection">
    <a class="link-primary" href="/kaoyan/2022/02">
      <div class="card">
        <picture>
          <source :srcset="basURL + picURL" type="image/webp">
          <source :srcset="basURL + picURL"
            type="image/jpg"><img class="card-img-top"
            :src="basURL + picURL"
            style="width:280px;height:395px;" alt="2022年考研英语二">
        </picture>
        <div class="card-body">
          <div class="title_num">2022年考研英语二</div><progress max="100" value="42">

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
      basURL: '../../../assets/',
      picURL: 'kaoyan/picData/2022二.jpg'
    }
  },
  methods: {
    changePicURL (belong, name) {
      this.picURL = belong + '/picData/' + name + '.jpg'
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    emitter.on('picChange', event => {
      this.changePicURL(event)
    })
  }

}
</script>
<style lang="scss" scoped>@import "./CatalogExamSection.scss";</style>
