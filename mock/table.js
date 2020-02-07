import Mock from 'mockjs'

// const data = Mock.mock({
//   'items|10': [{
//     id: '@id',
//     title: '@sentence(10, 20)',
//     'status|1': ['published', 'draft', 'deleted'],
//     author: 'name',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// })
// const data = Mock.mock({
//   'items|10': [{
//     id: '@integer(10000,20000)',
//     pulse_width: '@float(1,100,2,3)',
//     wavelength: '@float(1,100,2,3)',
//     sweep_range_start: '@integer(1,100)',//扫频范围开始
//     sweep_range_end: '@integer(1,100)',//扫频范围结束
//     sweep_interval: '@integer(1,100)',//扫频间隔
//     stacking_average_times:'@integer(1,100)',//叠加平均次数
//     pulse_power:'@integer(1,100)',//脉冲功率
//     measuring_length:'@integer(1,100)',//测量长度
//     sampling_interval:'@integer(1,100)'//采样间隔
//   }]
// })
const data = Mock.mock({
  'items|10': [{
    mutually:'@integer(0,100)',
    id: '@integer(10000,20000)',
    start_time: '@date(yy-mm-dd)',
    end_time: '@date(yy-mm-dd)',
    setting_id: '@integer(10000,20000)',
    file_name:'@cword(2,5)',
    frequency_art:'@float(1,100,2,3)',
    temperature:'@integer(1,100)',
    stress:'@integer(1,100)'
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
