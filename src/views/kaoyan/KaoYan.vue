<!--  -->
<!--  -->
<template>
  <div id="aa">
    <h1>{{ title }}</h1>
    <hr>
    <div id = "exam">
    </div>
    <div class="arrow" id="arrow">
      <div class="basic basic_container">
        <div id="title"></div>
        <hr>
        <div id="content"></div>
        <!-- <div>{{ isInsert}}</div> -->
        {{ isInsert }}
        <div v-if="isInsert === false" id="del" @click="del()">移除生词本</div>
        <div v-if= "isInsert" id="insert" @click="insert()">加入生词本</div>
      </div>
      <div class="memo_arrow"></div>
    </div>
    <el-radio-group v-model="direction">
      <el-radio label="rtl">从右往左开</el-radio>
    </el-radio-group>
    <el-drawer
      ref="drawer"
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      >
      <div @click="notShow()" class="notShow">隐藏所有答案</div>
      <div class="answer">
        <div v-for="(item,index) in answer" :key="index" @click="isShow(index)" >
          <div v-if="answer1[index]">
            {{ item }}
          </div>
          <br>
          <div>
              {{ index+1 }}
          </div>
        </div>
      </div>

    </el-drawer>

    <div class="footer">
      <div class="word" @click="jumpToNewRoute()">单词本</div>
      <div class="select" @click="drawer = true">查看答案</div>
    </div>
  </div>
  </template>

<script>
import MD5 from 'js-md5'
import * as emitter from '@/utils/emitter/eventEmitter'
import { getKaoYanExamData } from '../../assets/kaoyan/examData'
import first2023 from '../../assets/kaoyan/textData/examData/2023一.js'
import { getByWord, insertWord, searchByWordAndId, deleteByWord } from '@/api/module/exam.js'
export default {
  data () {
    return {
      answer1: [],
      examDataName: '<h>theExamDataName</h>',
      typeName: '',
      title: '',
      beforeNode: '<div></div>',
      show: false,
      postop: null,
      isInsert: true,
      posleft: null,
      answer: [],
      index: 0,
      drawer: false,
      direction: 'rtl'
    }
  },
  components: {
    // 'popper': Popper
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.typeName = this.$route.query.typeName
    this.title = first2023.title
    this.$nextTick(() => {
      this.loadExam()
    })
    for (var i = 0; i < 60; i++) {
      this.answer1[i] = true
    }
  },
  watch: {
    show: {
      handler (vm) {
        if (vm === false && this.beforeNode !== '') {
          this.beforeNode.style.backgroundColor = '#f2f2f2'
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    jumpToNewRoute () {
      this.$router.push({ name: 'word' })
    },
    async insert () {
      const word = document.getElementById('title').innerHTML
      const translate = document.getElementById('content').innerHTML
      if (word === '' || translate === '') {
        return
      }
      const res = await insertWord({ word: word, translate: translate })
      console.log(res)
    },
    async del () {
      const word = document.getElementById('title').innerHTML
      if (word === '') {
        return
      }
      const res = await deleteByWord({ word: word })
      console.log(res)
    },
    notShow () {
      for (var i = 0; i < 60; i++) {
        this.answer1[i] = false
      }
      this.drawer = false
      this.drawer = true
    },
    isShow (index) {
      console.log(this.isInsert)
      this.answer1[index] = !this.answer1[index]
      this.drawer = false
      this.drawer = true
      console.log(this.answer1[index])
      this.$nextTick(() => {
        this.$refs.drawer.$forceUpdate()
      })
    },
    async loadExam () {
      this.answer = first2023.answer
      const data = first2023.data
      const aarray = data.split('\n') // 未处理[""]的初始列表
      const array = []
      // 将aarray里面的空字符串除去
      for (let i = 0; i < aarray.length; i++) {
        if (aarray[i] === '') { continue }
        array.push(aarray[i])
      }
      // 将array中的字符串进行分开
      const arrayList = array.map(x => x.split(' '))
      let flag = true
      let flag1 = true
      arrayList.map((element) => {
        if (Object.prototype.toString.call(element) === '[object Array]') {
          let a
          flag = true
          flag1 = true
          // 如果是第一段则变为h2标签
          if (element[0] === 'Section') {
            a = document.createElement('h2')
          } else if (element[0] === 'Text') {
            a = document.createElement('h3')
          } else if (element[0] === 'Part' || element[0] === 'Directions:') {
            a = document.createElement('p')
            a.style.fontWeight = '800'
          } else if (element[0] === '') {
            a = document.createElement('p')
            const c = document.createElement('span')
            c.style.width = '40px'
            a.appendChild(c)
          } else if (element[0] === 'https://zhenti.burningvocabulary.com/') {
            a = document.createElement('hr')
            flag = false
          } else {
            a = document.createElement('p')
          }
          if ((element[0][1] === '.' && element[0][2] === 'A') || element[0][0] === '1' || (element[0][0] === '2' && element[0][1] === '0')) {
            flag1 = false
            a.style.position = 'relative'
            a.style.height = '20px'
          }
          let str = ''
          let num = ''
          let other = ''
          let d = document.createElement('div')
          d.style.display = 'inline-block'
          d.style.position = 'absolute'
          d.style.left = '2px'
          d.style.marginLeft = '5px'
          for (const value of element) {
            if (flag === false) break
            if (value !== '') {
              for (let i = 0; i < value.length; i++) {
                const reg = /[^a-zA-Z]/
                const reg1 = /[^0-9]/
                const text = value[i]
                const aa = text.replace(reg, '')// a-zA-Z str
                const bb = text.replace(reg1, '')// 0-9
                if (i === 0) {
                  if (flag1 === false) {
                    d = this.addChild3(str, num, other, d)
                  } else {
                    a = this.addChild3(str, num, other, a)
                  }
                  str = num = other = ''
                }
                if (aa !== '') {
                  str += value[i]
                  if (flag1 === false) {
                    d = this.addChild3('', num, other, d)
                  } else {
                    a = this.addChild3('', num, other, a)
                  }
                  num = other = ''
                } else if (bb !== '') {
                  num += value[i]
                  if (flag1 === false) {
                    d = this.addChild3(str, '', other, d)
                  } else {
                    a = this.addChild3(str, '', other, a)
                  }
                  other = str = ''
                } else {
                  other += value[i]
                  if (flag1 === false && str === 'B') {
                    a.appendChild(d)
                    d = document.createElement('div')
                    d.style.display = 'inline-block'
                    d.style.position = 'absolute'
                    d.style.left = '210px'
                  } else if (flag1 === false && str === 'C') {
                    a.appendChild(d)
                    d = document.createElement('div')
                    d.style.display = 'inline-block'
                    d.style.position = 'absolute'
                    d.style.left = '400px'
                  } else if (flag1 === false && str === 'D') {
                    a.appendChild(d)
                    d = document.createElement('div')
                    d.style.display = 'inline-block'
                    d.style.position = 'absolute'
                    d.style.left = '600px'
                  }
                  if (flag1 === false) {
                    d = this.addChild3(str, num, '', d)
                  } else {
                    a = this.addChild3(str, num, '', a)
                  }
                  str = num = ''
                }
              }
            } else {
              if (flag1 === false) {
                d = this.addChild3(str, num, other, d)
              } else {
                a = this.addChild3(str, num, other, a)
              }
              str = num = other = ''
              const b = document.createElement('span')
              a.appendChild(b)
            }
          }
          if (flag1 === false) {
            d = this.addChild3(str, num, other, d)
            a.appendChild(d)
          } else {
            a = this.addChild3(str, num, other, a)
          }
          str = num = other = ''
          var div = document.createElement('div')
          div.appendChild(a)
          setTimeout(() => {
            const exam = document.getElementById('exam')
            exam.appendChild(div)
          }, 0)
          return true
        }
      })
      window.addEventListener('click', async function (event) {
        console.log(event.target.childNodes[0].data)
        const arrow = document.getElementById('arrow')
        const postop = arrow.offsetTop
        const posleft = arrow.offsetLeft
        if (this.postop == null) {
          this.postop = postop - 32
          this.posleft = posleft + 3
        }
        if (event.target.nodeName === 'SPAN') {
          if (this.show === true) {
            this.beforeNode.style.backgroundColor = '#f2f2f2'
          }
          event.target.style.backgroundColor = 'plum'
          this.show = true
          const eventpostop = event.target.offsetTop
          const pos = event.target.getBoundingClientRect()
          const eventposleft = pos.left
          arrow.style.top = eventpostop - this.postop + 'px'
          arrow.style.left = eventposleft - this.posleft - 148 + pos.width / 2 + 'px'
          arrow.style.opacity = '1'
          this.beforeNode = event.target

          const title = document.getElementById('title')
          const word = event.target.childNodes[0].data
          title.innerText = word

          const res1 = await searchByWordAndId({ word: event.target.childNodes[0].data })
          console.log('searchByWordAndId res1-----------------' + res1.rows)
          if (res1.rows > 0) {
            this.isInsert = false
            console.log(this.isInsert)
          } else {
            this.isInsert = true
          }

          const appid = '20231107001872179'
          const salt = '1435660288'
          const secretkey = 'u8jrpPgcr6ofTE8euJIv'
          const sign = MD5(appid + word + salt + secretkey)
          const res =
            await getByWord(`/?q=${word}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`)
          // res.target_accuracy = Math.round(res.target_accuracy * 10000, 2) / 100
          console.log(res)
          const resRetdata = res.data.trans_result[0].dst
          const content = document.getElementById('content')
          content.innerHTML = resRetdata[0] !== '/' ? unescape(resRetdata) : resRetdata
        } else {
          arrow.style.opacity = '0'
          arrow.style.top = this.postop + 'px'
          arrow.style.left = this.posleft + 'px'
        }
      }, true)
    },
    addChild3 (str, num, other, d) {
      const b = document.createElement('span')
      if (num !== '') {
        b.innerText = num
        d.appendChild(b)
      } else if (str !== '') {
        b.innerText = str
        d.appendChild(b)
        // d.appendChild(a)
        this.index++
      } else if (other !== '') {
        b.innerText = other
        d.appendChild(b)
      }
      return d
    },
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
<style lang="scss" scoped>@import "./KaoYan.scss";</style>
<style lang="scss" >
#aa{
  width: 100%;
}
#exam{
  width: 790px;
  background-color: #F2F2F2;
  background-image: url(/img/texture.49767ac5.png);
  margin: 0 auto;
  p {
  display: flex;
  flex-wrap: wrap;
  align-self: baseline;
  color: var(--ds-color-london-5);
  font-weight: 350;
  font-size: large;
  margin: 0 0 0.875rem 0;
  border-left: 2px solid #00a4ff;
  border-right: 2px solid #00a4ff;
  /* padding: 0 1em; */
}
}

hr {
  background-color: rgb(0, 0, 0) 70%, white 30%;
  width: 90%;
}

span {
  display: inline-block;
  margin-right: 0.5em;
}
h2 span {
  margin: 0 auto;
  margin-right: 0.5em;
}
h1,h2,h3{
  align-items: center;
  text-align: center;
}
</style>
