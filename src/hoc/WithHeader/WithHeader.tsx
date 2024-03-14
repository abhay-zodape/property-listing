import React, { PropsWithChildren } from "react";
import Header from "../../components/Header/Header";
import styles from "./WithHeader.module.scss";

const WithHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default WithHeader;
