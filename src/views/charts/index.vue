<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form :inline="true" :model="form_data">
          <el-form-item label="选择时间范围">
            <el-date-picker
                    v-model="query.time_range"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="审批人">
            <el-input v-model="input" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="value" placeholder="活动区域">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div id="chart" :style="{width: '100%', height: '600px'}"/>
  </div>
</template>

<script>
    import ecStat from 'echarts-stat'
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts')
    // 引入散点图
    require('echarts/lib/chart/scatter')
    // 引入折线图
    require('echarts/lib/chart/line')
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    window.onresize = function () {
        window.chart.resize()
    }
    export default {
        name: 'Dashboard',
        data() {
            return {
                data: [
                    [1, 4862.4],
                    [2, 5294.7],
                    [3, 5934.5],
                    [4, 7171.0],
                    [5, 8964.4],
                    [6, 10202.2],
                    [7, 11962.5],
                    [8, 14928.3],
                    [9, 16909.2],
                    [10, 18547.9],
                    [11, 21617.8],
                    [12, 26638.1],
                    [13, 34634.4],
                    [14, 46759.4],
                    [15, 58478.1],
                    [16, 67884.6],
                    [17, 74462.6],
                    [18, 79395.7]
                ],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                query: {
                    value: '',
                    input: '',
                    time_range: ''
                }
            }
        },
        mounted() {
            this.drawChart()
        },
        methods: {
            drawChart() {
                //regressionType - string. 回归类型，提供了四种类型的回归算法，分别是 'linear', 'exponential', 'logarithmic', 'polynomial'。
                var myRegression = ecStat.regression('exponential', this.data)
                myRegression.points.sort(function (a, b) {
                    return a[0] - b[0]
                })
                window.chart = echarts.init(document.getElementById('chart'))
                window.chart.setOption({
                    title: {
                        text: '海底电缆监测数据实时显示',
                        subtext: 'By NCEPU',
                        sublink: '',
                        left: 'center'
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} 分'
                        },
                        splitNumber: 20
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} s'
                        },
                    },
                    series: [{
                        name: 'scatter',
                        type: 'scatter',
                        emphasis: {
                            label: {
                                show: true,
                                position: 'left',
                                color: 'blue',
                                fontSize: 16
                            }
                        },
                        data: this.data
                    }, {
                        name: 'line',
                        type: 'line',
                        showSymbol: false,
                        smooth: true,
                        data: myRegression.points,
                        markPoint: {
                            itemStyle: {
                                color: 'transparent'
                            },
                            label: {
                                show: true,
                                position: 'left',
                                formatter: myRegression.expression,
                                color: '#333',
                                fontSize: 14
                            },
                            data: [{
                                coord: myRegression.points[myRegression.points.length - 1]
                            }]
                        }
                    }]
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
