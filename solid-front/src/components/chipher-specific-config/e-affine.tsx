import { Component } from "solid-js";
import { setPersistentConfig } from "$globalState";
import { NumberField, Heading } from "$ui";

export const AffineConfig: Component = () => {
  return (
    <div class="my-2">
      <Heading>Affine Cipher</Heading>
      <p>(26-alphabet)</p>
      <p>Formula: C ≡ mP + b (mod 26)</p>
      <NumberField
        onChange={(e) => {
          setPersistentConfig({ keyM: e.target.value });
        }}
      >
        Value of m
      </NumberField>
      <NumberField
        onChange={(e) => {
          setPersistentConfig({ keyB: e.target.value });
        }}
      >
        Value of b
      </NumberField>
    </div>
  );
};
export default AffineConfig;
