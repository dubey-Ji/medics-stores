import { process as calculateTabletsRemaining } from "./calculate-tablets-remaining.js";

export const app = {};
app.engines = {};

// register your engines here
app.engines.calculateTabletsRemaining = calculateTabletsRemaining;
