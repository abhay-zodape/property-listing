import React, { forwardRef } from "react";
import styles from "./Button.module.scss";
import { IButtonProps } from "./Button.type";

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={[styles.button, props.className].join(" ")}
      >
        {children}
      </button>
    );
  }
);

export default Button;
