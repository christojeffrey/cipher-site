import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";
import { NumberField, TextField, Heading } from "$ui";

export const EnigmaConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Enigma Cipher</Heading>
      <p>(26-alphabet)</p>
      <p>3-rotor enigma machine</p>
      <TextField
        onChange={(e) => {
          setPersistentConfig({ key: e.target.value });
        }}
      >
        Key (3-letter)
      </TextField>
    </div>
  );
};
export default EnigmaConfig;
