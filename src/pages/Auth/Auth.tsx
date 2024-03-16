import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import { UserContext } from "../../context/User/UserContext";
import { IUserContext } from "../../context/User/UserContext.type";
import SignInForm from "./SignInForm/SignInForm";
import SignUpForm from "./SignUpForm/SignUpForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Auth = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <WithHeader>
      <div className={styles.signInPage}>
        <div className={styles.signInMain}>
          <header className={styles.header}>
            {showSignUp && <img src="/assets/images/back.png" alt="back" />}{" "}
            <h2>{showSignUp ? "Sign Up" : "Sign In"}</h2>
          </header>
          <main className={styles.main}>
            {!showSignUp ? (
              <SignInForm handleSignUpNavigate={() => setShowSignUp(true)} />
            ) : (
              <SignUpForm />
            )}
          </main>
        </div>
      </div>
    </WithHeader>
  );
};

export default Auth;
