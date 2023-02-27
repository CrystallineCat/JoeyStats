export default function(kind: string, name: string) {
    const { pending, data } = useQuery(`
        MATCH (rating:Rating)-[:OF]->(game:Boardgame)
        OPTIONAL MATCH (game)-[:HAS]->(tag:${kind})
        WHERE tag.name = '${name.replaceAll("\\", "\\\\").replaceAll("'", "\\'")}'
        RETURN rating, game, tag
    `)

    const ratings = computed(
        () => (data.value?.data ?? []).map((each: any) => ({
            game:       each.game.properties.name,
            bgg:        each.game.properties.bgg_rating,
            amy:        each.rating.properties.Amy,
            maggie:     each.rating.properties.Maggie,
            average:    (each.rating.properties.Amy + each.rating.properties.Maggie) / 2,
            included:   each.tag !== null,
        }))
    )

    return {
        pending,
        ratings,
    }
}
