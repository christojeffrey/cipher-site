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
      <div class="flex mt-2">
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
                    setInput({content: ""});
                  }}
                  checked={inputType() === inputTypeValue}
                />
                <label for={inputTypeValue}> {` ${inputTypeValue.charAt(0).toUpperCase() + inputTypeValue.slice(1)}`}</label>
              </div>
            )}
        </For>
      </div>
      {/* switch based on input type */}
      <Switch>
        <Match when={inputType() === "text"}>
          <TextField
            onChange={(e) => {
              setInput({content: (e.target as HTMLInputElement).value});
              
            }}
          >
            Text Input
          </TextField>
        </Match>
        <Match when={inputType() === "file"}>
          <label class="block my-2 font-medium text-gray-900 dark:text-white">
            File Input
          </label>
          <input
            class="mt-2"
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
                  setInput({content: stringified, filename: file.name});
                };
                reader.readAsArrayBuffer(file);
              }
            }}
          />

          {input().content && (
            <div class="mt-4 mb-1">
              <p>File content:</p>
              <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden">{input().content}</div>
            </div>
          )}
        </Match>
      </Switch>
      
      {/* show as base64 */}
      <div class="mt-6">
        <label for="base64" class="cursor-pointer mr-4">
          Show base64
        </label>
        <input
          type="checkbox"
          onChange={(e) => {
            setShowBase64(e.target.checked);
          }}
          name="base64"
        />
      </div>
      
      {input().content && showBase64() && (
        <div class="mt-4 mb-1">
          <p>base64:</p>
          <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden">{btoa(input().content)}</div>
        </div>
      )}
    </div>
  );
};

export default InputBox;
