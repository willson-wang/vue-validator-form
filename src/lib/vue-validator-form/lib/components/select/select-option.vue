<template>
    <li @click.stop="selectItem" class="v-select__item" :class="[isSelected && 'selected']">
        <slot></slot>
    </li>
</template>

<script>
import Emitter from '../../utils/emitter'

export default {
    name: 'vSelectOption',
    props: {
        value: {
            type: [String, Number]
        },
        label: {
            type: [String, Number],
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        showLabel () {
            return this.label ? this.label : this.value
        }
    },
    data () {
        return {
            isSelected: false
        }
    },
    mixins: [Emitter],
    methods: {
        selectItem () {
            if (this.disabled) return
            this.dispatch('vSelect', 'on-select-selected', {
                value: this.value,
                label: this.showLabel
            })

            this.$emit('on-select-selected', {
                value: this.value,
                label: this.showLabel
            })
        }
    }
}
</script>

<style scoped>
.v-select__item {
    width: 100%;
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #515a6e;
    font-size: 12px;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
    box-sizing: border-box;
}

.v-select__item:hover {
    background: #f3f3f3;
}

.selected {
    color: #2d8cf0;
}
</style>
