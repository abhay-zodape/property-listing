import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";
import WithHeader from "../../hoc/WithHeader/WithHeader";
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
            {showSignUp && (
              <img
                src="/assets/images/back.png"
                alt="back"
                onClick={() => setShowSignUp(false)}
              />
            )}{" "}
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
