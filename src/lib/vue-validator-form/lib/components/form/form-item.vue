<template>
    <div>
        <label v-if="label" :class="[isRequired && 'label-required']">{{label}}</label>
        <div>
            <slot></slot>
            <div v-if="validateMessage">{{validateMessage}}</div>
        </div>
    </div>
</template>

<script>
import Emitter from '../../utils/emitter'

export default {
    name: 'vFormItem',
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String
        }
    },
    inject: ['form'],
    mixins: [Emitter],
    data () {
        return {
            isRequired: false,
            validateState: '',
            validateMessage: ''
        }
    },
    computed: {
        fieldValue () {
            return this.form.model[this.prop]
        }
    },
    methods: {
        setRules () {
            let rules = this.getRules()
            rules.forEach((rule = {}) => {
                this.isRequired = rule.required
            })
            this.$on('on-form-change', this.onFieldChange)
            this.$on('on-form-blur', this.onFieldBlur)
        },
        onFieldChange () {
            this.validate('change')
        },
        onFieldBlur () {
            this.validate('blur')
        },
        getRules () {
            let formRules = this.form.rules
            formRules = formRules ? formRules[this.prop] : []
            return [].concat(formRules)
        },
        getFilterRules (trigger) {
            const rules = this.getRules()
            return rules.filter(rule => rule.trigger.indexOf(trigger) > -1)
        },
        validate (trigger, callback = function () {}) {
            let rules = this.getFilterRules(trigger)
            if (!rules.length) {
                return true
            }

            this.validating = true

            const Schema = require('async-validator').default
            const descriptor = {}
            descriptor[this.prop] = rules
            var validator = new Schema(descriptor)
            let model = {}
            model[this.prop] = this.fieldValue

            validator.validate(model, {firstFields: true}, (errors, fields) => {
                this.validateState = !errors ? 'success' : 'error'
                this.validateMessage = errors ? errors[0].message : ''

                callback(this.validateMessage)
            })
        },
        resetField () {
            this.validateState = ''
            this.validateMessage = ''
            this.form.model[this.prop] = this.initFieldValue
        }
    },
    mounted () {
        if (this.prop) {
            this.initFieldValue = this.fieldValue
            this.dispatch('vForm', 'on-form-item-add', this)
            this.setRules()
        }
    },
    beforeDestroy () {
        if (this.prop) {
            this.dispatch('vForm', 'on-form-item-remove', this)
        }
    }
}
</script>

<style scoped>

</style>
