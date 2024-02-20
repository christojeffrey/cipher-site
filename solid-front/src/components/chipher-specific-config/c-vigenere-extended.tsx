import { setPersistentConfig } from "$globalState";
import { TextField, Heading } from "$ui";
import { Component } from "solid-js";

export const VigenereExtendedConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Vigenere Extended</Heading>
      {/* key */}
      <TextField
        onChange={(e) => {
          setPersistentConfig({ key: e.target.value });
        }}
      >
        Key
      </TextField>
    </div>
  );
};

export default VigenereExtendedConfig;
