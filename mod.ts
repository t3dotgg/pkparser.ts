export {};

import { createPokemonStructFromPkx } from "./structures/pkparser.ts";

const data = await Deno.readFile("./data/venus.pk6");

const custom = createPokemonStructFromPkx(data);

console.log("eevee?", custom);
