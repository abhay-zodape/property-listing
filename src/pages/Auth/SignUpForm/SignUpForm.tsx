import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { auth } from "../../../firebase";
import styles from "./SignUpForm.module.scss";
import { ISignUpForm } from "./SignUpForm.type";
import { signUpSchema } from "./constants";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(signUpSchema),
  });

  const [signUpWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = async ({ email, password }: ISignUpForm) => {
    signUpWithEmailAndPassword(email, password);
    toast.success("User signed up successfully");
  };

  useEffect(() => {
    if (error?.message) {
      setError("email", {
        message: " ",
      });
      setError("password", {
        message: " ",
      });
      setError("confirmPassword", {
        message: "Enter valid credentials",
      });
    }
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
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
        </div>
        <div className={styles.input}>
          <Input
            label="Enter Confirm Password"
            showError
            type="password"
            className={[styles.picture, styles.main].join(" ")}
            {...register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />
        </div>
        <div className={styles.submitButton}>
          <Button disabled={!isValid} type="submit" className={styles.submit}>
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
