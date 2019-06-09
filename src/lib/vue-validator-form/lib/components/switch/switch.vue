<template>
    <label class="v-switch" :class="[currentValue && 'activated', disabled && 'disabled']">
        <span class="v-switch__label">
            <input
                type="checkbox"
                :checked="currentValue"
                :disabled="disabled"
                @change="handleChange"
             >
        </span>
        <span class="v-switch__inner">
            <slot v-if="currentValue" name="close"></slot>
            <slot v-else name="open"></slot>
        </span>
    </label>
</template>

<script>
import Emitter from '../../utils/emitter'

export default {
    name: 'vSwitch',
    props: {
        value: {
            type: [String, Number, Boolean]
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentValue: this.value
        }
    },
    mixins: [Emitter],
    watch: {
        value (val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateValue()
            } else {
                throw new Error('value 的值需要是trueValue or falseValue')
            }
        }
    },
    methods: {
        updateValue () {
            this.currentValue = this.value === this.trueValue
        },
        handleChange (e) {
            const checked = e.target.checked
            this.currentValue = checked

            const value = checked ? this.trueValue : this.falseValue

            this.$emit('input', value)
            this.$emit('on-change', value)
            this.dispatch('vFormItem', 'on-form-change', value)
        }
    },
    mounted () {
        console.log('this', this.trueValue, this.falseValue)
    }
}
</script>

<style scoped>
.v-switch {
    display: inline-block;
    position: relative;
    width: 44px;
    height: 22px;
    line-height: 20px;
    border-radius: 22px;
    vertical-align: middle;
    border: 1px solid #ccc;
    background-color: #ccc;
    position: relative;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
}

.v-switch input {
    width: 0;
    height: 0;
    margin: 0;
    -webkit-appearance: none;
}

.v-switch::after {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 50%;
    transition: all .2s ease-in-out;
}

.activated {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
}

.v-switch.activated::after {
    left: 24px;
}

.v-switch__inner {
    position: absolute;
    left: 20px;
    color: #fff;
    font-size: 12px;
}

.v-switch.activated .v-switch__inner {
    left: 4px;
}

.disabled {
    cursor: not-allowed;
    opacity: .4;
}
</style>
