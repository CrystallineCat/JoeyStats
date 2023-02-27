import { createClient, Graph } from "redis"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = await readBody(event)
    const client = createClient({
        url: "redis://redis-10125.c284.us-east1-2.gce.cloud.redislabs.com:10125",
        username: "default",
        password: config.redisPassword,
    })

    let reply: any = {}

    try {
        await client.connect()

        const graph = new Graph(client, "Joey")

        reply = await graph.roQuery(query)

        await client.disconnect()
    }
    catch (error: any) {
        return {error: error.message}
    }

    return reply
})
