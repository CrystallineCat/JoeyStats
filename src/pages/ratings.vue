<template lang="pug">
p(v-if="pending") Loading...
section(v-else)
    va-data-table(:items="items" :columns="columns" :per-page="20" :current-page="currentPage" hoverable striped)
    va-pagination(v-model="currentPage" :pages="2")
</template>

<script setup lang="ts">
const { pending, ratings } = useRatings()

const currentPage = ref(1)

const columns = [
    { key: "name",              sortable: true, tdStyle: { fontWeight: "bold"} },
    { key: "amy_percentile",    sortable: false, tdAlign: "right",  thAlign: "center", label: "A %" },
    { key: "amy",               sortable: true,  tdAlign: "center", thAlign: "center" },
    { key: "difference",        sortable: true,  tdAlign: "center", thAlign: "center", label: "Δ" },
    { key: "maggie",            sortable: true,  tdAlign: "center", thAlign: "center" },
    { key: "maggie_percentile", sortable: false, tdAlign: "right",  thAlign: "center", label: "M %" },
    { key: "percentile",        sortable: false, tdAlign: "right",  thAlign: "center", label: "%" },
    { key: "rating",            sortable: true,  tdAlign: "center", thAlign: "center", label: "Ø", tdStyle: { fontWeight: "900"} },
    { key: "bgg_difference",    sortable: true,  tdAlign: "right",  thAlign: "center", label: "Δ" },
    { key: "bgg",               sortable: true,  tdAlign: "center", thAlign: "center", label: "BGG" },
]

const percentile = (each: any, p: any) =>
    ratings.value.filter(
        (that) => p(that) <= p(each)
    ).length / ratings.value.length * 100

const items = computed(
    () => ratings.value.map((each) => ({
        name:               each.game,
        bgg:                each.bgg.toFixed(2),
        amy:                each.amy.toFixed(1),
        maggie:             each.maggie.toFixed(1),
        rating:             each.average.toFixed(2),
        difference:         Math.abs(each.amy - each.maggie).toFixed(1),
        bgg_difference:     ((each.amy + each.maggie) / 2 - each.bgg).toFixed(2).replace(/^/, "+").replace("+-", "−"),
        percentile:         percentile(each, (that: any) => that.amy + that.maggie).toFixed(0) + "%",
        amy_percentile:     percentile(each, (that: any) => that.amy).toFixed(0) + "%",
        maggie_percentile:  percentile(each, (that: any) => that.maggie).toFixed(0) + "%",
    })),
)
</script>

<style scoped lang="stylus">
nav
    width max-content
    margin 0.5rem auto
</style>
