<template>
    <label>
        <span>
            <input
                v-if="group"
                type="radio"
                :disabled="disabled"
                @change="handleChange"
                :value="label"
                v-model="model"
            >
            <input
                v-else
                type="radio"
                :checked="currentValue"
                :disabled="disabled"
                @change="handleChange"
                >
        </span>
        <slot></slot>
    </label>
</template>

<script>
import Emitter from '../../utils/emitter'
import { findComponentUpward } from '../../utils/find'

export default {
    name: 'vRadio',
    props: {
        value: {
            type: [String, Number, Boolean]
        },
        trueValue: {
            type: [String, Number, Boolean]
        },
        falseValue: {
            type: [String, Number, Boolean]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: [String, Number, Boolean]
        }
    },
    data () {
        return {
            currentValue: this.value,
            group: false,
            parent: null,
            model: ''
        }
    },
    mixins: [Emitter],
    watch: {
        value (val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateValue()
            } else {
                throw new Error('value 的值必须是trueValue or falseValue')
            }
        }
    },
    methods: {
        handleChange (e) {
            const checked = e.target.checked
            this.currentValue = checked
            const value = checked ? this.trueValue : this.falseValue
            this.$emit('input', value)
            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.dispatch('vFormItem', 'on-form-change', value)
                this.$emit('on-change', value)
            }
        },
        updateValue () {
            this.currentValue = this.value === this.trueValue
        }
    },
    mounted () {
        this.parent = findComponentUpward(this, 'vRadioGroup')

        if (this.parent) {
            this.group = true
        }

        if (this.group) {
            this.parent.updateValue(true)
        } else {
            this.updateValue()
        }
    }
}
</script>
