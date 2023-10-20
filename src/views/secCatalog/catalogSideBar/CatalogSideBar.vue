<template>
  <div class="catalogSideBar">
    <el-row class="tac">
      <el-col :span="12">
        <h5 style="">{{ textData.name }}试卷目录</h5>
        <el-menu class="el-menu-vertical-demo" unique-opened=true>
          <el-submenu v-for="(item, index) in textData.data" :key="index" :index="item.title">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(childItem, childIndex) in item.exams" :key="childIndex" :index="childItem.name"
              @click="showNewPic(textData.belong,childItem.picName)"
              style="overflow: hidden;">
              {{ childItem.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import textData from '../../../assets/kaoyan/textData/textData'
import * as emitter from '@/utils/emitter/eventEmitter'
export default {
  data () {
    return {
      textData: textData
    }
  },
  methods: {
    showNewPic (belong, param) {
      console.log(param)
      emitter.emit('picChange', { belong: belong, newURL: param })
    }

  },
  mounted () {
  }
}
</script>
<style lang="scss">
.catalogSideBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 700px;
  height: 100vh;

  h5 {
    text-align: center;
    background-color: white;
    margin: 0;
    padding: 22.5px 0;
    font-size: large;
    border-bottom: 4px double #aaa;
  }
}
</style>
