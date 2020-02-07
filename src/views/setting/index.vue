<template>
  <div class="app-container">
    <el-divider>测量参数设置</el-divider>
    <el-form :model="measure_setup" ref="measure_setup" status-icon :label-position="label_position" :rules="rules"
             label-width="200px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="序号" prop="id">
            <el-input-number v-model.number="measure_setup.id" :step="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="脉宽（ns）" prop="pulse_width">
            <el-input-number v-model.number="measure_setup.pulse_width" :step="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="波长（nm）" prop="wavelength">
            <el-input-number v-model.number="measure_setup.wavelength" :step="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15">
          <el-form-item label="扫频范围" prop="sweep_range">
            <el-slider
                    v-model="measure_setup.sweep_range"
                    range
                    :step="0.0001"
                    :max="20"
                    :min="10">
            </el-slider>
          </el-form-item>
        </el-col>
        <el-col :span="8" offset="1">
          <el-form-item label="扫频间隔" prop="sweep_interval">
            <el-input-number v-model.number="measure_setup.sweep_interval" :precision="4" :step="0.0001"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="叠加平均次数（2的次方数）" prop="stacking_average_times">
            <el-input-number v-model.number="measure_setup.stacking_average_times" :step="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="脉冲功率（dBm）" prop="pulse_power">
            <el-input-number v-model.number="measure_setup.pulse_power" :step="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="测量长度（KM）" prop="measuring_length">
            <el-input-number v-model.number="measure_setup.measuring_length" :step="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item label="采样间隔（m）" prop="sampling_interval">
        <el-input-number v-model.number="measure_setup.sampling_interval" :precision="2" :step="0.01"></el-input-number>
      </el-form-item>


      <el-row>
        <el-col :span="8" offset="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm('measure_setup')">提交</el-button>
            <el-button @click="resetForm('measure_setup')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-divider>故障阈值设置</el-divider>
    <el-form :model="malfunction_setup" ref="malfunction_setup" status-icon :label-position="label_position" :rules="rules"
             label-width="200px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="故障阈值上限" prop="sampling_interval">
            <el-input-number v-model.number="malfunction_setup.threshold_value_max" :precision="2" :step="0.01"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="故障阈值下限" prop="sampling_interval">
            <el-input-number v-model.number="malfunction_setup.threshold_value_min" :precision="2" :step="0.01"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row>
        <el-col :span="8" offset="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm('malfunction_setup')">提交</el-button>
            <el-button @click="resetForm('malfunction_setup')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
        data() {
            let validate_pulse_width = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('脉宽不能为空'));
                } else {
                    callback();
                }
            }
            return {
                label_position: 'left',
                measure_setup: {
                    id: '',
                    pulse_width: 50,
                    wavelength: 1500,
                    sweep_range: [10, 20],
                    sweep_interval: 0,
                    stacking_average_times: 13,
                    pulse_power: 20,
                    measuring_length: 10,
                    sampling_interval: 1
                },
                malfunction_setup:{
                  threshold_value_max:12,
                  threshold_value_min:10
                },
                rules: {
                    pulse_width: [
                        {validator: validate_pulse_width, trigger: 'blur'}
                    ]
                }
            }
        },
        created() {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
