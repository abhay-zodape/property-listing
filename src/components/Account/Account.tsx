import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Account.module.scss";
import { UserContext } from "../../context/User/UserContext";
import { IUserContext } from "../../context/User/UserContext.type";
import { getInitials } from "../../utils/utils";
import Button from "../Button/Button";

const Account = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleAccountaDetails = () => {
    setShowAccountDetails((prev) => !prev);
  };

  const {
    userState: { name },
    userDispatch,
  } = useContext(UserContext) as IUserContext;

  const handleSignout = () => {
    userDispatch({ type: "sign-out", payload: {} });
    toggleAccountaDetails();
  };

  useEffect(() => {
    const handleCloseAccountDetails = (event: any) => {
      if (ref?.current && !ref?.current?.contains(event?.targer)) {
        setShowAccountDetails(false);
      }
    };

    document.addEventListener("click", handleCloseAccountDetails, true);

    return document.removeEventListener(
      "click",
      handleCloseAccountDetails,
      true
    );
  }, [ref?.current]);

  return (
    <div className={styles.profile}>
      <div onClick={toggleAccountaDetails}>{getInitials(name)}</div>
      {showAccountDetails && (
        <div className={styles.account} ref={ref}>
          <div>{name}</div>
          <Button onClick={handleSignout}>Sign out</Button>
        </div>
      )}
    </div>
  );
};

export default Account;
