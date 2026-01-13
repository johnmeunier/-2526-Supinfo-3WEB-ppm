import { useCallback, useEffect, useState } from "react";
import { generateGrid, nextGrid } from "@/services/gameOfLife";

export const useGameOfLife = ({ size }: { size: number }) => {
  const [grid, setGrid] = useState(generateGrid(size));
  const [iterations, setIterations] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const next = useCallback(() => {
    setIterations((prev) => prev + 1);
    setGrid((prev) => nextGrid(prev));
  }, []);

  const togglePlay = useCallback(() => setIsPlaying((prev) => !prev), []);

  const toggleCell = useCallback((x: number, y: number) => {
    setGrid((prev) => {
      const newgrid = structuredClone(prev);
      newgrid[x][y] = !newgrid[x][y];
      return newgrid;
    });
  }, []);

  useEffect(() => {
    setGrid(generateGrid(size));
    setIterations(0);
  }, [size]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(next, 200);
    return () => clearInterval(id);
  }, [isPlaying, next]);

  return {
    isPlaying,
    grid,
    actions: {
      next,
      togglePlay,
      toggleCell,
    },
    config: {
      alive: "🧛‍♂️",
      dead: "💀",
    },
    iterations,
  };
};
