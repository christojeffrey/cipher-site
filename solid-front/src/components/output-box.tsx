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
        <div class="h-[50vh] border-2 break-words overflow-clip">file: {output()?.result_text}</div>

        {/* save as file */}
        <button
          class="border-2"
          onClick={() => {
            const blob = new Blob([output().result_text], { type: "octet/stream" });

            // blob to binary
            const blobToUint8Array = async (blob: Blob) => {
              const buffer = await blob.arrayBuffer();
              // to string
              const stringified = new TextDecoder().decode(buffer);
              // convert to array of uint8 char code
              const numberArr = stringified.split("").map((v) => v.charCodeAt(0));
              const uint8Arr = new Uint8Array(numberArr);
              return uint8Arr;
            };
            blobToUint8Array(blob).then((uint8Arr) => {
              const url = URL.createObjectURL(new Blob([uint8Arr], { type: "octet/stream" }));
              const a = document.createElement("a");
              a.href = url;
              a.download = "output.bin";
              a.click();
              URL.revokeObjectURL(url);
            });
          }}
        >
          Save as file
        </button>
      </div>
    </div>
  );
};

export default OutputBox;
