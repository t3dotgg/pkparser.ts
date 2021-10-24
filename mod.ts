export {};

import {
  createPokemonStructFromPk6,
  createPokemonStructFromPk8,
} from "./structures/pkparser.ts";

const data = await Deno.readFile("./data/venus.pk6");

const custom = createPokemonStructFromPk6(data);

console.log("pk6 venusaur?", custom);

const eeveeFile = await Deno.readFile("./data/eevee.pk8");

const eevee = createPokemonStructFromPk8(eeveeFile);

console.log(eevee);

console.log("eevee?", eevee.species, eevee.ot);
