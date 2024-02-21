import type { Component } from "solid-js";
import { ConfigBox, InputBox, OutputBox } from "$components";

const App: Component = () => {
  return (
    <div class="md:h-screen flex flex-col p-3 gap-3">
      <AppHeader />
      <div class="border-2 flex flex-col md:flex-row md:justify-between p-3 gap-3 bg-gray-100 rounded-2xl flex-grow">
        {/* three section. left middle right. left for input, middle for configuration, right for output */}
        <InputBox />
        <ConfigBox />
        <OutputBox />
      </div>
    </div>
  );
};

export default App;
function AppHeader() {
  return (
    <div class="flex justify-between">
      <div>
        <div class="text-xl">Cipher Site</div>
        <div class="text-md">lorem ipsum</div>
      </div>
      <div class="text-right text-sm">
        {/* TODO: change this to github link */}
        <div>@christojeffrey</div>
        <div>@weslygio</div>
      </div>
    </div>
  );
}
