import { Component } from "solid-js";

export const Heading: Component<{ children: any }> = (props: { children: any }) => {
  return <h1 class="text-2xl">{props.children}</h1>;
};
