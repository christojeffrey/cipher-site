import { configSignal } from "$globalState";
import { Component, createEffect, createSignal } from "solid-js";
import VigenereStandardConfig from "./a-vigenere-standard";
import VigenereAutokeyConfig from "./b-vigenere-autokey";
import VigenereExtendedConfig from "./c-vigenere-extended";
import PlayfairConfig from "./d-playfair";
import AffineConfig from "./e-affine";
import HillConfig from "./f-hill";
import SuperEncryptionConfig from "./g-super-encryption";
import EnigmaConfig from "./bonus-enigma";

const configList = [
  {
    name: "vigenere-standard",
    component: VigenereStandardConfig,
  },
  {
    name: "vigenere-autokey",
    component: VigenereAutokeyConfig,
  },
  {
    name: "vigenere-extended",
    component: VigenereExtendedConfig,
  },
  {
    name: "playfair",
    component: PlayfairConfig,
  },
  {
    name: "affine",
    component: AffineConfig,
  },
  {
    name: "hill",
    component: HillConfig,
  },
  {
    name: "super-encryption",
    component: SuperEncryptionConfig,
  },
  {
    name: "enigma",
    component: EnigmaConfig,
  }
];
export const CipherSpecificConfig: Component = () => {
  const [config] = configSignal;

  const [configComponent, setConfigComponent] = createSignal<Component | undefined>(undefined);
  createEffect(() => {
    console.log(config().cipher);
    let temp = configList.find((c) => c.name === config().cipher)?.component;
    setConfigComponent((_prev: Component | undefined) => temp);
  });

  return <>{configComponent && configComponent()}</>;
};
