export default function(kind: string) {
    const selection = ref<any>(null)
    const { pending: ratingsPending, ratings } = useRatings(false)
    const { pending: namesPending, names } = useAll(kind)
    const spec = ref<any>(null)

    watch(ratingsPending, () => {
        spec.value = toRaw(useBeeswarmPlot(
            useRatingsUngrouped(ratings),
            {
                width: 800,
                height: 300,
            },
        ))
    })

    watch(selection, () => {
        if (selection.value === null) return

        const { pending, ratings } = useRatingsSelect(kind, selection.value)

        watch(pending, () => {
            spec.value = toRaw(useBeeswarmPlot(
                useRatingsUngrouped(ratings),
                {
                    width: 800,
                    height: 300,
                },
            ))
        })
    })

    return {
        selection,
        ratingsPending,
        namesPending,
        spec,
        names,
    }
}
