function dispatch (name, event, data) {
    let parent = this.$parent || this.$root
    let componentName = parent.$options.name
    while (parent && (!componentName || componentName !== name)) {
        parent = parent.$parent

        if (parent) {
            componentName = parent.$options.name
        }
    }

    if (parent) {
        this.$emit.apply(parent, [event, data])
    }
}

function broadcast (name, event, data) {
    const children = this.$children
    children.forEach(child => {
        if (child.$options.name === name) {
            this.$emit.apply(child, [event, data])
        } else {
            broadcast.apply(child, [name, event, data])
        }
    })
}

export default {
    methods: {
        // 向父级派发事件
        dispatch,
        // 向子级广播事件
        broadcast
    }
}
