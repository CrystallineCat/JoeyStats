export default function(ratings: any) {
    return computed(
        () => ratings.value.flatMap((each: any) => [
            {
                game:       each.game,
                rater:      "Amy",
                rating:     each.amy,
                included:   each.included,
            },
            {
                game:       each.game,
                rater:      "Maggie",
                rating:     each.maggie,
                included:   each.included,
            },
            {
                game:       each.game,
                rater:      "Both",
                rating:     each.average,
                included:   each.included,
            },
            {
                game:       each.game,
                rater:      "BGG",
                rating:     each.bgg,
                included:   each.included,
            },
        ])
    )
}
