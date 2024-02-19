import { configSignal } from "$globalState";
import { Component, createEffect, createSignal } from "solid-js";
import VigenereStandardConfig from "./a-vigenere-standard";
import VigenereAutokeyConfig from "./b-vigenere-autokey";

const configList = [
  {
    name: "vigenere-standard",
    component: VigenereStandardConfig,
  },
  {
    name: "vigenere-autokey",
    component: VigenereAutokeyConfig,
  },
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
