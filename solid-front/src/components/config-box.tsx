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
          class="border-2 mt-2 mb-4"
          onChange={(e) => {
            setPersistentConfig({
              cipher: e.target.value,
            });
          }}
        >
          <option value="vigenere-standard">Vigenere Standard</option>
          <option value="vigenere-autokey">Vigenere Autokey</option>
          <option value="vigenere-extended">Vigenere Extended</option>
          <option value="playfair">Playfair Cipher</option>
          <option value="affine">Affine Cipher</option>
          <option value="hill">Hill Cipher</option>
          <option value="super-encryption">Super Encryption</option>
          <option value="enigma">Enigma Cipher</option>
        </select>

        {/* cipher specific config */}
        <CipherSpecificConfig />
        {/* show base64 */}
        <div>
          {/* checkbox */}
          <input type="checkbox" onChange={(e) => setPersistentConfig({ isBase64: e.target.checked })} name="base64" />
          <label for="base64" class="cursor-pointer ml-2">
            base64
          </label>
        </div>

        {/* button */}
        <button class="border-2 my-1 hover:shadow hover:bg-gray-50" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button class="border-2 my-1 hover:shadow hover:bg-gray-50" onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>
    </div>
  );
};

export default ConfigBox;
