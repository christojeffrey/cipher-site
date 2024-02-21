import { inputSignal } from "$globalState";
import { Component, createSignal } from "solid-js";
import { Heading, TextField } from "$ui";

export const InputBox: Component = () => {
  const [input, setInput] = inputSignal;

  const [showBase64, setShowBase64] = createSignal(false);

  const [inputType, setInputType] = createSignal("text");
  return (
    <div class="min-h-[25vh] md:h-full md:w-1/3 rounded-2xl bg-white p-3">
       <Heading>Input</Heading>
      <div class="flex">
        {/* select radio box input type. text, text file, binary file */}
        <For each={["text", "file"]}>
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
        <Match when={inputType() === "file"}>
          file
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  // print as array of number
                  const regularArr = Array.from(new Uint8Array(e.target?.result as ArrayBuffer));

                  // stringify regularArr
                  const stringified = regularArr.map((v) => String.fromCharCode(v)).join("");
                  setInput(stringified);
                };
                reader.readAsArrayBuffer(file);
              }
            }}
          />
          <div>file:</div>
          <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden">{input()}</div>
        </Match>
      </Switch>
      {/* show as base64 */}
      <input
        type="checkbox"
        onChange={(e) => {
          setShowBase64(e.target.checked);
        }}
        name="base64"
      />
      <label for="base64" class="cursor-pointer ml-2">
        base64
      </label>
      {showBase64() && (
        <>
          <div>base64:</div>
          <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden">{btoa(input())}</div>
        </>
      )}
    </div>
  );
};

export default InputBox;
