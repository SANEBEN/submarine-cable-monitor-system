<template>
  <div class="app-container">
    <el-form :inline="true" :model="form_data">
      <el-row>
        <el-col :span="6" offset="3">
          <el-form-item label="相别">
            <el-select v-model="value" placeholder="相别">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="选择时间范围">
            <el-date-picker
                    v-model="query.time_range"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-collapse>
        <el-collapse-item>
          <el-row>
            <el-col :span="6" offset="3">
              <el-form-item label="序号">
                <el-input v-model="input" placeholder="序号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="数据文件名">
                <el-input v-model="input" placeholder="数据文件名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="测量设置序号">
                <el-input v-model="input" placeholder="测量设置序号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" offset="3">
              <el-form-item label="频移">
                <el-input v-model="input" placeholder="频移"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>


    </el-form>

    <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
    >
      <el-table-column align="center" label="表格名（相别）" width="95" prop="mutually">
      </el-table-column>
      <el-table-column align="center" label="序号" width="95" prop="id">
      </el-table-column>
      <el-table-column align="center" label="开始时间" prop="start_time">
      </el-table-column>
      <el-table-column align="center" label="结束时间" prop="end_time">
      </el-table-column>
      <el-table-column align="center" label="测量设置序号" prop="setting_id">
      </el-table-column>
      <el-table-column align="center" label="数据文件名" prop="file_name">
      </el-table-column>
      <el-table-column align="center" label="频移" prop="frequency_art">
      </el-table-column>
      <el-table-column align="center" label="温度" prop="temperature">
      </el-table-column>
      <el-table-column align="center" label="应力" prop="stress">
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 20px">
      <el-col :offset="7">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {getList} from '@/api/table'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                list: null,
                listLoading: true,
                currentPage: '',
                query: {
                    time_range: ''
                },
                options: [{
                    value: 'A',
                    label: 'A相'
                }, {
                    value: 'B',
                    label: 'B相'
                }, {
                    value: 'C',
                    label: 'C相'
                }],
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getList().then(response => {
                    this.list = response.data.items
                    this.listLoading = false
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            search(query) {
                console.log("查询")
            }
        }
    }
</script>
