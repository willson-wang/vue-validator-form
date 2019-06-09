<template>
    <ul class="v-select__drop">
        <slot></slot>
    </ul>
</template>

<script>
import Popper from 'popper.js'

export default {
    name: 'vSelectDrop',
    props: {
        placement: {
            type: String,
            default: 'bottom-start'
        }
    },
    data () {
        return {
            popper: null
        }
    },
    methods: {
        update () {
            if (this.popper) {
                this.$nextTick(() => {
                    this.popper.update()
                })
            } else {
                this.$nextTick(() => {
                    this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
                        placement: this.placement,
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false
                            },
                            preventOverflow: {
                                boundariesElement: 'window'
                            }
                        },
                        onCreate: () => {
                            this.resetTransformOrigin()
                            this.$nextTick(this.popper.update())
                        },
                        onUpdate: () => {
                            this.resetTransformOrigin()
                        }
                    })
                })
            }
        },
        resetTransformOrigin () {

        },
        destroy () {
            if (this.popper) {
                setTimeout(() => {
                    this.popper.destroy()
                    this.popper = null
                }, 100)
            }
        }
    },
    created () {
        this.$on('on-update-popper', this.update)
        this.$on('on-destroy-popper', this.destroy)
    },
    beforeDestroy () {
        if (this.popper) {
            this.popper.destroy()
        }
    }
}
</script>

<style scoped>
.v-select__drop {
    width: 100%;
    margin: 5px 0;
    padding: 5px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    overflow: auto;
}
</style>
