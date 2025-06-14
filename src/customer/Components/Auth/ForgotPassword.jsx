import { Button, Grid, TextField, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5454";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password?email=${email}`);
      setSuccess(true);
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className="p-4">
          <Grid item xs={12}>
            <TextField
              label="Enter your email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              className="bg-[#9155FD] w-full"
            >
              Send OTP
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">OTP Sent! Redirecting...</Alert>
      </Snackbar>
    </>
  );
}
