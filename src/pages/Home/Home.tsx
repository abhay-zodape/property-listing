import React from "react";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <WithHeader>
      <div className={styles.imageContainer}>
        <p>Exceptional properties deserves extraordinary marketing</p>
      </div>
    </WithHeader>
  );
};

export default Home;
