import { useCallback, useState } from "react";
import { generateGrid, nextGrid } from "@/services/gameOfLife";

export const useGameOfLife = () => {
  const [grid, setGrid] = useState(generateGrid(10));
  const [iterations, setItrations] = useState(0);

  const next = useCallback(() => {
    setItrations((prev) => prev + 1);
    setGrid((prev) => nextGrid(prev));
  }, []);

  const toggleCell = useCallback((x: number, y: number) => {
    setGrid((prev) => {
      const newgrid = structuredClone(prev);
      newgrid[x][y] = !newgrid[x][y];
      return newgrid;
    });
  }, []);

  return {
    // isPlaying,
    grid,
    actions: {
      next,

      //   togglePlay,
      toggleCell,
    },
    config: {
      alive: "🧛‍♂️",
      dead: "💀",
    },
    iterations,
  };
};
