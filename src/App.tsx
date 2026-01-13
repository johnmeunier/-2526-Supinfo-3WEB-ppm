import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { GameOfLife } from "@components/GameOfLife";

function App() {
  return (
    <main>
      <Header />
      <div className="app">
        <GameOfLife />
      </div>
      <Footer />
    </main>
  );
}

export default App;
