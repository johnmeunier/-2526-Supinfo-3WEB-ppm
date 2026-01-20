import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAtom } from "jotai";
import { userAtom } from "@/services/store";
import { config } from "@/services/config";

const fetchPokemons = async (urlToFetch: string) => {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Failed to fetch pokemons");
};

interface Pokemon {
  name: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

export const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { name } = useParams();
  const [user] = useAtom(userAtom);
  useEffect(() => {
    fetchPokemons(`${config.BASE_API_URL}/${name}`)
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch pokemon");
      });
  }, [name]);
  if (error) {
    return <p>{error}</p>;
  }
  return pokemon ? (
    <>
      <h2>
        {pokemon.name} {pokemon.types.find((typeInfo) => typeInfo.type.name === user?.type) && "❤️"}
      </h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div>
        <h3>Types</h3>
        <ul>
          {pokemon.types &&
            pokemon.types.map((typeInfo: PokemonType) => <li key={typeInfo.type.name}>{typeInfo.type.name}</li>)}
        </ul>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};
