import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

import { GameOfLifePage } from "@pages/GameOfLife";
import { PokedexPage } from "@pages/Pokedex";
import { PokemonPage } from "@pages/Pokemon";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <Router>
      <main>
        <Header />
        <div className="router">
          <Routes>
            <Route path="/" element={<Navigate to="/pokedex" replace />} />
            <Route path="/pokedex" element={<PokedexPage />} />
            <Route path="/pokemon" element={<PokemonPage />} />
            <Route path="/game-of-life" element={<GameOfLifePage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
