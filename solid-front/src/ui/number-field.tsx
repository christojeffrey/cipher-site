import { Component } from "solid-js";

type NumberFieldProps = {
  children: string;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange?: (e: any) => void;
};
export const NumberField: Component<NumberFieldProps> = (props: NumberFieldProps) => {
  return (
    <div class="my-2">
      <label for={`${props.children}`} class="block mb-2 font-medium text-gray-900 dark:text-white">
        {props.children}
      </label>
      <input
        id={`${props.children}`}
        type="number"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={`${props.placeholder ? props.placeholder : 0}`}
        min={props.min}
        max={props.max}
        onChange={props.onChange}
      />
    </div>
  );
};
