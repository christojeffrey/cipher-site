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
        <span class="break-words text-ellipsis h-screen">{output()?.result_text}</span>
        {/* save as file */}
        <button
          class="border-2"
          onClick={() => {
            const blob = new Blob([output().result_text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "output.txt";
            a.click();
          }}
        >
          Save as file
        </button>
      </div>
    </div>
  );
};

export default OutputBox;
