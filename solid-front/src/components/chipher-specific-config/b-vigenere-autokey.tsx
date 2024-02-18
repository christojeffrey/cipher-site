import { setPersistentConfig } from "$globalState";
import { Component } from "solid-js";

export const VigenereAutokeyConfig: Component = () => {
  return (
    <>
      vigenere autokey
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

export default VigenereAutokeyConfig;
