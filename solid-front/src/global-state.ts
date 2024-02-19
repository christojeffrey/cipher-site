import { createSignal, createResource } from "solid-js";

// input state
type InputType = string;
export const inputSignal = createSignal<InputType>("");

// config state
type ConfigType = {
  cipher: string;
  mode: "encrypt" | "decrypt";
  key?: string;
  isBase64?: boolean;
};
export const configSignal = createSignal<ConfigType>({
  cipher: "vigenere-standard",
  mode: "encrypt",
});
export function setPersistentConfig(newConfig: any) {
  const [config, setConfig] = configSignal;
  setConfig({
    ...config(),
    ...newConfig,
  });
}

const doEncryptDecrypt = async () => {
  const [input] = inputSignal;
  const [config] = configSignal;

  return (
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/cipher/${config().cipher}`, {
      method: "POST",
      body: JSON.stringify({ text: input(), ...config() }),
    })
  ).json();
};

//   output
export const [doFetch, setDoFetch] = createSignal(false);
export const [output, { refetch }] = createResource(doFetch, doEncryptDecrypt);
