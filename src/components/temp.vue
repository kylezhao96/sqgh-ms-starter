<!-- 创建维护单弹窗 暂时弃用 后期加入此功能-->
    <!-- <el-dialog :visible.sync="sdialogVisible" :before-close="shutDialog">
      <div slot="title" class="dialog-title">
        <span>风机维护/检修记录</span>
        <el-upload action="/api/postgzp">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-form :model="wtForm">
        <el-row>
          <el-form-item>
            <el-col :span="8">
              <span>风机：</span>
            </el-col>
            <el-col :span="16">
              <el-cascader v-model="wtForm.wt" :options="wts" @change="handleChange"></el-cascader>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作负责人：</span>
            </el-col>
            <el-col :span="16">
              <el-select
                v-model="wtForm.manager"
                filterable
                allow-create
                default-first-option
                placeholder="请选择工作负责人"
              >
                <el-option
                  v-for="item in managers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作班成员：</span>
            </el-col>
            <el-col :span="16">
              <el-select
                v-model="wtForm.members"
                multiple
                filterable
                allow-create
                :remote-method="searchMembers"
                placeholder="工作班成员"
              >
                <el-option
                  v-for="item in managers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作类型</span>
            </el-col>
            <el-col :span="16">
              <el-radio v-model="wtForm.mode" label="维护">维护</el-radio>
              <el-radio v-model="wtForm.mode" label="检修">检修</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作大类</span>
            </el-col>
            <el-col :span="16">
              <el-radio v-model="wtForm.type" label="巡检">巡检</el-radio>
              <el-radio v-model="wtForm.type" label="技改">技改</el-radio>
              <el-radio v-model="wtForm.type" label="消缺">消缺</el-radio>
              <el-radio v-model="wtForm.type" label="半年维护">半年维护</el-radio>
              <el-radio v-model="wtForm.type" label="全年维护">全年维护</el-radio>
              <el-radio v-model="wtForm.type" label="其他">其他</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作内容：</span>
            </el-col>
            <el-col :span="16">
              <el-autocomplete
                v-model="wtForm.task"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                @focus="handleFocus"
              ></el-autocomplete>
            </el-col>
    </el-form-item>-->
    <!-- <el-form-item>
            <el-col :span="8">
              <span>许可时间：</span>
            </el-col>
            <el-col :span="16">
              <div class="block">
                <el-date-picker
                  v-model="wtForm.allow_time"
                  type="datetime"
                  placeholder="选择许可时间"
                  default-time="8:00:00"
                  value-format="timestamp"
                ></el-date-picker>
              </div>
            </el-col>
    </el-form-item>-->
    <!-- </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendWTM">确 定</el-button>
      </div>
    </el-dialog>-->
    <!-- 终结界面 -->