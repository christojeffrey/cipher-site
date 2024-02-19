import { inputSignal } from "$globalState";
import { Component, createSignal } from "solid-js";
import { Heading, TextField } from "$ui";

export const InputBox: Component = () => {
  const [input, setInput] = inputSignal;

  const [inputType, setInputType] = createSignal("text");
  return (
    <div class="w-1/3 bg-white rounded-2xl p-2">
       <Heading>Input</Heading>
      <div class="flex">
        {/* select radio box input type. text, text file, binary file */}
        <For each={["text", "text file", "binary file"]}>
          {(inputTypeValue) => () =>
            (
              <div class="mr-2">
                <input
                  type="radio"
                  value={inputTypeValue}
                  name="input-type"
                  onClick={() => {
                    setInputType(inputTypeValue);
                    setInput("");
                  }}
                  checked={inputType() === inputTypeValue}
                />
                <label for={inputTypeValue}> {` ${inputTypeValue}`}</label>
              </div>
            )}
        </For>
      </div>
      {/* switch based on input type */}
      <Switch>
        <Match when={inputType() === "text"}>
          <TextField
            onChange={(e) => {
              setInput((e.target as HTMLInputElement).value);
            }}
          >
            text input
          </TextField>
        </Match>
        <Match when={inputType() === "text file"}>
          text file
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setInput(e.target?.result as string);
                };
                reader.readAsText(file);
              }
            }}
          />
          <div>text file: {input()}</div>
        </Match>
        <Match when={inputType() === "binary file"}>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // read each byte of the file including the header
                const reader = new FileReader();
                reader.onload = (e) => {
                  const arrayBuffer = e.target?.result as ArrayBuffer;
                  const byteArray = new Uint8Array(arrayBuffer);
                  setInput(byteArray.join(" "));
                };
              }
            }}
          />
          <div>binary file: {input()}</div>
        </Match>
      </Switch>
      {/* show as base64 */}
    </div>
  );
};

export default InputBox;
