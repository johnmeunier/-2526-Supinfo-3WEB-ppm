import { useState, useEffect } from "react";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemons = async (urlToFetch: string) => {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Failed to fetch pokemons");
};

export const PokedexPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [limit, setLimit] = useState(20);
  const [count, setCount] = useState(null);
  const [urlToFetch, setUrlToFetch] = useState(POKEMON_API_URL);

  useEffect(() => {
    const url = new URL(urlToFetch);
    url.searchParams.set("limit", limit.toString());
    fetchPokemons(url.toString())
      .then((data) => {
        setNext(data.next);
        setCount(data.count);
        setPrevious(data.previous);
        setPokemons(data.results);
      })
      .catch((error) => console.error(error));
  }, [urlToFetch, limit]);

  return (
    <div>
      <button onClick={() => setUrlToFetch(previous!)} disabled={!previous}>
        Précédent
      </button>
      <button onClick={() => setUrlToFetch(next!)} disabled={!next}>
        Suivant
      </button>
      <select name="limit" id="limit" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={count || 0}>all</option>
      </select>
      <ul>
        {pokemons.map((pokemon: { name: string; url: string }) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};
