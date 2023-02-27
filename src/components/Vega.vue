<template lang="pug">
div.vega(ref="el")
p(v-if="error") {{error}}
</template>

<script setup lang="ts">
import { useVega } from "vue-vega"

const props = defineProps(["spec"])
const el = ref(null)
const error = ref<Error|null>(null)

function doRender() {
    const spec = isRef(props.spec) ? props.spec.value : props.spec

    if (!spec) return
    if (!el.value) return

    const { render } = useVega({
        el,
        spec: spec,
        embedOptions: {
            actions: false,
        },
        onError: (e) => {
            console.log(e)
            error.value = e
        },
    })

    render()
}

onMounted(doRender)
watchEffect(doRender)
</script>

<style scoped lang="stylus">
</style>
