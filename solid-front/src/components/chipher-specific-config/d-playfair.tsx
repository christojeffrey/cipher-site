import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";
import { TextField, Heading } from "$ui";

export const PlayfairConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Playfair Cipher</Heading>
      <p>(26-alphabet)</p>
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
export default PlayfairConfig;
