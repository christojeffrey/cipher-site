import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";
import { TextField, Heading } from "$ui";

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
        key
      </TextField>
    </div>
  );
};
export default VigenereExtendedConfig;
