// ClickableText.jsx
import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClickableText = ({ children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const path = `/${children.toString().toLowerCase().replace(/\s+/g, '-')}`;
    navigate(path);
  };

  return (
    <Typography
      variant="body2"
      component="p"
      gutterBottom
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      {children}
    </Typography>
  );
};

export default ClickableText;
