import React, { forwardRef } from "react";
import { IInputProps } from "./Input.type";
import styles from "./Input.module.scss";

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    { label = "", showError = false, error = "", isNumber = false, ...props },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isNumber) {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
      }
      props?.onChange?.(event);
    };

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
            onChange={handleChange}
            className={[
              styles.input,
              props.className,
              showError && error ? styles.inputError : "",
            ].join(" ")}
            ref={ref}
          />

          {showError && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    );
  }
);

export default Input;
