import { inputSignal } from "$globalState";
import { Component } from "solid-js";

export const InputBox: Component = () => {
  const [_, setInput] = inputSignal;
  return (
    <div class="w-1/3 bg-white rounded-2xl p-2">
      <Heading>Input</Heading>
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

const Heading: Component<{ children: any }> = (props: { children: any }) => {
  return <h1 class="text-2xl">{props.children}</h1>;
};

export default InputBox;
