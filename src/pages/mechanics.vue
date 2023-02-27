<template lang="pug">
section
    va-select(
        :loading="namesPending"
        v-model="selection"
        :options="names"
        :text-by="(option) => `${option.name} (${option.count})`"
        :value-by="(option) => option.name"
        searchable
        highlight-matched-text
        label="Mechanic"
    )
        template(#prependInner)
            va-icon(name="settings")
section
    p(v-if="ratingsPending") Loading...
    Vega(v-else :spec="spec")
</template>

<script setup lang="ts">
const {
    selection,
    ratingsPending,
    namesPending,
    spec,
    names,
} = useSelectionPlot("Mechanic")
</script>

<style scoped lang="stylus">
</style>
