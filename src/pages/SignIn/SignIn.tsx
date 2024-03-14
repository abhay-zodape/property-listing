import React, { useContext, useEffect } from "react";
import styles from "./SignIn.module.scss";
import { ISignInForm } from "./SignIn.type";
import WithHeader from "../../hoc/WithHeader/WithHeader";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./constants";
import { USER_LIST } from "../../constants/user";
import { UserContext } from "../../context/User/UserContext";
import { IUserContext } from "../../context/User/UserContext.type";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { userDispatch, userState } = useContext(UserContext) as IUserContext;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<ISignInForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ username, password }: ISignInForm) => {
    const userDetails = USER_LIST.find(
      (user) => user.username === username && user.password === password
    );
    if (userDetails) {
      userDispatch({
        type: "sign-in",
        payload: { username, name: userDetails?.name },
      });
      window.localStorage.setItem("username", username);
    } else {
      setError("username", {
        message: " ",
      });
      setError("password", {
        message: "Enter valid credentials",
      });
    }
  };

  useEffect(() => {
    if (userState?.isLoggedIn) {
      navigate("/home");
    }
  }, [userState.isLoggedIn]);

  return (
    <WithHeader>
      <div className={styles.signInPage}>
        <div className={styles.signInMain}>
          <header className={styles.header}>
            <h2>Sign In</h2>
          </header>
          <main>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.signInForm}
            >
              <div className={styles.input}>
                <Input
                  label="Enter Username"
                  showError
                  className={[styles.picture, styles.main].join(" ")}
                  {...register("username")}
                  error={errors?.username?.message}
                />
              </div>
              <div className={styles.input}>
                <Input
                  label="Enter Password"
                  showError
                  type="password"
                  className={[styles.picture, styles.main].join(" ")}
                  {...register("password")}
                  error={errors?.password?.message}
                />
              </div>
              <div className={styles.submitButton}>
                <Button type="submit">Sign In</Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </WithHeader>
  );
};

export default SignIn;
