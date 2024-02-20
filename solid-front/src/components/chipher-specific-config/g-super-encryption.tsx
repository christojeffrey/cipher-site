import { setPersistentConfig } from "$globalState";
import { NumberField, TextField, Heading } from "$ui";
import { Component } from "solid-js";

export const SuperEncryptionConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Super Encryption</Heading>
      <p>Vigenere Extended Cipher x Transposition Cipher</p>

      <TextField
        onChange={(e) => {
          setPersistentConfig({ key: e.target.value });
        }}
      >
        Key
      </TextField>

      <NumberField
        onChange={(e) => {
          setPersistentConfig({ split: e.target.value });
        }}
        min={1}
      >
        Transposition split value
      </NumberField>
    </div>
  );
};

export default SuperEncryptionConfig;
