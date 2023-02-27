export default function(included: boolean = true) {
    const { pending, data } = useQuery(`
        MATCH (rating:Rating)-[:OF]->(game:Boardgame)
        RETURN rating, game
    `)

    const ratings = computed(
        () => (data.value?.data ?? []).map((each: any) => ({
            game:       each.game.properties.name,
            bgg:        each.game.properties.bgg_rating,
            amy:        each.rating.properties.Amy,
            maggie:     each.rating.properties.Maggie,
            average:    (each.rating.properties.Amy + each.rating.properties.Maggie) / 2,
            included,
        }))
    )

    return {
        pending,
        ratings,
    }
}
