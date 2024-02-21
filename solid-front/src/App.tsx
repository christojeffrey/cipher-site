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
        <p class="text-xl">Cipher Site</p>
        <p class="text-md">Lorem Ipsum is our motto</p>
      </div>
      <div class="text-right text-sm">
        <div>
          <a href="https://github.com/christojeffrey">@christojeffrey</a>
        </div>
        <div>
          <a href="https://github.com/weslygio">@weslygio</a>
        </div>
      </div>
    </div>
  );
}
