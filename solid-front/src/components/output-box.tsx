import type { Component } from "solid-js";
import { output } from "$globalState";
import { Heading } from "$ui/heading";

type OutputBoxProps = {
  class?: string;
};

export const OutputBox: Component = (props: OutputBoxProps) => {
  // get input
  return (
    <div class={`${props.class} min-h-[25vh] md:h-full md:w-1/3 rounded-2xl bg-white p-3`}>
      <Heading>Output</Heading>
      <div class="flex flex-col">
        <span>{output.loading && "loading..."}</span>
        <span>{output.error && "error: " + output.error}</span>
        {output() && (
          <>
            <div>text:</div>
            <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden"> {output()?.result_text}</div>
            {output()?.result_text_base64 && (
              <>
                <div>base64:</div>
                <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden"> {output()?.result_text_base64}</div>
              </>
            )}

            {/* save as file */}
            <button
              class="border-2"
              disabled={output.loading || output.error || !output()?.result_text}
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
          </>
        )}
      </div>
    </div>
  );
};

export default OutputBox;
