import { useState } from "react";
import { generateGrid } from "../services/gameOfLife";

export const useGameOfLife = () => {
  const [grid, setGrid] = useState(generateGrid(10));

  return {
    // isPlaying,
    grid,
    // actions: {
    //   next,
    //   togglePlay,
    //   toggleCell,
    // },
    config: {
      alive: "🧛‍♂️",
      dead: "💀",
    },
    // iterations,
  };
};
