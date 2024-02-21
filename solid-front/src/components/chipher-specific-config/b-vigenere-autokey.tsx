import { setPersistentConfig } from "$globalState";
import { TextField, Heading } from "$ui";
import { Component } from "solid-js";

export const VigenereAutokeyConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Vigenere Autokey</Heading>
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

export default VigenereAutokeyConfig;
