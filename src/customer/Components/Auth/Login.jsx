import * as React from "react";
import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const auth = useSelector((store) => store.auth); // ✅ use store.auth, not store.auth.auth

  // Auto-fetch user from token if available
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && !auth.user) {
      dispatch(getUser());
    }
  }, [dispatch, auth.user]);

  // Redirect after login
  useEffect(() => {
    if (auth.user) {
      navigate("/", { replace: true });
    }
  }, [auth.user, navigate]);

  // Snackbar on error/success
  useEffect(() => {
    if (auth.error || auth.user) {
      setOpenSnackBar(true);
    }
  }, [auth.error, auth.user]);

  const handleCloseSnakbar = () => setOpenSnackBar(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData)); // 🔥 This dispatches login thunk in authSlice
  };

  return (
    <div className="shadow-lg">
      <form className="w-full" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              type="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              disabled={auth.status === "loading"}
              sx={{ padding: ".8rem 0" }}
            >
              {auth.status === "loading" ? "Logging in..." : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p className="m-0 p-0">Don't have an account?</p>
          <Button onClick={() => navigate("/register")} className="ml-5" size="small">
            Register
          </Button>
        </div>
      </div>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnakbar}>
        <Alert
          onClose={handleCloseSnakbar}
          severity={auth.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {auth.error ? auth.error : "Login Success"}
        </Alert>
      </Snackbar>
    </div>
  );
}
