<template lang="pug">
article
    header
        h1 ThinkerThemer: Joey Stats

    nav#sidebar
        va-sidebar
            NuxtLink(v-for="page in pages" :to="page.url")
                va-sidebar-item(:active="route.path === page.url")
                    va-sidebar-item-content
                        va-icon(:name="page.icon")
                        va-sidebar-item-title {{page.name}}

    main
        slot
</template>

<script setup lang="ts">
const route = useRoute()
const pages = [
    {url: "/",              icon: "dashboard",  name: "Dashboard"},
    {url: "/ratings",       icon: "star",       name: "Ratings"},
    {url: "/categories",    icon: "category",   name: "Categories"},
    {url: "/mechanics",     icon: "settings",   name: "Mechanics"},
]
</script>

<style lang="stylus">
article
    display grid
    grid-template-columns auto 1fr

header
    grid-column span 2

h1
    font-size 200%
    padding 0.5rem 1rem
    background var(--va-background-element)

main
    margin 1rem

nav#sidebar
    height 100vh !important
</style>
