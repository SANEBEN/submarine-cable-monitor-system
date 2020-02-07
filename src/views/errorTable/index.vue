<template>
  <div class="app-container">
    <el-form :inline="true" :model="form_data">
      <el-row>
        <el-col :span="6" offset="3">
          <el-form-item label="相别">
            <el-select v-model="form_data.mutually" placeholder="相别">
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
          <el-form-item label="选择开始时间">
            <el-date-picker
                    v-model="form_data.start_time"
                    type="datetime"
                    placeholder="选择开始时间">
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
                <el-input v-model="form_data.number" placeholder="序号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="频移位置号">
                <el-input v-model="form_data.frequency_shift_position" placeholder="频移位置号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属序号">
                <el-input v-model="form_data.b_number" placeholder="测量设置序号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>

    </el-form>
    <!--表格-->
    <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95" prop="id">
      </el-table-column>
      <el-table-column align="center" label="相别" prop="start_time">
      </el-table-column>
      <el-table-column align="center" label="所属序号" prop="setting_id">
      </el-table-column>
      <el-table-column align="center" label="开始时间" prop="start_time">
      </el-table-column>
      <el-table-column align="center" label="频移位置号" prop="frequency_art">
      </el-table-column>
      <el-table-column align="center" label="频移" prop="frequency_art">
      </el-table-column>
      <el-table-column align="center" label="温度" prop="temperature">
      </el-table-column>
      <el-table-column align="center" label="应力" prop="stress">
      </el-table-column>
    </el-table>
    <!--分页组件-->
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
                currentPage: 1,
                form_data: {
                    number: '',
                    mutually: '',
                    start_time: '',
                    b_number:'',
                    frequency_shift_position:''
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
                }]
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
            }
        }
    }
</script>
