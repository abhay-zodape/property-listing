import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { auth } from "../../../firebase";
import styles from "./SignInForm.module.scss";
import { ISignInForm, ISignInFormProps } from "./SignInForm.type";
import { signInSchema } from "./constants";
import { toast } from "react-toastify";

const SignInForm = ({ handleSignUpNavigate }: ISignInFormProps) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<ISignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(signInSchema),
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const onSubmit = async ({ email, password }: ISignInForm) => {
    signInWithEmailAndPassword(email, password);
    toast.success("Sign in successfull");
  };

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  useEffect(() => {
    if (error?.message) {
      setError("email", {
        message: " ",
      });
      setError("password", {
        message: "Enter valod credentials",
      });
    }
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signInForm}>
        <div className={styles.input}>
          <Input
            label="Enter Email"
            showError
            className={[styles.picture, styles.main].join(" ")}
            {...register("email")}
            error={errors?.email?.message}
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
          <div className={styles.signUpTextWrapper}>
            Not a user ?{" "}
            <span className={styles.signUpText} onClick={handleSignUpNavigate}>
              Sign up
            </span>
          </div>
        </div>
        <div className={styles.submitButton}>
          <Button disabled={!isValid} type="submit" className={styles.submit}>
            Sign In
          </Button>
        </div>
      </form>
      <div className={styles.googleLogin} onClick={handleGoogleLogin}>
        <img src="/assets/images/google.png" alt="Google" />
        Continue Google
      </div>
    </>
  );
};

export default SignInForm;
