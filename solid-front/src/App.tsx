import type { Component } from "solid-js";
import { createSignal, createResource } from "solid-js";

type InputType = string;
const inputSignal = createSignal<InputType>("");

type ConfigType = {
  cipher: string;
  mode: "encrypt" | "decrypt";
  key?: string;
  isBase64?: boolean;
};
const configSignal = createSignal<ConfigType>({
  cipher: "vigenere-standard",
  mode: "encrypt",
});

function setPersistentConfig(newConfig: any) {
  const [config, setConfig] = configSignal;
  setConfig({
    ...config(),
    ...newConfig,
  });
}

const App: Component = () => {
  return (
    <div class="h-screen flex flex-col p-3 gap-3">
      <div class="flex justify-between">
        <div>
          <div class="text-xl">Cipher Site</div>
          <div class="text-md">lorem ipsum</div>
        </div>
        <div class="text-right text-sm">
          {/* TODO: change this to github link */}
          <div>@christojeffrey</div>
          <div>@weslygio</div>
        </div>
      </div>
      <div class="border-2 flex flex-col md:flex-row md:justify-between p-3 gap-3 bg-gray-100 rounded-2xl flex-grow">
        {/* three section. left middle right. left for input, middle for configuration, right for output */}
        <InputBox />
        <ConfigSelector />
        <OutputBox />
      </div>
    </div>
  );
};

export default App;

type OutputBoxProps = {
  class?: string;
};

const BACKEND_URL = "http://localhost:8000/api";

const doEncryptDecrypt = async () => {
  const [input] = inputSignal;
  const [config] = configSignal;

  return (
    await fetch(`${BACKEND_URL}/cipher/${config().cipher}`, {
      method: "POST",
      body: JSON.stringify({ text: input(), ...config() }),
    })
  ).json();
};

const [output, { mutate, refetch }] = createResource(doEncryptDecrypt);

const OutputBox: Component = (props: OutputBoxProps) => {
  // get input
  const [input] = inputSignal;

  return (
    <div class={`${props.class} w-1/3 bg-white rounded-2xl p-3`}>
      input
      {input()}
      <div>
        <span>{output.loading && "loading..."}</span>
        <span>{output.error && "error: " + output.error}</span>
        <span>{JSON.stringify(output())}</span>
      </div>
    </div>
  );
};
const ConfigSelector: Component = () => {
  const [_config, setConfig] = configSignal;

  const handleEncrypt = () => {
    setPersistentConfig({ mode: "encrypt" });
    refetch();
  };
  const handleDecrypt = () => {
    setPersistentConfig({ mode: "decrypt" });
    refetch();
  };
  return (
    <div class="md:h-full flex-grow rounded-2xl bg-white p-3">
      <div class="flex flex-col">
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

const CipherSpecificConfig: Component = () => {
  const [config] = configSignal;
  if (config().cipher === "vigenere-standard") {
    return <VigenereStandardConfig />;
  } else if (config().cipher === "vigenere-autokey") {
    return <VigenereAutokeyConfig />;
  }
};

const VigenereStandardConfig: Component = () => {
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
const VigenereAutokeyConfig: Component = () => {
  return (
    <>
      vigenere autokey
      {/* key */}
      <input>key</input>
    </>
  );
};
const InputBox: Component = () => {
  const [input, setInput] = inputSignal;
  return (
    <div class="border-2 w-1/3">
      <input
        type="text"
        class="border-2"
        onInput={(e) => {
          setInput((e.target as HTMLInputElement).value);
        }}
      />
    </div>
  );
};
