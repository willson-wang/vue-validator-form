<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/find'
import Emitter from '../../utils/emitter'

export default {
    name: 'vRadioGroup',
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            currentValue: this.value,
            childrens: []
        }
    },
    mixins: [Emitter],
    watch: {
        value () {
            this.updateValue(true)
        }
    },
    methods: {
        change (val) {
            this.currentValue = val
            this.$emit('input', val)
            this.$emit('on-change', val)
            this.dispatch('vFormItem', 'on-form-change', val)
        },
        updateValue (update) {
            this.childrens = findComponentsDownward(this, 'vRadio')
            const { value } = this
            this.childrens.forEach(child => {
                child.model = value

                if (update) {
                    child.currentValue = value
                    child.group = true
                }
            })
        }
    },
    mounted () {
        this.updateValue(true)
    }
}
</script>

<style scoped>

</style>
