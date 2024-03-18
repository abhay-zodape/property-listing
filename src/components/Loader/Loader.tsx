import React from "react";
import styles from "./Loader.module.scss";
import { ILoaderProps } from "./Loader.type";

const Loader = ({ show = false }: ILoaderProps) => {
  return (
    <>
      {show && (
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}></div>
        </div>
      )}
    </>
  );
};

export default Loader;
