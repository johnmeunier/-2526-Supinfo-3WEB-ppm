import { atom } from "jotai";

export const userAtom = atom<{
  id: string;
  firstname: string;
  lastname: string;
  type: "electric" | "fire" | "water" | "grass" | "poison";
} | null>(null);
