import { inputSignal } from "$globalState";
import { Component } from "solid-js";
import { Heading, TextField } from "$ui";

export const InputBox: Component = () => {
  const [_, setInput] = inputSignal;
  return (
    <div class="w-1/3 bg-white rounded-2xl p-2">
      <Heading>Input</Heading>

      <TextField
        onChange={(e) => {
          setInput((e.target as HTMLInputElement).value);
        }}
      >
        text input
      </TextField>
    </div>
  );
};

export default InputBox;
