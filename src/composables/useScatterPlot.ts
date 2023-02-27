import { ComputedVariable } from "vue/macros"

export default function(
    data: ComputedVariable<object>,
    x: any,
    y: any,
    tooltip: string,
    size: number,
    clauses: object = {},
) {
    return computed(
        () => ({
            ...clauses,
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            mark: "circle",
            data: {
                values: data,
            },
            encoding: {
                x: {
                    field: x,
                    type: "quantitative",
                    axis: {labelAngle: 0},
                    scale: {zero: false},
                },
                y: {
                    field: y,
                    type: "quantitative",
                    scale: {zero: false},
                },
                tooltip: {
                    field: tooltip,
                    type: "nominal",
                },
                size: {
                    value: size,
                },
            },
        })
    )
}
