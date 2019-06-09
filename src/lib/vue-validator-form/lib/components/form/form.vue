<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'vForm',
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        }
    },
    provide () {
        return {
            form: this
        }
    },
    data () {
        return {
            fields: []
        }
    },
    methods: {
        resetFields () {
            this.fields.forEach(field => {
                field.resetField()
            })
        },
        validate (callback = function () {}) {
            return new Promise((resolve, reject) => {
                let valid = true
                let count = 0
                console.log('validate', this.fields)
                this.fields.forEach(field => {
                    field.validate('', errors => {
                        if (errors) {
                            valid = false
                            reject(errors)
                            return
                        }
                        if (++count === this.fields.length) {
                            resolve(valid)
                            callback(valid)
                        }
                    })
                })
            })
        }
    },
    created () {
        this.$on('on-form-item-add', (field) => {
            field && this.fields.push(field)
        })
        this.$on('on-form-item-remove', (field) => {
            field.prop && this.fields.splice(this.fields.indexOf(field), 1)
        })
    }
}
</script>

<style scoped>

</style>
