import { configSignal } from "$globalState";
import { Component } from "solid-js";
import VigenereStandardConfig from "./a-vigenere-standard";
import VigenereAutokeyConfig from "./b-vigenere-autokey";

export const CipherSpecificConfig: Component = () => {
  const [config] = configSignal;
  if (config().cipher === "vigenere-standard") {
    return <VigenereStandardConfig />;
  } else if (config().cipher === "vigenere-autokey") {
    return <VigenereAutokeyConfig />;
  } else {
    return <>no cipher</>;
  }
};
