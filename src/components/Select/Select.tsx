import React, { forwardRef } from "react";
import { ISelectProps } from "./Select.type";
import styles from "./Select.module.scss";

const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  (
    {
      label = "",
      showError = false,
      error = "",
      options = [],
      placeholder = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label htmlFor={props?.id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          <select {...props} defaultValue="" className={styles.input} ref={ref}>
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options?.map(({ value, label }, index) => (
              <option value={value} key={index}>
                {label}
              </option>
            ))}
          </select>

          {showError && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    );
  }
);

export default Select;
