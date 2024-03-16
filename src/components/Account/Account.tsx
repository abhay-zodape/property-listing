import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import styles from "./Account.module.scss";
import { getInitials } from "../../utils/utils";
import Button from "../Button/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Account = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [user] = useAuthState(auth);

  const toggleAccountaDetails = () => {
    setShowAccountDetails((prev) => !prev);
  };

  const handleSignout = () => {
    toggleAccountaDetails();
    signOut(auth);
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
      <div onClick={toggleAccountaDetails}>
        {user?.photoURL ? (
          <img src={user?.photoURL} alt={user?.displayName || ""} />
        ) : (
          getInitials(user?.displayName ?? "")
        )}
      </div>
      {showAccountDetails && (
        <div className={styles.account} ref={ref}>
          <div>{user?.displayName || "User"}</div>
          <Button onClick={handleSignout}>Sign out</Button>
        </div>
      )}
    </div>
  );
};

export default Account;
