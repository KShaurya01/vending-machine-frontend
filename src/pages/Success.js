import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, Paper, CheckCircleIcon } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Success = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        p: 3,
        textAlign: "center",
      }}
    >
      <Paper sx={{ p: 4 }}>
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: "success.main", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Purchase Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your items will be dispensed shortly.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Shop
        </Button>
      </Paper>
    </Box>
  );
};

export default Success;
