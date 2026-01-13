import { useCallback, useState } from "react";
import { generateGrid, nextGrid } from "@/services/gameOfLife";

export const useGameOfLife = () => {
  const [grid, setGrid] = useState(generateGrid(10));
  const next = useCallback(() => {
    setGrid((prev) => nextGrid(prev));
  }, []);
  return {
    // isPlaying,
    grid,
    actions: {
      next,

      //   togglePlay,
      //   toggleCell,
    },
    config: {
      alive: "🧛‍♂️",
      dead: "💀",
    },
    // iterations,
  };
};
