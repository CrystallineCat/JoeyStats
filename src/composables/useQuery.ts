export default function(query: string) {
    const reply = useLazyAsyncData(query, () => $fetch("/api/redis", { method: "post", body: query }))

    watchEffect(
        () => {
            if (reply.data.value?.error) {
                throw new Error(`${reply.data.value.error}\n${query}`)
            }
        }
    )

    return reply
}
