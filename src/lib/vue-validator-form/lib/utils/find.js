export function findComponentsDownward (context, componentName) {
    return context.$children.reduce((cur, child) => {
        if (child.$options.name === componentName) cur.push(child)
        const findChildrens = findComponentsDownward(child, componentName)
        return cur.concat(findChildrens)
    }, [])
}

export function findComponentUpward (context, componentName) {
    let parent = context.$parent || context.$root
    let name = parent.$options.name
    while (parent && (!name || componentName.indexOf(name)) === -1) {
        parent = parent.$parent

        if (parent) {
            name = parent.$options.name
        }
    }
    return name === componentName ? parent : null
}
