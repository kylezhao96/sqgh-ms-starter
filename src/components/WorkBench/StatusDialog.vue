<template>
    <!-- 发送出力弹窗 -->
    <el-dialog title="生产信息" :visible.sync=" sdialogVisible " :before-close="shutDialog">
        <el-form :model="status" label-position="left" label-width="80px">
            <el-form-item label="出力">
                <el-input v-model="status.power" placeholder="MW"></el-input>
            </el-form-item>
            <el-form-item label="风速">
                <el-input v-model="status.windspeed" placeholder="m/s"></el-input>
            </el-form-item>
            <el-form-item label="风向">
                <el-select v-model="status.windir" placeholder="北风" :maxlength="255">
                    <el-option label="东风" value="东"></el-option>
                    <el-option label="南风" value="南"></el-option>
                    <el-option label="西风" value="西"></el-option>
                    <el-option label="北风" value="北"></el-option>
                    <el-option label="东南风" value="东南"></el-option>
                    <el-option label="西南风" value="西南"></el-option>
                    <el-option label="东北风" value="东北"></el-option>
                    <el-option label="西北风" value="西北"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="维护">
                <el-input-number v-model="status.num1" controls-position="right" :min="0" :max="40"></el-input-number>
            </el-form-item>
            <el-form-item label="故障">
                <el-input-number v-model="status.num2" controls-position="right" :min="0" :max="40"></el-input-number>
            </el-form-item>
            <el-form-item label="无通讯">
                <el-input-number v-model="status.num3" controls-position="right" :min="0" :max="40"></el-input-number>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="shutDialog">取 消</el-button>
            <el-button type="primary" @click="confirmStatus">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "statusDialog",
        components: {
        },
        data() {
            return {
                status: {
                    todoNum: 0,
                    num1: 0,
                    num2: 0,
                    num3: 0,
                    windir: '东风'
                },
            };
        },
        props: ['sdialogVisible', 'shour'],
        mounted() {

        },
        watch: {

        },
        methods: {
            //确认出力填写
            confirmStatus() {
                // if(this.status.windir == east){
                //   this.
                // }
                this.$http({
                    method: "post",
                    url: "/api/dotask",
                    data: {
                        hour: (Array(2).join(0) + this.shour).slice(-2),
                        windspeed: this.status.windspeed,
                        power: this.status.power,
                        windir: this.status.windir,
                        num1: this.status.num1,
                        num2: this.status.num2,
                        num3: this.status.num3
                    }
                })
                    .then(res => {
                        this.shutDialog()
                        this.$notify({
                            title: '已经复制到粘贴板',
                            message: res['data'],
                            type: 'success',
                            // duration: 0,
                            onClick: () => {
                                this.fixInfo(res['data'])
                            }
                        });
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            },
            // 关闭dialog
            shutDialog() {
                this.$emit('changeSdv', false)

            },
            // 修改文档
            fixInfo(info) {
                this.$prompt('请在下方修改', '修改出力', {
                    inputValue: info,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    inputType: 'textarea'
                }).then(({ value }) => {
                    this.$http({
                        method: "post",
                        url: "/api/fixclip",
                        data: {
                            info: value
                        }
                    })
                        .then(res => {
                            this.$notify({
                                title: '已经复制到粘贴板',
                                message: res['data'],
                                type: 'success',
                                // duration: 0,
                                onClick: () => {
                                    this.fixInfo(res['data'])
                                }
                            });

                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });

            }

        },
    };
</script>

<style scoped>

</style>