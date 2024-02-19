import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";
import { TextField, Heading } from "$ui";

export const VigenereStandardConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Vigenere Standard</Heading>
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
export default VigenereStandardConfig;
