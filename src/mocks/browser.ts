// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

const currentMockListOk = [handlers.getMock200, handlers.getPokemon200];

const currentMockListKO = [handlers.getMock500];

export const worker = setupWorker(...currentMockListOk);
