export default defineNuxtConfig({
    ssr: false,
    srcDir: 'src/',
    modules: ['@vuestic/nuxt'],
    runtimeConfig: {
        redisPassword: '',
        public: {
            redisApi: '',
        },
    },
    vuestic: {
        config: {
        },
    },
})
