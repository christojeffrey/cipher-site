import { Match, Switch, type Component } from "solid-js";
import { configSignal, inputSignal, output } from "$globalState";
import { Heading } from "$ui/heading";

type OutputBoxProps = {
  class?: string;
};

export const OutputBox: Component = (props: OutputBoxProps) => {
  // get input


  const onDownload = () => {
    const blob = new Blob([output()?.result_text], { type: "octet/stream" });
    const [input] = inputSignal;
    const [config] = configSignal;

    var filename = input().filename ? `${config().mode}ed-${input().filename}` : "encrypted-file.txt";
    if (filename.startsWith("decrypted-encrypted-")) {
      filename = filename.replace("decrypted-encrypted-", "");
    }

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
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div class={`${props.class} min-h-[25vh] md:h-full md:w-1/3 rounded-2xl bg-white p-3`}>
      <Heading>Output</Heading>
      <div class="flex flex-col mt-2">
        <Switch fallback={<div>no output</div>}>
          <Match when={output.loading}>
            <div>Loading...</div>
          </Match>
          {/* the error handling shouldn't need the second condition. it's broken. https://github.com/solidjs/solid/discussions/705 */}
          <Match when={output.error || output()?.error}>
            <div>Error: {output().error}</div>
          </Match>
          <Match when={output()}>
            <div class="mt-2 mb-1">
              <div>Text:</div>
              <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden"> {output()?.result_text}</div>
              {output()?.result_text_base64 && (
                <div class="mt-2 mb-1">
                  <div>base64:</div>
                  <div class="max-h-[50vh] break-words overflow-y-auto overflow-x-hidden"> {output()?.result_text_base64}</div>
                </div>
              )}

              {/* save as file */}
              <button class="border-2 mt-4 hover:shadow hover:bg-gray-50" disabled={output.loading || output.error || !output()?.result_text} onClick={onDownload}>
                Save as file
              </button>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default OutputBox;
