export default defineNuxtConfig({
    ssr: false,
    srcDir: 'src/',
    modules: ['@vuestic/nuxt'],
    runtimeConfig: {
        redisPassword: '',
    },
    vuestic: {
        config: {
        },
    },
})
