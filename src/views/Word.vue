<template>
    <div class="wordBook">
      <table>
        <thead>
          <tr>
            <th>英文</th>
            <th>中文</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, index) in words" :key="index">
            <td>{{ word.word }}</td>
            <td>{{ word.translate }}</td>
            <td>
              <el-button type="danger" @click="deleteWord(index)">移出生词本</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script>
import { searchAllWord, deleteByWord } from '@/api/module/exam.js'
export default {
  data () {
    return {
      words: []
    }
  },
  created () {
    this.loadWord()
  },
  methods: {
    async loadWord () {
      const res = await searchAllWord()
      console.log(res)
      this.words = res.result
    },
    async deleteWord (index) {
      this.$confirm('确定记住该单词了吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteByWord({ word: this.words[index].word })
        console.log(res)
        this.loadWord()
      })
    }
  }
}
</script>

  <style  lang="scss" scoped>
  /* @import url(); 引入css类 */
  .wordBook{
    width: 500px;
    display: flex;
    table{
      width: 500px;
      tr,td{
        padding: 0 20px;
        border: 2px white solid;
      }
      tr{
        height: 50px;
      }
    }
  }
  </style>
