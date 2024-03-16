import { HTMLProps } from "react";

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  showError?: boolean;
  error?: string;
  isNumber?: boolean;
}
