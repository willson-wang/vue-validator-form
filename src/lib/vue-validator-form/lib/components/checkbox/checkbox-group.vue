<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Emitter from '../../utils/emitter'
import { findComponentsDownward } from '../../utils/find'

export default {
    name: 'vCheckboxGroup',
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
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
        change (data) {
            this.currentValue = data
            this.$emit('input', data)
            this.$emit('on-change', data)
            this.dispatch('vFormItem', 'on-form-change', data)
        },
        updateValue (update) {
            this.childrens = findComponentsDownward(this, 'vCheckbox')
            if (this.childrens) {
                const { value } = this
                this.childrens.forEach(child => {
                    child.model = value

                    if (update) {
                        child.currentValue = value.indexOf(child.label) > -1
                        child.group = true
                    }
                })
            }
        }
    },
    mounted () {
        this.updateValue(true)
    }
}
</script>

<style scoped>

</style>
