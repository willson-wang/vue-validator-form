<template>
    <input
        type="text"
        :value="currentValue"
        @input="handleInput"
        @blur="handleBlur"
    >
</template>

<script>
import Emitter from '../../utils/emitter'

export default {
    name: 'vInput',
    props: {
        value: {
            type: [String, Number]
        }
    },
    mixins: [Emitter],
    data () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value (val) {
            this.currentValue = val
        }
    },
    methods: {
        handleInput (e) {
            const value = e.target.value
            this.currentValue = value
            this.$emit('input', value)
            this.dispatch('vFormItem', 'on-form-change', value)
        },
        handleBlur () {
            this.dispatch('vFormItem', 'on-form-blur', this.currentValue)
        }
    }
}
</script>

<style scoped>

</style>
