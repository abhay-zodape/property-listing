import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf(
      [yup.ref("password"), ""],
      "Confirm Password must be same as password"
    ),
});
