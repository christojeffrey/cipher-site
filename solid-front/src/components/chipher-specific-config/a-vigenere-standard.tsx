import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";

export const VigenereStandardConfig: Component = () => {
  return (
    <>
      vigenere standard
      {/* key */}
      <input
        class="border-2"
        onChange={(e) => {
          setPersistentConfig({ key: e.target.value });
        }}
      >
        key
      </input>
    </>
  );
};
export default VigenereStandardConfig;
