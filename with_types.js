"use strict";

import { allPokemons } from "./js/all.js";
import { pokemons } from "./js/pokemons.js";

const getPokemonById = (id) => {
  console.log("by id " + id);
  if (id > 890) {
    return null;
  }
  for (const ap of allPokemons) {
    if (ap.no === id) {
      return ap;
    }
  }
  return null;
};

const getPokemonByName = (name) => {
  console.log("by name " + name);
  for (const ap of allPokemons) {
    if (ap.name === name) {
      return ap;
    }
  }
  return null;
};

(function () {
  for (let i = 0; i < pokemons.length; i++) {
    let p = pokemons[i];
    let ap = null;
    if (!p.id.includes("-")) {
      ap = getPokemonById(parseInt(p.id));
    } else if (p.name.includes("（キョダイマックスのすがた）")) {
      ap = getPokemonById(parseInt(p.id));
    } else if (
      p.name.includes("（アローラのすがた）") ||
      p.name.includes("（ガラルのすがた）")
    ) {
      let name = p.name;
      name = name.substring(0, name.indexOf("（"));
      name += p.id.substring(p.id.indexOf("-"));
      ap = getPokemonByName(name);
    } else if (p.name.startsWith("メガ")) {
      let name = p.name;
      name = name.replace("メガ", "");
      if (name.endsWith("Ｘ")) {
        name = name.replace("Ｘ", "-1");
      } else if (name.endsWith("Ｙ")) {
        name = name.replace("Ｙ", "-2");
      } else {
        name += "-1";
      }
      ap = getPokemonByName(name);
    }
    if (ap != null) {
      p.types = ap.types;
      if (!p.name.includes("キョダイマックス")) {
        p.height = ap.height;
        p.weight = ap.weight;
      }
    } else {
      console.log("not found " + p.name);
    }
  }
  console.log(JSON.stringify(pokemons));
})();
