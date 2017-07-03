const createList = require('../../src/services/create_list')

const arr = Array.apply(null, Array(10))
arr.forEach((item) => {
  const mockData = {
    userId: (new Date()).getTime(),
    title: Math.random().toString(36).substr(2),
    link: Math.random().toString(36).substr(2),
    author: (new Date()).getTime(),
    description: Math.random().toString(36).substr(2),
    tags: 'tag, tag1'
  }
  console.log('mockData: ', mockData)
  createList.create(mockData).then((d)=>console.log(d))
})
