export default function(query: string) {
    const config = useRuntimeConfig()
    const reply = useLazyAsyncData(query, () => $fetch(config.public.redisApi, { method: "post", body: query }))

    watchEffect(
        () => {
            // @ts-ignore
            if (reply.data.value?.error) {
                // @ts-ignore
                throw new Error(`${reply.data.value.error}\n${query}`)
            }
        }
    )

    return reply
}
