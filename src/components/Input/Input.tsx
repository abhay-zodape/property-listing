import React, { forwardRef } from "react";
import { IInputProps } from "./Input.type";
import styles from "./Input.module.scss";

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label = "", showError = false, error = "", ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label htmlFor={props?.id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          <input
            {...props}
            className={[styles.input, props.className].join(" ")}
            ref={ref}
          />

          {showError && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    );
  }
);

export default Input;
