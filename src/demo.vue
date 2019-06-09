<template>
    <div>
        <h3>具有数据校验功能的表单组件——Form</h3>
        <div>
            <p v-if="formValidate.isOpen2">测试transform-dom</p>
        </div>
        <v-form ref="form" :model="formValidate" :rules="ruleValidate">
            <v-form-item label="用户名" prop="name">
                <v-input v-model="formValidate.name"></v-input>
            </v-form-item>
            <v-form-item label="邮箱" prop="mail">
                <v-input v-model="formValidate.mail"></v-input>
            </v-form-item>
            <v-form-item label="注册协议" prop="protocol">
                <v-checkbox v-model="formValidate.protocol" :disabled="false" :true-value="1" :false-value="0"></v-checkbox>
            </v-form-item>
            <v-form-item label="选项" prop="multiple">
                <v-checkbox-group v-model="formValidate.multiple">
                    <v-checkbox label="option1">选项 1</v-checkbox>
                    <v-checkbox label="option2">选项 2</v-checkbox>
                    <v-checkbox label="option3">选项 3</v-checkbox>
                    <v-checkbox label="option4">选项 4</v-checkbox>
                </v-checkbox-group>
            </v-form-item>
            <v-form-item label="单选" prop="single">
                <v-radio v-model="formValidate.single" :true-value="1" :false-value="0"></v-radio>
            </v-form-item>
            <v-form-item label="选项" prop="sport">
                <v-radio-group v-model="formValidate.sport">
                    <v-radio label="足球">足球</v-radio>
                    <v-radio label="篮球">篮球</v-radio>
                    <v-radio label="乒乓球">乒乓球</v-radio>
                    <v-radio label="羽毛球">羽毛球</v-radio>
                </v-radio-group>
            </v-form-item>
            <v-form-item label="开启" >
                <v-switch v-model="formValidate.isOpen" ></v-switch>
                <v-switch v-model="formValidate.isOpen2" :true-value="1" :false-value="0">
                    <span slot="close">关</span>
                    <span slot="open">开</span>
                </v-switch>
            </v-form-item>
            <v-form-item label="成熟" >
                <v-select v-model="formValidate.city" style="width:200px" :multiple="false">
                    <v-select-option v-for="item in cityList" :value="item.value" :label="item.label" :key="item.value">{{ item.label }}</v-select-option>
                </v-select>
            </v-form-item>
        </v-form>
        <button @click="handleSubmit">提交</button>
        <button @click="handleReset">重置</button>
    </div>
</template>
<script>

export default {
    data () {
        return {
            formValidate: {
                name: '',
                mail: '',
                protocol: false,
                multiple: [],
                single: true,
                sport: '',
                isOpen: false,
                isOpen2: false,
                city: 'London v'
            },
            ruleValidate: {
                name: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }
                ],
                mail: [
                    {
                        required: true,
                        message: '邮箱不能为空',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }
                ],
                protocol: [
                    {
                        required: true,
                        message: '注册协议必须勾选',
                        trigger: 'change',
                        type: 'number'
                    }
                ],
                multiple: [
                    {
                        required: true,
                        message: '必须选择一项',
                        trigger: 'change',
                        type: 'array'
                    }
                ],
                single: [
                    {
                        required: true,
                        message: '必须选择一项',
                        trigger: 'change',
                        type: 'number'
                    }
                ],
                sport: [
                    {
                        required: true,
                        message: '必须选择一项',
                        trigger: 'change',
                        type: 'string'
                    }
                ]
            },
            cityList: [
                {
                    value: 'New York v',
                    label: 'New York'
                },
                {
                    value: 'London v',
                    label: 'London'
                },
                {
                    value: 'Sydney v',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa v',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris v',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            city: ''
        }
    },
    methods: {
        handleSubmit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    window.alert('提交成功')
                } else {
                    window.alert('表单校验失败')
                }
            })
        },
        handleReset () {
            this.$refs.form.resetFields()
        }
    }
}
</script>
