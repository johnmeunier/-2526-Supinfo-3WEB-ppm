import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { useGameOfLife } from "@/hooks/useGameOfLife";

function App() {
  const { grid, config, actions, iterations } = useGameOfLife();

  return (
    <main>
      <Header />
      <div className="app">
        {grid.map((line, index_x) => (
          <div className="line" key={index_x}>
            {line.map((cell, index_y) => (
              <span onClick={() => actions.toggleCell(index_x, index_y)} className="cell" key={index_y}>
                {cell ? config.alive : config.dead}
              </span>
            ))}
          </div>
        ))}
        <button onClick={actions.next}>Step #{iterations}</button>
      </div>
      <Footer />
    </main>
  );
}

export default App;
