import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validation-schema";
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
  Snackbar
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false)
  const [errorMsg, setError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (value) => {
    try {
      const { data } = await Axios.post("/users/signIn", value);      
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message ?? "")
      setOpen(true)
    }
  });

  return (
    <>
      <FormGroup className="w-50 mx-auto mt-5">
        <Typography variant="h4">Login to your account</Typography>
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
            Sign in
          </Button>
        </FormControl>
        <span className="mt-2">
          New to our app? <Link to="/register">Register</Link>
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

export default Login;
