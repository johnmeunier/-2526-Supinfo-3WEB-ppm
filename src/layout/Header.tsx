import { useAtom } from "jotai";
import { Link } from "react-router";
import { userAtom } from "@/services/store";
import ThemeToggle from "@/components/ThemeToggle";

const titles: Record<string, string> = {
  pokedex: "Pokedex",
  gameoflife: "Game of Life",
  pokemon: "Pokemon Detail",
};

const Header = () => {
  const title = titles[window.location.pathname.substring(1)];

  const [user] = useAtom(userAtom);

  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Supinfo - 2526 - 3WEB</h1>
          <h2>{title}</h2>
          {user ? (
            <p>
              Logged in as: {user.firstname} {user.lastname} ({user.type} type)
            </p>
          ) : (
            "Authenticating..."
          )}
        </div>
        <ThemeToggle />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/pokedex">Pokedex</Link>
          </li>
          <li>
            <Link to="/gameoflife">Game of Life</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
