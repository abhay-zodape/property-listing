import React from "react";
import styles from "./NotFound.module.scss";
import WithHeader from "../../hoc/WithHeader/WithHeader";

const NotFound = () => {
  return (
    <WithHeader>
      <div className={styles.comingSoon}>
        <div className={styles.image}></div>
      </div>
    </WithHeader>
  );
};

export default NotFound;
