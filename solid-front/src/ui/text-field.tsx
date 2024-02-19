import { Component } from "solid-js";

type TextFieldProps = {
  children: string;
  placeholder?: string;
  onChange?: (e: any) => void;
};
export const TextField: Component<TextFieldProps> = (props: TextFieldProps) => {
  return (
    <div class="my-2">
      <label for={`${props.children}`} class="block mb-2 font-medium text-gray-900 dark:text-white">
        {props.children}
      </label>
      <textarea
        id={`${props.children}`}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={`${props.placeholder ? props.placeholder : ""}`}
        onChange={props.onChange}
      ></textarea>
    </div>
  );
};
