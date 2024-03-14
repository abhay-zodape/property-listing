import { HTMLProps } from "react";

export interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  showError?: boolean;
  error?: string;
}
