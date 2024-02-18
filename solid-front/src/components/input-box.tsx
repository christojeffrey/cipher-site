import { inputSignal } from "$globalState";
import { Component } from "solid-js";

export const InputBox: Component = () => {
  const [_, setInput] = inputSignal;
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

export default InputBox;
