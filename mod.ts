export {};

import PkBase from "./structures/pkbase.ts";

const data = await Deno.readFile("./data/venus.pk6");

const eevee = new PkBase(data, 0, 3, false);

console.log("eevee?", eevee);
