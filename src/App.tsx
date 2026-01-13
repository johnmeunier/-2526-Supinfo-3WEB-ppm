import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { useGameOfLife } from "./hooks/useGameOfLife";

function App() {
  const { grid, config } = useGameOfLife();

  return (
    <main>
      <Header />
      <div className="app">
        {grid.map((line, index) => (
          <div className="line" key={index}>
            {line.map((cell, index) => (
              <span className="cell" key={index}>
                {cell ? config.alive : config.dead}
              </span>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}

export default App;
