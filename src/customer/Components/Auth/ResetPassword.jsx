import { Button, Grid, TextField, Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5454";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOtpNext = (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter OTP");
      return;
    }
    setStep(2); // Just move to next step
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/auth/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`
      );
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed");
    }
  };

  return (
    <>
      {step === 1 ? (
        <form onSubmit={handleOtpNext}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Enter OTP"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">Password Reset! Redirecting to login...</Alert>
      </Snackbar>
    </>
  );
}
