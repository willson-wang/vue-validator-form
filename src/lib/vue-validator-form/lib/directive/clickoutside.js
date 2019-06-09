export default {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false
            }
            if (binding.expression) {
                binding.value(e)
            }
        }
        el.__clickoutsideHandler = documentHandler
        document.addEventListener('click', documentHandler)
    },
    unbind (el) {
        document.removeEventListener('click', el.__clickoutsideHandler)
        delete el.__clickoutsideHandler
    }
}
