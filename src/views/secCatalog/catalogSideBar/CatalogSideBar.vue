<template>
  <div class="catalogSideBar">
    <el-row class="tac">
      <el-col :span="12">
        <h5 style="">{{ name }}试卷目录</h5>
        <el-menu class="el-menu-vertical-demo" :unique-opened=true>
          <el-submenu v-for="(item, index) in textData" :key="index" :index="item.typeName">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.typeName }}</span>
            </template>
            <el-menu-item
              v-for="(childItem, childIndex) in item.children" :key="childIndex" :index="childItem.typeName"
              @click="showNewPic(childItem)"
              style="overflow: hidden;">
              {{ childItem.typeName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as emitter from '@/utils/emitter/eventEmitter'
import { searchMenuByTypeForm } from '@/api/module/menu'
export default {
  props: ['typeName1'],
  data () {
    return {
      textData: [],
      name: this.typeName1
    }
  },
  methods: {
    async loadMenuList () {
      this.textData = await searchMenuByTypeForm({ typeName: this.name })
      emitter.emit('picChange', this.textData[0].children[0])
    },
    showNewPic (current) {
      emitter.emit('picChange', current)
    }

  },
  created () {
    this.loadMenuList()
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
