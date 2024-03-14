import { HTMLProps } from "react";

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "submit" | "button" | "reset";
}
