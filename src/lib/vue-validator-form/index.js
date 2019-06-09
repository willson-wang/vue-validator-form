import vForm from './lib/components/form/form.vue'
import vFormItem from './lib/components/form/form-item.vue'
import vInput from './lib/components/input/input.vue'
import vCheckbox from './lib/components/checkbox/checkbox.vue'
import vCheckboxGroup from './lib/components/checkbox/checkbox-group.vue'
import vRadio from './lib/components/radio/radio.vue'
import vRadioGroup from './lib/components/radio/radio-group.vue'
import vSwitch from './lib/components/switch/switch'
import vSelect from './lib/components/select/select'
import vSelectOption from './lib/components/select/select-option'

const components = {
    vForm,
    vFormItem,
    vInput,
    vCheckbox,
    vCheckboxGroup,
    vRadio,
    vRadioGroup,
    vSwitch,
    vSelect,
    vSelectOption
}

const install = function (Vue) {
    if (install.installed) return
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}

export default install
