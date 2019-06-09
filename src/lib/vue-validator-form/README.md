## vue-validator-form

1. 基于 Vue2.x 开发，实现的自定义表单验证组件
2. 目前已包含input、checkbox、radio、select、switch表单组件

## 在线demo地址

[demo预览](https://willson-wang.github.io/vue-validator-form/dist/index.html)

## NPM

```
npm i vue-validator-form --save | yarn add vue-validator-form
```

## 引入插件

```
import Vue from 'vue'
import vForm from 'vue-validator-form'

Vue.use(vForm)
```

## 基本用法

```
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
```



## API

| 参数               |        说明                  | 类型    | 默认值       |
| ---               |         ---                  | ---    | ---         |



## EVENT

| 事件               |        说明                  |  返回值      |
| ---               |         ---                  | -----         |

