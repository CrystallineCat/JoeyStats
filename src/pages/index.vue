<template lang="pug">
p(v-if="pending") Loading...
section(v-else)
    h2 Distribution
    Vega(:spec="spec1")
    h2 Versus
    h3 Amy vs. Maggie
    Vega(:spec="spec4")
    h3 All vs. BGG
    Vega(:spec="spec5")
</template>

<script setup lang="ts">
const { pending, ratings } = useRatings()

const spec1 = useBeeswarmPlot(
    useRatingsUngrouped(ratings),
    {
        width: 800,
        height: 300,
    },
)

const spec4 = useScatterPlot(
    ratings,
    "amy",
    "maggie",
    "game",
    250,
    {
        width: 600,
        height: 600,
    },
)

const spec5 = computed(
    () => ({
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 600,
        height: 200,
        repeat: ["average", "amy", "maggie"],
        spec: useScatterPlot(
            ratings,
            {repeat: "repeat"},
            "bgg",
            "game",
            100,
        ).value,
    })
)
</script>

<style scoped lang="stylus">
.vega
    display block
    margin 0.5rem

h2
    font-size 125%
    border-bottom 1px solid #00f
    margin 1rem 0 0.5rem

h3
    margin 1rem 0 0
</style>
