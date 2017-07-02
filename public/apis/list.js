/**
 * Mocking client-server processing
 */
const lists = [
  {
    ava: '../assets/logo.png',
    title: '标题标题标题',
    link: 'http://xxx.com',
    author: 'xx',
    time: '2017.07.01',
    tags: ['aaa', 'bbb'],
    description: '关于 NodeConfBP NodeConfBP 会议于 2017 年 1 月在布达佩斯召开，本次会议为期一天，只有关于 NodeConfBP NodeConfBP 会议于 2017 年 1 月在布达佩斯召开，本次会议为期一天，只有'
  }
]

export default {
  getLists (cb, errorCb) {
    setTimeout(() => cb(lists), 100)
  }
}
