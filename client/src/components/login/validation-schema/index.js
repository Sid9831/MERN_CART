import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not in valid format")
      .lowercase(),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
      ),
  })
  .required();
