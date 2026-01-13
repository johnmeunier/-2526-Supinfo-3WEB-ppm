import { useState, useEffect } from "react";

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
  const [urlToFetch, setUrlToFetch] = useState("https://pokeapi.co/api/v2/pokemon");

  useEffect(() => {
    fetchPokemons(urlToFetch)
      .then((data) => {
        setNext(data.next);
        setPrevious(data.previous);
        setPokemons(data.results);
      })
      .catch((error) => console.error(error));
  }, [urlToFetch]);

  return (
    <div>
      <button onClick={() => setUrlToFetch(previous!)} disabled={!previous}>
        Précédent
      </button>
      <button onClick={() => setUrlToFetch(next!)} disabled={!next}>
        Suivant
      </button>
      <ul>
        {pokemons.map((pokemon: { name: string; url: string }) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};
