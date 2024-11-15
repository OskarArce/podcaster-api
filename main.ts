import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Podcaster BFF!");
});

app.get("/favorites", async (c) => {
  const response = await fetch(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json?"
  );
  const favorites = await response.json();
  return c.json(favorites, 200);
});

app.get(`/podcast/:podcastId`, async (c) => {
  const podcastId = c.req.param("podcastId");
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
  );
  const podcast = await response.json();
  return c.json(podcast, 200);
});

Deno.serve(app.fetch);
