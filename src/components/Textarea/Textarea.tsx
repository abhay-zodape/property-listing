import React, { forwardRef } from "react";
import { ITextareaProps } from "./Textarea.type";
import styles from "./Textarea.module.scss";

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ label = "", showError = false, error = "", ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label htmlFor={props?.id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          <textarea {...props} className={styles.input} ref={ref} />

          {showError && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    );
  }
);

export default Textarea;
