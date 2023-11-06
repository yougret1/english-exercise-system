<!--  -->
<template>
<div>
  <h1>{{ title }}</h1>
  <hr>
  <el-popover
    ref="popover"
    placement = "bottom"
    title="标题"
    width="200"
    trigger="manual"
    v-model="show"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
  </el-popover>
</div>
</template>

<script>
import * as emitter from '@/utils/emitter/eventEmitter'
import { getKaoYanExamData } from '../../assets/kaoyan/examData'
import first2023 from '../../assets/kaoyan/textData/examData/2023一.js'
export default {
  data () {
    return {
      examDataName: '<h>theExamDataName</h>',
      typeName: '',
      title: '',
      beforeNode: `<div></div>`,
      show: fal,
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.typeName = this.$route.query.typeName
    this.title = first2023.title
    this.loadExam()
  },
  watch:{
    show:{
      handler(vm){
        if(vm == false && this.beforeNode !== ''){
          this.beforeNode.style.backgroundColor = '#f2f2f2'
        }
      },
      deep:true,
      immediate:true
    }
  },
  methods: {
    loadExam () {
      const data = first2023.data
      const aarray = data.split("\n") //未处理[""]的初始列表
      const array = []
      // 将aarray里面的空字符串除去
      for (let i = 0; i < aarray.length; i++) {
        if (aarray[i] === "")
          continue
        array.push(aarray[i])
      }
      // 将array中的字符串进行分开
      const arrayList = array.map(x => x.split(" "))
      let flag = true;
      let flag1 = true;
      arrayList.map((element) => {
        if (Object.prototype.toString.call(element) === "[object Array]") {
          let a;
          flag = true
          flag1 = true
          //如果是第一段则变为h2标签
          if (element[0] === 'Section') {
            a = document.createElement("h2");
          } else if (element[0] === 'Text') {
            a = document.createElement("h3");
          } else if (element[0] === 'Part' || element[0] === 'Directions:') {
            a = document.createElement("p")
            a.style.fontWeight = "800"
          } else if (element[0] === '') {
            a = document.createElement("p")
            let c = document.createElement("span")
            c.style.width = '40px'
            a.appendChild(c)
          }else if(element[0] === 'https://zhenti.burningvocabulary.com/'){
            a = document.createElement("hr");
            a.style.width="100%"
            a.style.backgroundColor="#888"
            a.style.height='2px'
            flag = false
          }else {
            a = document.createElement("p");
          }
          if((element[0][1]==='.' && element[0][2] === 'A') || element[0][0]==='1' || (element[0][0]==='2' && element[0][1]==='0')){
            flag1 = false
            a.style.position = "relative"
            a.style.height="20px"
          }
          console.log(123)
          let str=''
          let num=''
          let other = ''
          let d = document.createElement("div")
          d.style.display="inline-block"
          d.style.position = 'absolute'
          d.style.left = '2px'
          d.style.marginLeft = '5px'
          for (const value of element) {
            if(flag === false) break
            if (value !== '') {
              for(let i=0;i<value.length;i++){
                let reg = /[^a-zA-Z]/
                let reg1 = /[^0-9]/
                let text = value[i]
                let aa = text.replace(reg,'');//a-zA-Z str
                let bb = text.replace(reg1 ,'');//0-9
                if(i==0){
                  if(str!==''){
                    let pop = document.createElement("el-popover")
                    pop.placement
                    let b = document.createElement("span");
                    b.innerText = str;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b);
                    str=''
                  }else if(num!==''){
                    let b = document.createElement("span");
                    b.innerText = num;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    num=''
                  }else if(other!==''){
                    let b = document.createElement("span");
                    b.innerText = other;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    other=''
                  }
                }
                if(aa!==''){
                  str+=value[i];
                  if(num!==''){
                    let b = document.createElement("span");
                    b.innerText = num;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    num=''
                  }else if(other!==''){
                    let b = document.createElement("span");
                    b.innerText = other;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    other=''
                  }
                }else if(bb!==''){
                  num+=value[i];
                  if(str!==''){
                    let b = document.createElement("span");
                    b.innerText = str;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    str=''
                  }else if(other!==''){
                    let b = document.createElement("span");
                    b.innerText = other;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    other=''
                  }
                }else{
                  other+=value[i]
                  if(str!==''){
                    let b = document.createElement("span");
                    if (flag1 === false && str=='B') {
                      a.appendChild(d)
                      d = document.createElement("div")
                      d.style.display="inline-block"
                      d.style.position = 'absolute'
                      d.style.left = '210px'
                    }else if (flag1 === false && str=='C') {
                      a.appendChild(d)
                      d = document.createElement("div")
                      d.style.display="inline-block"
                      d.style.position = 'absolute'
                      d.style.left = '400px'
                    }else if (flag1 === false && str=='D') {
                      a.appendChild(d)
                      d = document.createElement("div")
                      d.style.display="inline-block"
                      d.style.position = 'absolute'
                      d.style.left = '600px'
                    }
                    b.innerText = str;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    str=''
                  }else if(num!==''){
                    let b = document.createElement("span");
                    b.innerText = num;
                    if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                    num=''
                  }
                }
              }
            }else {
              if(str!==''){
                  let b = document.createElement("span");
                  b.innerText = str;
                  if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                  str=''
              }else if(num!==''){
                let b = document.createElement("span");
                b.innerText = num;
                if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
                num=''
              }else if(other!==''){
                let b = document.createElement("span");
                b.innerText = other;
                if(flag1 === false) d.appendChild(b)
                else a.appendChild(b)
                other=''
              }
              let b = document.createElement("span");
              a.appendChild(b);
            }
          }
          if(num!==''){
              let b = document.createElement("span");
              b.innerText = num;
              if(flag1 === false) d.appendChild(b)
                else a.appendChild(b)
              num=''
          }else if(other!==''){
            let b = document.createElement("span");
            b.innerText = other;
            if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
            other=''
          }else if(str!==''){
            let b = document.createElement("span");
            b.setAttribute("v-popover", "popover");
            b.innerText = str;
            if(flag1 === false) d.appendChild(b)
                    else a.appendChild(b)
            str=''
          }
          if(flag1===false){
            a.appendChild(d)
          }
          var div = document.createElement('div')
          div.appendChild(a)
          app.appendChild(div)
          return true;
        }
      })
      window.addEventListener("click", function (event) {
        console.log(event.target.childNodes[0].data)
        if(event.target.nodeName == 'SPAN'){
          event.target.style.backgroundColor = 'plum';
          if(this.show === true){
            this.beforeNode.style.backgroundColor = '#f2f2f2'
          }
          this.show = true
          console.log(this.show)
          this.beforeNode = event.target
        }
        
      }, true)
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
<style scoped>

</style>
<style>
/* *{
    background-color: #F2F2F2;
    background-image: url(/img/texture.49767ac5.png);
  } */
#app div{
  margin: 0 auto;
}
/* @import url(); 引入css类 */
p {
  width: 790px;
  display: flex;
  flex-wrap: wrap;
  align-self: baseline;
  color: var(--ds-color-london-5);
  font-weight: 350;
  font-size: large;
  margin: 0 0 0.875rem 0;
  border-left: 2px solid #00a4ff;
  border-right: 2px solid #00a4ff;
  padding: 0 1em;
}

hr {
  background-color: black 80%, white 20%;
  height: 2px;
  width: 100%;
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
}
</style>
