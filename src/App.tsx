import { useState } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { useGameOfLife } from "@/hooks/useGameOfLife";

function App() {
  const [size, setSize] = useState(10);

  const { grid, config, actions, iterations, isPlaying } = useGameOfLife({ size });

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
        <button onClick={actions.togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={actions.next}>Step #{iterations}</button>
        <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
      </div>
      <Footer />
    </main>
  );
}

export default App;
