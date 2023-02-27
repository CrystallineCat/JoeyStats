import { Handler } from '@netlify/functions'
import { createClient, Graph } from "redis"
import {Event} from "@netlify/functions/dist/function/event";

const useRuntimeConfig = () => ({
  redisPassword: process.env.NUXT_REDIS_PASSWORD,
})

const readBody = async (event: Event) => {
  return event.body
}

const callRedis = async (event: Event) => {
  const config = useRuntimeConfig()
  const query = await readBody(event)

  if (!query) {
    return {error: "no query"}
  }

  const client = createClient({
    url: "redis://redis-10125.c284.us-east1-2.gce.cloud.redislabs.com:10125",
    username: "default",
    password: config.redisPassword,
  })

  let reply: any = {}

  try {
    await client.connect()

    // @ts-ignore
    const graph = new Graph(client, "Joey")

    reply = await graph.roQuery(query)

    await client.disconnect()
  }
  catch (error: any) {
    return {error: error.message}
  }

  return reply
}

export const handler: Handler = async (event, _context) => {
  const response = await callRedis(event)

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(response),
  }
}

