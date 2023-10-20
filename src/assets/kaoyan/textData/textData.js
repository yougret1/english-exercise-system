import Y2022One from './examData/2022一'
import Y2022Two from './examData/2022二'
export default {
  name: '考研英语',
  belong: 'kaoyan',
  data: [
    {
      title: '2023',
      exams: [
        {
          name: '2023年全国硕士研究生入学统一考试英语(一)',
          examData: Y2022One,
          picName: '2022一'
        },
        {
          name: '2023年全国硕士研究生入学统一考试英语(二)',
          examData: Y2022Two,
          picName: '2022二'
        }
      ]
    },
    {
      title: '2022',
      exams: [
        {
          name: '2022年全国硕士研究生入学统一考试英语(一)',
          examData: Y2022One,
          picName: '2022一'
        },
        {
          name: '2022年全国硕士研究生入学统一考试英语(二)',
          examData: Y2022Two,
          picName: '2022二'
        }
      ]
    }
  ]
}
