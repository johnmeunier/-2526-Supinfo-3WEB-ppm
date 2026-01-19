import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useDebounce } from "use-debounce";
import { config } from "@/services/config";

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
  const [search, setSearch] = useState("");
  const [urlToFetch, setUrlToFetch] = useState(config.BASE_API_URL);
  const [searchdebounce] = useDebounce(search, 1000);

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
      {limit === count && (
        <input type="text" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      )}
      {limit === count && searchdebounce !== "" && (
        <ul>
          {pokemons
            .filter((pokemon: { name: string; url: string }) => pokemon.name.includes(searchdebounce))
            .map((pokemon: { name: string; url: string }) => (
              <li key={pokemon.name}>
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              </li>
            ))}
        </ul>
      )}
      {limit !== count && (
        <ul>
          {pokemons.map((pokemon: { name: string; url: string }) => (
            <li key={pokemon.name}>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
