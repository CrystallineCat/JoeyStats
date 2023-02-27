import { ComputedVariable } from "vue/macros"

export default function(
    data: ComputedVariable<object>,
    clauses: object = {},
) {
    return computed(() => ({
        ...clauses,
        $schema: "https://vega.github.io/schema/vega/v5.json",
        data: [
            {
                name: "data",
                values: data,
            },
        ],
        scales: [
            {
                name: "xscale",
                domain: {
                    data: "data",
                    field: "rating",
                },
                range: "width",
                zero: false,
            },
            {
                name: "yscale",
                type: "band",
                domain: {
                    data: "data",
                    field: "rater",
                },
                range: "height",
            },
        ],
        axes: [
            {
                orient: "bottom",
                scale: "xscale",
            },
            {
                orient: "left",
                scale: "yscale",
            },
        ],
        marks: [
            {
                name: "nodes",
                type: "symbol",
                from: {data: "data"},
                encode: {
                    enter: {
                        fill: {signal: "datum.included ? 'steelblue' : 'lightgrey'"},
                        size: {value: 100},
                        xfocus: {scale: "xscale", field: "rating"},
                        yfocus: {scale: "yscale", field: "rater", band: 0.5},
                        tooltip: {field: "game"},
                    },
                },
                transform: [
                    {
                        type: "force",
                        iterations: 300,
                        static: true,
                        forces: [
                            {force: "collide", iterations: 1, radius: 6},
                            {force: "x", x: "xfocus", strength: 0.2},
                            {force: "y", y: "yfocus", strength: 0.1},
                        ],
                    },
                ],
            },
        ],
    }))
}
