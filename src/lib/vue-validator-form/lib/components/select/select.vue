<template>
    <div class="v-select" ref="select" v-clickoutside="clickoutsideHandler" :class="[!multiple && 'v-select--single']">
        <label ref="reference" @click="toggleMenu" class="v-select__label">
            <input type="hidden" :value="labels" @change="handleChange" :placeholder="placeholder">
            <div class="v-select__tag" v-for="(label, index) in labels" :key="index">
                <span >{{label}}</span>
                <i v-if="multiple" @click.stop="removeTag(label)">x</i>
            </div>
            <div v-if="!labels.length" class="v-select__placeholder">请选择</div>
        </label>
        <transition appear name="drop">
            <drop
                :style="{width: dropWidth}"
                v-show="visible"
                v-transform-dom
            >
                <slot></slot>
            </drop>
        </transition>
    </div>
</template>

<script>
import transformDom from '../../directive/transform-dom'
import clickoutside from '../../directive/clickoutside'
import Drop from './select-drop'
import Emitter from '../../utils/emitter'
import { findComponentsDownward } from '../../utils/find'

export default {
    name: 'vSelect',
    components: { Drop },
    props: {
        value: {
            type: [String, Number, Array]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentValue: '',
            visible: false,
            dropWidth: null,
            labels: []
        }
    },
    directives: {
        transformDom,
        clickoutside
    },
    watch: {
        value (val) {
            console.log('val', val)
            this.labels = this.getOptionLabel()
        }
    },
    mixins: [Emitter],
    methods: {
        getValue () {
            return typeof this.value === 'string' ? [this.value] : this.value
        },
        getOptionLabel () {
            const options = findComponentsDownward(this, 'vSelectOption')
            if (options.length) {
                const currentOption = options.filter(option => {
                    return this.getValue().indexOf(option.value) > -1
                })
                return currentOption.length ? currentOption.map((option) => option.label) : []
            } else {
                return []
            }
        },
        setOptionSelect () {
            const options = findComponentsDownward(this, 'vSelectOption')
            if (options.length) {
                options.forEach((option) => {
                    option.isSelected = this.getValue().indexOf(option.value) > -1
                })
            }
        },
        handleChange () {
            this.$emit('input', this.value)
            this.$emit('on-change', this.value)
        },
        toggleMenu () {
            this.visible = !this.visible
            if (this.visible) {
                this.broadcast('vSelectDrop', 'on-update-popper', {})
            } else {
                this.broadcast('vSelectDrop', 'on-destroy-popper', {})
            }
        },
        select (data) {
            let value = null
            if (this.multiple) {
                let index = this.value.indexOf(data.value)
                let values = [...this.value]
                if (index > -1) {
                    values.splice(index, 1)
                    value = values
                } else {
                    value = [...values, data.value]
                }
                index > -1 ? (this.labels = this.labels.splice(index, 1)) : this.labels.push(data.label)
            } else {
                value = data.value
                this.labels.push(data.label)
                this.visible = false
            }
            this.$emit('input', value)
            this.dispatch('vFormItem', 'on-form-change', value)
            this.$nextTick(() => {
                this.setOptionSelect()
            })
        },
        clickoutsideHandler (e) {
            this.visible = false
        },
        removeTag (label) {
            const index = this.labels.indexOf(label)
            this.labels = this.labels.splice(index, 1)
            let values = [...this.value]
            let value = this.value
            if (index > -1) {
                values.splice(index, 1)
                value = values
            }
            this.$emit('input', value)
            this.$nextTick(() => {
                this.setOptionSelect()
            })
        }
    },
    mounted () {
        this.setOptionSelect()
        this.labels = this.getOptionLabel()
        this.$on('on-select-selected', this.select)
        this.$nextTick(() => {
            this.dropWidth = this.$el.getBoundingClientRect().width + 'px'
        })
    }
}
</script>

<style scoped>
.v-select {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    color: #515a6e;
    font-size: 14px;
    line-height: normal;
}

.v-select__label {
    display: block;
    box-sizing: border-box;
    user-select: none;
    position: relative;
    background-color: #fff;
    font-size: 0;
    /* height: 30px; */
    line-height: 28px;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    outline: 0;
    cursor: pointer;
    box-sizing: border-box;
    text-align: left;
    padding: 0 10px;
    min-height: 30px;
}

.v-select__label input {
    width: 100%;
}

.v-select__tag {
    display: inline-block;
    padding: 0 8px;
    border: 1px solid #e8eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
    height: 24px;
    line-height: 22px;
    margin: 1px 4px 1px 0;
    max-width: 99%;
    position: relative;
    box-sizing: border-box;
}

.v-select__tag span {
    display: block;
    margin-right: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.v-select__tag i {
    font-size: 14px;
    transform: scale(1.2) rotate(0);
    cursor: pointer;
    margin-left: 2px;
    color: #666;
    opacity: .66;
    position: absolute;
    right: 4px;
    top: 0;
}

.v-select__placeholder {
    font-size: 12px;
}

.v-select--single .v-select__tag {
    border: 0;
    background-color: #fff;
    padding: 0;
}

.drop-appear,.drop-enter-active {
    opacity:0;
    animation-duration:.3s;
    animation-name: dropIn;
    animation-timing-function:ease-in-out
}
.drop-leave-active{
    animation-duration:.3s;
    animation-name: dropOut;
    animation-timing-function:ease-in-out
}

@keyframes dropIn{
    0%{
        opacity:0;
        -webkit-transform:scaleY(.8);
        transform:scaleY(.8);
    }
    100%{
        opacity:1;
        -webkit-transform:scaleY(1);
        transform:scaleY(1);
    }
}

@keyframes dropOut{
    0%{
        opacity:1;
        transform:scaleY(1);
    }
    100%{
        opacity:0;
        transform:scaleY(.8);
    }
}
</style>
