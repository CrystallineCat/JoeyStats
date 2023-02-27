export default function(kind: string) {
    const { pending, data } = useQuery(`
        MATCH (all:${kind})
        OPTIONAL MATCH (game:Boardgame)-[:HAS]->(all) 
        RETURN all.name AS name, COUNT(game) AS count
        ORDER BY count DESC, name ASC
    `)

    const names = computed(
        () => (data.value?.data ?? []).map((each: any) => ({
            name:   each.name,
            count:  each.count,
        }))
    )

    return {
        pending,
        names,
    }
}
