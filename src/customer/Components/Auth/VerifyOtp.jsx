import { Button, Grid, TextField, Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5454";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // from navigate
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/auth/verify-otp?email=${email}&otp=${otp}`);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className="p-4">
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
            <Button
              type="submit"
              variant="contained"
              className="bg-[#9155FD] w-full"
            >
              Verify OTP
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">OTP Verified! Redirecting to login...</Alert>
      </Snackbar>
    </>
  );
}
