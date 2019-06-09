<template>
    <label>
        <span>
            <input
                v-if="group"
                type="checkbox"
                :value="label"
                v-model="model"
                @change="handleChange"
                :disabled="disabled"
                >
            <input
                v-else
                type="checkbox"
                :checked="currentValue"
                @change="handleChange"
                :disabled="disabled"
                >
        </span>
        <slot></slot>
    </label>
</template>

<script>
import Emitter from '../../utils/emitter'
import { findComponentUpward } from '../../utils/find'

export default {
    name: 'vCheckbox',
    props: {
        value: {
            type: [String, Number, Boolean],
            default: false
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
        },
        label: {
            type: [String, Number, Boolean]
        }
    },
    data () {
        return {
            currentValue: this.value,
            model: [],
            group: false,
            parent: null
        }
    },
    mixins: [Emitter],
    methods: {
        handleChange (e) {
            if (this.disabled) {
                return
            }
            const checked = e.target.checked
            this.currentValue = checked
            const value = checked ? this.trueValue : this.falseValue
            this.$emit('input', value)

            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.$emit('on-change', value)
                this.dispatch('vFormItem', 'on-form-change', value)
            }
        },
        updateValue () {
            this.currentValue = this.value === this.trueValue
        }
    },
    watch: {
        value (val) {
            console.log('val', val)
            if (val === this.trueValue || val === this.falseValue) {
                this.updateValue()
            } else {
                throw new Error('Value必须是trueValue or falseValue')
            }
        }
    },
    mounted () {
        this.parent = findComponentUpward(this, 'vCheckboxGroup')

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

<style scoped>

</style>
