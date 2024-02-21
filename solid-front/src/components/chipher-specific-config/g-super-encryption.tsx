import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";
import { TextField, Heading } from "$ui";

export const SuperEncryptionConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Super Encryption</Heading>
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
export default SuperEncryptionConfig;
