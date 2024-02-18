import type { Component } from "solid-js";
import { output } from "$globalState";

type OutputBoxProps = {
  class?: string;
};

export const OutputBox: Component = (props: OutputBoxProps) => {
  // get input

  return (
    <div class={`${props.class} w-1/3 bg-white rounded-2xl p-3`}>
      <div>
        <span>{output.loading && "loading..."}</span>
        <span>{output.error && "error: " + output.error}</span>
        <span>{JSON.stringify(output())}</span>
      </div>
    </div>
  );
};

export default OutputBox;
