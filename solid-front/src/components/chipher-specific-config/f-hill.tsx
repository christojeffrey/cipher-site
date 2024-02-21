import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";
import { NumberField, TextField, Heading } from "$ui";

export const HillConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Hill Cipher</Heading>
      <p>(26-alphabet)</p>
      <NumberField
        onChange={(e) => {
          setPersistentConfig({ matrixSize: e.target.value });
        }}
        placeholder={3}
        min={1}
      >
        Matrix Size
      </NumberField>
      <TextField
        onChange={(e) => {
          setPersistentConfig({ key: e.target.value });
        }}
      >
        Key (with length of matrixSize^2)
      </TextField>
    </div>
  );
};
export default HillConfig;
