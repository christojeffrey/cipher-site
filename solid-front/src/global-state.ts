import { createSignal, createResource } from "solid-js";

// input state
type InputType = {
  content: string;
  filename?: string;
};
export const inputSignal = createSignal<InputType>({content: ""});

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
export function setPersistentConfig(newConfig: any, clear = false) {
  const [config, setConfig] = configSignal;

  if (clear) {
    setConfig(newConfig);
    return;
  }
  setConfig({
    ...config(),
    ...newConfig,
  });
}

const doEncryptDecrypt = async () => {
  const [input] = inputSignal;
  const [config] = configSignal;
  let result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cipher/${config().cipher}`, {
    method: "POST",
    body: JSON.stringify({ text: input().content, ...config() }),
  });

  return result.json();
};

//   output
export const [doFetch, setDoFetch] = createSignal(false);
export const [output, { refetch }] = createResource(doFetch, doEncryptDecrypt);
