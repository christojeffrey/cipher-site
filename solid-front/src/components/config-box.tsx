import { Component } from "solid-js";
import { setDoFetch, setPersistentConfig } from "$globalState";
import { CipherSpecificConfig } from "./chipher-specific-config";
import { Heading } from "$ui/heading";

const handleEncrypt = () => {
  setPersistentConfig({ mode: "encrypt" });
  // reset first
  setDoFetch(false);
  setDoFetch(true);
};

const handleDecrypt = () => {
  setPersistentConfig({ mode: "decrypt" });
  // reset first
  setDoFetch(false);
  setDoFetch(true);
};

export const ConfigBox: Component = () => {
  return (
    <div class="md:h-full flex-grow rounded-2xl bg-white p-3">
      <div class="flex flex-col">
        <Heading>Configuration</Heading>
        {/* cipher */}
        <select
          class="border-2"
          onChange={(e) => {
            setPersistentConfig({
              cipher: e.target.value,
            });
          }}
        >
          <option value="vigenere-standard">vigenere standard</option>
          <option value="vigenere-autokey">vigenere autokey</option>
          <option value="vigenere-extended">vigenere extended</option>
          <option value="super-encryption">super encryption</option>
        </select>

        {/* cipher specific config */}
        <CipherSpecificConfig />

        {/* button */}
        <button class="border-2" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button class="border-2" onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>
    </div>
  );
};

export default ConfigBox;
