import { registerSchema } from "./validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Axios } from "../../axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  FormGroup,
  Input,
  Typography,
  FormControl,
  InputLabel,
  Button,
  Snackbar,
} from "@mui/material";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const [open, setOpen] = useState(false);
  const [errorMsg, setError] = useState(false);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (value) => {
    try {
      const { data } = await Axios.post("/users/signUp", value);
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message ?? "");
      setOpen(true);
    }
  });

  return (
    <>
      <FormGroup className="w-50 mx-auto mt-5">
        <Typography variant="h4">Create Account</Typography>

        <FormControl className="mt-5">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input name="name" id="name" {...register("name")} />
          <div className="text-danger">
            {errors.name && errors.name.message}
          </div>
        </FormControl>
        <FormControl className="mt-5">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input name="email" id="email" {...register("email")} />
          <div className="text-danger">
            {errors.email && errors.email.message}
          </div>
        </FormControl>
        <FormControl className="mt-5">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            name="password"
            id="password"
            {...register("password")}
          />
          <div className="text-danger">
            {errors.password && errors.password.message}
          </div>
        </FormControl>
        <FormControl className="mt-3">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit()}
          >
            Sign Up
          </Button>
        </FormControl>
        <span className="mt-2">
          Already a user? <Link to="/login">Sign in</Link>
        </span>
      </FormGroup>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={setOpen}
        message={errorMsg}
      />
    </>
  );
};

export default Register;
