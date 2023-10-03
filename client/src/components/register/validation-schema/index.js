import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup.string().required("Name is required").min(2, "Must have length of atleast 2"),
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
