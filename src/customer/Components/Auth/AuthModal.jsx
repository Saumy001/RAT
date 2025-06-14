import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import { useEffect, useState } from "react";
import LoginUserForm from "./Login";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import VerifyOtp from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword"; // Import the ForgotPassword component
import ResetPassword from "./ResetPassword"; // Import the ResetPassword component


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (auth.user && location.pathname === "/login") {
      handleClose();
    }
  }, [auth.user, location.pathname, handleClose]);
  
  return (
    <>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  slotProps={{
    backdrop: {
      sx: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(3px)",
      },
    },
  }}
>


      <Box className="rounded-md" sx={style}>
      {location.pathname === "/login" ? (
  <LoginUserForm />
) : location.pathname === "/register" ? (
  <RegisterUserForm />
) : location.pathname === "/verify-otp" ? (
  <VerifyOtp />
) : location.pathname === "/forgot-password" ? (
  <ForgotPassword />  // import this component
) :location.pathname === "/reset-password" ? (
  <ResetPassword /> 
 ) : null}


      </Box>
    </Modal>
    
    </>
    
  );
}
