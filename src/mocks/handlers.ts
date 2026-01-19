// src/mocks/handlers.ts
import { http, HttpResponse, delay } from "msw";
import mock from "./fixtures/getMock.json";
import pokemon from "./fixtures/getPokemon.json";
import { config } from "@/services/config";

export const handlers = {
  getMock200: http.get(`${config.BASE_API_URL}/mock`, async () => {
    await delay(1000);
    return HttpResponse.json(mock);
  }),
  getMock500: http.get(`${config.BASE_API_URL}/mock`, async () => {
    await delay(1000);
    return HttpResponse.json({ error: "message d'erreur" }, { status: 500 });
  }),
  getPokemon200: http.get(`${config.BASE_API_URL}`, async ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset")) || 0;
    const limit = Number(url.searchParams.get("limit")) || 20;
    const nextUrl = `${config.BASE_API_URL}?offset=${offset + limit}&limit=${limit}`;
    const previousUrl = offset - limit >= 0 ? `${config.BASE_API_URL}?offset=${offset - limit}&limit=${limit}` : null;
    await delay(1000);
    return HttpResponse.json({
      next: nextUrl,
      previous: previousUrl,
      count: pokemon.results.length,
      results: pokemon.results.slice(offset, offset + limit),
    });
  }),
};
