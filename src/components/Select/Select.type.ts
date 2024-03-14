import { HTMLProps } from "react";

export interface ISelectProps extends HTMLProps<HTMLSelectElement> {
  label?: string;
  options: any[];
  showError?: boolean;
  error?: string;
}
